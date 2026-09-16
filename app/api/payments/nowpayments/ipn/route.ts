import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === "object") return Object.keys(value as Record<string, unknown>).sort().reduce<Record<string, unknown>>((out,key) => { out[key]=sortObject((value as Record<string, unknown>)[key]); return out; },{});
  return value;
}

function validSignature(payload: unknown, received: string, secret: string) {
  const canonical = JSON.stringify(sortObject(payload));
  const expected = createHmac("sha512", secret).update(canonical).digest("hex");
  const a=Buffer.from(expected,"utf8"), b=Buffer.from(received,"utf8");
  return a.length===b.length && timingSafeEqual(a,b);
}

export async function POST(request: Request) {
  const secret=process.env.NOWPAYMENTS_IPN_SECRET;
  if (!secret) return NextResponse.json({ error:"IPN is not configured." },{status:503});
  const signature=request.headers.get("x-nowpayments-sig") || "";
  if (!signature) return NextResponse.json({ error:"Missing signature." },{status:401});

  try {
    const payload=await request.json();
    if (!validSignature(payload,signature,secret)) return NextResponse.json({ error:"Invalid signature." },{status:401});

    const orderId=typeof payload?.order_id === "string" ? payload.order_id : "";
    const status=typeof payload?.payment_status === "string" ? payload.payment_status : "";
    if (!orderId || !status) return NextResponse.json({ error:"Invalid payment payload." },{status:400});

    // Entitlements are intentionally not released here yet. A verified callback is
    // necessary but fulfillment also needs durable order storage and idempotency.
    // For fixed-price marketplace products, only a fully finished payment should
    // become eligible for fulfillment. Partial/confirming statuses remain on hold.
    if (status === "finished") {
      console.info("NOWPayments payment verified and finished", { orderId, paymentId:payload?.payment_id, status });
    } else {
      console.info("NOWPayments payment update verified", { orderId, paymentId:payload?.payment_id, status });
    }
    return NextResponse.json({ received:true });
  } catch (error) {
    console.error("NOWPayments IPN error",error);
    return NextResponse.json({ error:"Invalid callback." },{status:400});
  }
}
