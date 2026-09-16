import { createHmac,timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { paymentProduct } from "@/lib/marketplace/paymentProducts";

function sortObject(value:unknown):unknown{if(Array.isArray(value))return value.map(sortObject);if(value&&typeof value==="object")return Object.keys(value as Record<string,unknown>).sort().reduce<Record<string,unknown>>((out,key)=>{out[key]=sortObject((value as Record<string,unknown>)[key]);return out;},{});return value;}
function validSignature(payload:unknown,received:string,secret:string){const expected=createHmac("sha512",secret).update(JSON.stringify(sortObject(payload))).digest("hex");const a=Buffer.from(expected,"utf8"),b=Buffer.from(received,"utf8");return a.length===b.length&&timingSafeEqual(a,b);}
function numeric(value:unknown){const n=Number(value);return Number.isFinite(n)?n:null;}

export async function POST(request:Request){
 const secret=process.env.NOWPAYMENTS_IPN_SECRET;if(!secret)return NextResponse.json({error:"IPN is not configured."},{status:503});
 const signature=request.headers.get("x-nowpayments-sig")||"";if(!signature)return NextResponse.json({error:"Missing signature."},{status:401});
 try{
  const payload=await request.json();if(!validSignature(payload,signature,secret))return NextResponse.json({error:"Invalid signature."},{status:401});
  const orderId=typeof payload?.order_id==="string"?payload.order_id:"";const status=typeof payload?.payment_status==="string"?payload.payment_status:"";
  if(!orderId||!status)return NextResponse.json({error:"Invalid payment payload."},{status:400});
  const admin=createAdminClient();const {data:order,error}=await admin.from("marketplace_orders").select("*").eq("order_id",orderId).maybeSingle();
  if(error||!order){console.error("IPN order not found",{orderId,error});return NextResponse.json({error:"Order not found."},{status:404});}
  const product=paymentProduct(order.sku);if(!product)return NextResponse.json({error:"Order SKU is invalid."},{status:409});
  const priceAmount=numeric(payload?.price_amount);const paidAmount=numeric(payload?.actually_paid ?? payload?.pay_amount);
  const priceCurrency=String(payload?.price_currency||"").toLowerCase();
  const amountMatches=priceAmount!==null&&Math.abs(priceAmount-Number(order.price_amount))<0.01;
  const currencyMatches=priceCurrency===String(order.price_currency).toLowerCase();
  const update={payment_status:status,provider_payment_id:String(payload?.payment_id||order.provider_payment_id||""),paid_amount:paidAmount,pay_currency:String(payload?.pay_currency||""),updated_at:new Date().toISOString()};
  await admin.from("marketplace_orders").update(update).eq("order_id",orderId);
  if(status!=="finished")return NextResponse.json({received:true,fulfilled:false});
  if(!amountMatches||!currencyMatches){console.error("Finished payment failed order validation",{orderId,priceAmount,priceCurrency,expectedAmount:order.price_amount,expectedCurrency:order.price_currency});return NextResponse.json({error:"Payment does not match order."},{status:409});}
  if(order.fulfilled_at)return NextResponse.json({received:true,fulfilled:true,idempotent:true});
  if(!order.user_id)return NextResponse.json({error:"Order has no account owner."},{status:409});
  const expiresAt=product.durationDays?new Date(Date.now()+product.durationDays*86400000).toISOString():null;
  const {error:entitlementError}=await admin.from("marketplace_entitlements").upsert({user_id:order.user_id,order_id:orderId,product_slug:order.product_slug,license_tier:order.license_tier,status:"active",starts_at:new Date().toISOString(),expires_at:expiresAt,updated_at:new Date().toISOString()},{onConflict:"order_id,product_slug,license_tier"});
  if(entitlementError){console.error("Could not grant marketplace entitlement",{orderId,entitlementError});return NextResponse.json({error:"Payment verified; entitlement pending."},{status:500});}
  await admin.from("marketplace_orders").update({fulfilled_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("order_id",orderId).is("fulfilled_at",null);
  return NextResponse.json({received:true,fulfilled:true});
 }catch(error){console.error("NOWPayments IPN error",error);return NextResponse.json({error:"Invalid callback."},{status:400});}
}
