import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { claimMarketplacePurchases } from "@/lib/marketplace/claim";

export async function POST(){
  try{
    const supabase=await createClient();
    const {data:{user}}=await supabase.auth.getUser();

    if(!user?.email){
      return NextResponse.json({error:"Sign in with the email used for checkout."},{status:401});
    }

    if(!user.email_confirmed_at){
      return NextResponse.json({error:"Confirm your email before claiming marketplace purchases."},{status:403});
    }

    const result=await claimMarketplacePurchases(user);
    return NextResponse.json(result);
  }catch(error){
    console.error("Marketplace claim error",error);
    return NextResponse.json({error:"Could not claim purchases."},{status:500});
  }
}
