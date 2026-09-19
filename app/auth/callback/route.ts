import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { claimMarketplacePurchases } from "@/lib/marketplace/claim";

function safeNext(value:string|null){
  if(!value||!value.startsWith("/")||value.startsWith("//")) return "/dashboard";
  return value;
}

export async function GET(request:Request){
  const url=new URL(request.url);
  const code=url.searchParams.get("code");
  const next=safeNext(url.searchParams.get("next"));

  if(code){
    const supabase=await createClient();
    const {error}=await supabase.auth.exchangeCodeForSession(code);

    if(!error){
      const {data:{user}}=await supabase.auth.getUser();
      if(user?.email_confirmed_at){
        try{
          await claimMarketplacePurchases(user);
        }catch(claimError){
          console.error("Marketplace auto-claim after auth callback failed",claimError);
        }
      }
    }
  }

  return NextResponse.redirect(new URL(next,url.origin));
}
