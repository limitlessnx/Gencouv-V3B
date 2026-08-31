import { NextResponse } from "next/server";

const PRODUCT = {
  id: "sixtynine-ea-mt5-v1-30",
  name: "SixtyNine EA MT5 v1.30",
  price: 2000,
  currency: "usd",
};

export async function POST(request: Request) {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Payment gateway is not configured." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json().catch(() => ({}));

    if (body?.productId && body.productId !== PRODUCT.id) {
      return NextResponse.json({ error: "Unknown product." }, { status: 400 });
    }

    const origin = new URL(request.url).origin;
    const orderId = `GC-${Date.now()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        price_amount: PRODUCT.price,
        price_currency: PRODUCT.currency,
        order_id: orderId,
        order_description: PRODUCT.name,
        ipn_callback_url: `${origin}/api/payments/nowpayments/ipn`,
        success_url: `${origin}/checkout/sixtynine/success?order=${encodeURIComponent(orderId)}`,
        cancel_url: `${origin}/checkout/sixtynine?cancelled=1`,
      }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.invoice_url) {
      console.error("NOWPayments invoice creation failed", {
        status: response.status,
        data,
      });
      return NextResponse.json(
        { error: "Could not start checkout. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      orderId,
      invoiceUrl: data.invoice_url,
    });
  } catch (error) {
    console.error("NOWPayments checkout error", error);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
