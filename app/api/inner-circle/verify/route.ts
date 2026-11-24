import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { compareMemberCode } from "@/lib/inner-circle/member-code";

export const runtime="nodejs";

export async function POST(request:Request){
 const length=Number(request.headers.get("content-length")||"0");
 if(length>2048)return NextResponse.json({error:"Invalid request."},{status:400});
 let body:Record<string,unknown>;
 try{body=await request.json();}catch{return NextResponse.json({error:"Invalid request."},{status:400});}
 const orderId=typeof body.orderId==="string"?body.orderId.trim():"";
 const code=typeof body.code==="string"?body.code.trim().toUpperCase():"";
 if(!/^GC-[A-Z0-9-]{10,100}$/.test(orderId)||!/^GCIC-[A-F0-9-]{20,30}$/.test(code))
   return NextResponse.json({error:"Check your order reference and verification code."},{status:400});
 try{
  const auth=await createClient();const {data:{user}}=await auth.auth.getUser();
  if(!user?.email||!user.email_confirmed_at)return NextResponse.json({error:"Sign in and verify your checkout email first."},{status:401});
  const db=createAdminClient();
  const {data:order,error:orderError}=await db.from("marketplace_orders")
   .select("order_id,customer_email,user_id,sku,price_amount,price_currency,payment_status,fulfilled_at")
   .eq("order_id",orderId).maybeSingle();
  if(orderError)throw orderError;
  if(!order||order.sku!=="gencouv-inner-circle-annual"||order.payment_status!=="finished"||!order.fulfilled_at)
    return NextResponse.json({error:"This order is not a verified Inner Circle payment."},{status:403});
  if(!order.customer_email||order.customer_email.toLowerCase()!==user.email.toLowerCase())
    return NextResponse.json({error:"Sign in with the email address used at checkout."},{status:403});
  if(order.user_id&&order.user_id!==user.id)
    return NextResponse.json({error:"This payment is linked to another account."},{status:403});
  if(!compareMemberCode(orderId,code))
    return NextResponse.json({error:"The code does not match this paid order."},{status:403});
  const {data:verification,error:vError}=await db.from("gencouv_inner_circle_verifications")
    .select("status,user_id").eq("order_id",orderId).maybeSingle();
  if(vError)throw vError;
  if(verification?.user_id&&verification.user_id!==user.id)
    return NextResponse.json({error:"This code has already been claimed by another account."},{status:403});
  if(verification?.status==="revoked"||verification?.status==="rejected")
    return NextResponse.json({error:"Contact support about this membership review."},{status:403});
  if(verification?.status==="approved")
    return NextResponse.json({message:"Your membership verification is approved. Contact Gencouv support for your personal Telegram invitation."});
  const now=new Date().toISOString();
  const {error:saveError}=await db.from("gencouv_inner_circle_verifications").upsert({
    order_id:orderId,user_id:user.id,status:"pending_review",requested_at:now,updated_at:now
  },{onConflict:"order_id"});
  if(saveError)throw saveError;
  return NextResponse.json({message:"Verification code accepted. Your membership is pending manual approval. No Telegram invitation has been issued yet."});
 }catch(error){
  console.error("Inner Circle member verification failed",error instanceof Error?error.message:"unknown");
  return NextResponse.json({error:"Unable to verify your membership right now."},{status:503});
 }
}
