import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime="nodejs";
export const dynamic="force-dynamic";

const privateHeaders={"Cache-Control":"private, no-store, max-age=0","Referrer-Policy":"no-referrer","X-Robots-Tag":"noindex, nofollow"};

export async function GET(){
  try{
    const invite=process.env.INNER_CIRCLE_TELEGRAM_INVITE_URL;
    if(!invite||!/^https:\/\/t\.me\/\+[A-Za-z0-9_-]+$/.test(invite)){
      return NextResponse.json({error:"Private invitation is temporarily unavailable. Contact Gencouv support."},{status:503,headers:privateHeaders});
    }
    const auth=await createClient();
    const {data:{user}}=await auth.auth.getUser();
    if(!user?.email||!user.email_confirmed_at){
      return NextResponse.redirect(new URL("/login?next=%2Finner-circle%2Fmember","https://gencouv.com"),{status:303,headers:privateHeaders});
    }
    const db=createAdminClient();
    const {data:verifications,error:reviewError}=await db.from("gencouv_inner_circle_verifications")
      .select("order_id,status,user_id").eq("user_id",user.id).eq("status","approved").limit(20);
    if(reviewError)throw reviewError;
    if(!verifications?.length){
      return NextResponse.json({error:"Telegram access requires approval after account and payment verification."},{status:403,headers:privateHeaders});
    }
    const orderIds=verifications.map(v=>v.order_id);
    const {data:orders,error:orderError}=await db.from("marketplace_orders")
      .select("order_id,customer_email,payment_status,fulfilled_at,sku")
      .in("order_id",orderIds).eq("sku","gencouv-inner-circle-annual")
      .eq("payment_status","finished").not("fulfilled_at","is",null);
    if(orderError)throw orderError;
    const eligibleOrderIds=(orders||[]).filter(o=>o.customer_email?.toLowerCase()===user.email?.toLowerCase()).map(o=>o.order_id);
    if(!eligibleOrderIds.length){
      return NextResponse.json({error:"No verified paid membership matches this account."},{status:403,headers:privateHeaders});
    }
    const {data:entitlements,error:entitlementError}=await db.from("marketplace_entitlements")
      .select("order_id,status,expires_at,user_id").in("order_id",eligibleOrderIds)
      .eq("user_id",user.id).eq("product_slug","inner-circle")
      .eq("license_tier","research_annual").eq("status","active");
    if(entitlementError)throw entitlementError;
    const active=(entitlements||[]).some(e=>!e.expires_at||Date.parse(e.expires_at)>Date.now());
    if(!active){
      return NextResponse.json({error:"Your annual membership is not active."},{status:403,headers:privateHeaders});
    }
    return NextResponse.redirect(invite,{status:302,headers:privateHeaders});
  }catch(error){
    console.error("Inner Circle invite authorization failed",error instanceof Error?error.message:"unknown");
    return NextResponse.json({error:"Unable to verify private group access right now."},{status:503,headers:privateHeaders});
  }
}
