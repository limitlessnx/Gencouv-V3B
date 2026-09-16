import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { paymentProduct } from "@/lib/marketplace/paymentProducts";

function normalizeEmail(value:unknown){const email=String(value||"").trim().toLowerCase();return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?email:null;}

export async function POST(request:Request){
 const apiKey=process.env.NOWPAYMENTS_API_KEY;if(!apiKey)return NextResponse.json({error:"Payment gateway is not configured."},{status:503});
 try{
  const body=await request.json().catch(()=>({}));const product=paymentProduct(String(body?.productId||""));if(!product)return NextResponse.json({error:"Unknown product."},{status:400});
  const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();
  const email=user?.email?.toLowerCase()||normalizeEmail(body?.email);if(!user&&!email)return NextResponse.json({error:"Enter a valid email address to continue as guest."},{status:400});
  const admin=createAdminClient();const origin=new URL(request.url).origin;const orderId=`GC-${product.sku}-${Date.now()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  const {error:orderError}=await admin.from("marketplace_orders").insert({order_id:orderId,user_id:user?.id||null,customer_email:email,sku:product.sku,product_slug:product.slug,license_tier:product.licenseTier,price_amount:product.price,price_currency:product.currency,payment_status:"creating"});
  if(orderError){console.error("Could not persist marketplace order",orderError);return NextResponse.json({error:"Could not create order."},{status:500});}
  const response=await fetch("https://api.nowpayments.io/v1/invoice",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":apiKey},body:JSON.stringify({price_amount:product.price,price_currency:product.currency,order_id:orderId,order_description:product.name,ipn_callback_url:`${origin}/api/payments/nowpayments/ipn`,success_url:`${origin}/checkout/${product.slug}/success?order=${encodeURIComponent(orderId)}`,cancel_url:`${origin}/checkout/${product.slug}?cancelled=1`}),cache:"no-store"});
  const data=await response.json().catch(()=>null);if(!response.ok||!data?.invoice_url){await admin.from("marketplace_orders").update({payment_status:"invoice_failed",updated_at:new Date().toISOString()}).eq("order_id",orderId);console.error("NOWPayments invoice creation failed",{status:response.status,data});return NextResponse.json({error:"Could not start checkout. Please try again."},{status:502});}
  await admin.from("marketplace_orders").update({payment_status:"waiting",provider_invoice_id:String(data.id||data.invoice_id||""),updated_at:new Date().toISOString()}).eq("order_id",orderId);
  return NextResponse.json({orderId,invoiceUrl:data.invoice_url,guest:!user});
 }catch(error){console.error("NOWPayments checkout error",error);return NextResponse.json({error:"Could not start checkout. Please try again."},{status:500});}
}
