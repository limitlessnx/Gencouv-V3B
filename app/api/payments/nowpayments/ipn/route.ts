import { createHmac,timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { paymentProduct } from "@/lib/marketplace/paymentProducts";
import { sendMarketplaceFulfilledEmail } from "@/lib/marketplace/resend";

function sortObject(value:unknown):unknown{if(Array.isArray(value))return value.map(sortObject);if(value&&typeof value==="object")return Object.keys(value as Record<string,unknown>).sort().reduce<Record<string,unknown>>((out,key)=>{out[key]=sortObject((value as Record<string,unknown>)[key]);return out;},{});return value;}
function validSignature(payload:unknown,received:string,secret:string){const expected=createHmac("sha512",secret).update(JSON.stringify(sortObject(payload))).digest("hex");const a=Buffer.from(expected,"utf8"),b=Buffer.from(received,"utf8");return a.length===b.length&&timingSafeEqual(a,b);}
function numeric(value:unknown){const n=Number(value);return Number.isFinite(n)?n:null;}
function licenseName(tier:string){if(tier==="gold")return "L.O.R.C Gold — 1 Year";if(tier==="full")return "L.O.R.C Full Access — Lifetime";return tier.replaceAll("_"," ");}

async function deliverEmail(admin:ReturnType<typeof createAdminClient>,order:any,product:any,origin:string){
 if(order.fulfillment_email_sent_at||!order.customer_email)return false;
 try{
  await sendMarketplaceFulfilledEmail({email:order.customer_email,productName:product.name,licenseName:licenseName(order.license_tier),orderId:order.order_id,guest:!order.user_id,origin});
  await admin.from("marketplace_orders").update({fulfillment_email_sent_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("order_id",order.order_id).is("fulfillment_email_sent_at",null);
  return true;
 }catch(error){console.error("Marketplace fulfillment email failed",{orderId:order.order_id,error});return false;}
}

export async function POST(request:Request){
 const secret=process.env.NOWPAYMENTS_IPN_SECRET;if(!secret)return NextResponse.json({error:"IPN is not configured."},{status:503});
 const signature=request.headers.get("x-nowpayments-sig")||"";if(!signature)return NextResponse.json({error:"Missing signature."},{status:401});
 try{
  const payload=await request.json();if(!validSignature(payload,signature,secret))return NextResponse.json({error:"Invalid signature."},{status:401});
  const orderId=typeof payload?.order_id==="string"?payload.order_id:"",status=typeof payload?.payment_status==="string"?payload.payment_status:"";if(!orderId||!status)return NextResponse.json({error:"Invalid payment payload."},{status:400});
  const admin=createAdminClient();const {data:order,error}=await admin.from("marketplace_orders").select("*").eq("order_id",orderId).maybeSingle();if(error||!order)return NextResponse.json({error:"Order not found."},{status:404});
  const product=paymentProduct(order.sku);if(!product)return NextResponse.json({error:"Order SKU is invalid."},{status:409});
  const priceAmount=numeric(payload?.price_amount),paidAmount=numeric(payload?.actually_paid??payload?.pay_amount),priceCurrency=String(payload?.price_currency||"").toLowerCase();
  const amountMatches=priceAmount!==null&&Math.abs(priceAmount-Number(order.price_amount))<.01,currencyMatches=priceCurrency===String(order.price_currency).toLowerCase();
  await admin.from("marketplace_orders").update({payment_status:status,provider_payment_id:String(payload?.payment_id||order.provider_payment_id||""),paid_amount:paidAmount,pay_currency:String(payload?.pay_currency||""),updated_at:new Date().toISOString()}).eq("order_id",orderId);
  if(status!=="finished")return NextResponse.json({received:true,fulfilled:false});
  if(!amountMatches||!currencyMatches)return NextResponse.json({error:"Payment does not match order."},{status:409});
  const origin=new URL(request.url).origin;
  if(order.fulfilled_at){const emailSent=await deliverEmail(admin,order,product,origin);return NextResponse.json({received:true,fulfilled:true,idempotent:true,emailSent:emailSent||Boolean(order.fulfillment_email_sent_at)});}
  const expiresAt=product.durationDays?new Date(Date.now()+product.durationDays*86400000).toISOString():null,claimed=Boolean(order.user_id);
  const {error:entitlementError}=await admin.from("marketplace_entitlements").upsert({user_id:order.user_id||null,customer_email:order.customer_email||null,order_id:orderId,product_slug:order.product_slug,license_tier:order.license_tier,status:claimed?"active":"unclaimed",starts_at:new Date().toISOString(),expires_at:expiresAt,claimed_at:claimed?new Date().toISOString():null,updated_at:new Date().toISOString()},{onConflict:"order_id,product_slug,license_tier"});
  if(entitlementError){console.error("Could not grant marketplace entitlement",{orderId,entitlementError});return NextResponse.json({error:"Payment verified; entitlement pending."},{status:500});}
  const fulfilledAt=new Date().toISOString();await admin.from("marketplace_orders").update({fulfilled_at:fulfilledAt,updated_at:fulfilledAt}).eq("order_id",orderId).is("fulfilled_at",null);
  const emailSent=await deliverEmail(admin,{...order,fulfilled_at:fulfilledAt},product,origin);
  return NextResponse.json({received:true,fulfilled:true,claimRequired:!claimed,emailSent});
 }catch(error){console.error("NOWPayments IPN error",error);return NextResponse.json({error:"Invalid callback."},{status:400});}
}
