import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { claimMarketplacePurchases } from "@/lib/marketplace/claim";
import { robotics20 } from "@/lib/inner-circle/robotics20";
import { createAdminClient } from "@/lib/supabase-admin";
import InnerCircleVerificationForm from "@/components/research/InnerCircleVerificationForm";
import "../inner-circle.css";
import "../../investment-intelligence/research.css";

export const metadata:Metadata={title:"Members | Gencouv Inner Circle",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";

export default async function InnerCircleMemberPage(){
  const db=await createClient();
  const {data:{user}}=await db.auth.getUser();
  if(!user)redirect("/login?next=/inner-circle/member");
  if(!user.email_confirmed_at)redirect("/dashboard");
  const query=()=>db.from("marketplace_entitlements")
    .select("order_id,starts_at,expires_at,status")
    .eq("user_id",user.id).eq("product_slug","inner-circle")
    .eq("license_tier","research_annual").eq("status","active")
    .order("created_at",{ascending:false});
  let {data:entitlements,error}=await query();
  if(error)throw new Error("Could not verify membership entitlement");
  if(!entitlements?.length){
    await claimMarketplacePurchases(user);
    const result=await query();if(result.error)throw new Error("Could not verify membership entitlement");
    entitlements=result.data;
  }
  const entitlement=(entitlements||[]).find(x=>!x.expires_at||Date.parse(x.expires_at)>Date.now());
  if(!entitlement)redirect("/inner-circle#membership");
  const {data:verification}=await createAdminClient().from("gencouv_inner_circle_verifications").select("status,user_id").eq("order_id",entitlement.order_id).maybeSingle();
  const verificationStatus=verification?.user_id===user.id?verification.status:"awaiting_claim";
  return <main className="researchPage gcMemberPage">
    <div className="shell gcMemberHead"><Link href="/inner-circle">← Inner Circle</Link><span>GENCOUV CAPITAL · MEMBER RESEARCH</span></div>
    <section className="shell gcMemberHero">
      <span className="researchKicker">MEMBER ACCESS / EDUCATIONAL WATCHLIST</span>
      <h1>The Robotics 20.</h1>
      <p>A curated starting universe across physical AI, autonomous fleets, machine vision, sensing, and motion-control infrastructure. This initial member brief identifies what to investigate and the key risks to test, not what to buy.</p>
      <div className="gcMemberFacts"><span>20 companies</span><span>4 research pillars</span><span>Annual access ends {entitlement.expires_at?new Date(entitlement.expires_at).toLocaleDateString("en-GB",{dateStyle:"medium"}):"according to membership terms"}</span></div>
    </section>
    <section className="shell"><InnerCircleVerificationForm orderId={entitlement.order_id} status={verificationStatus}/></section>
    <section className="shell gcMemberContent">
      {robotics20.map((pillar,i)=><article className="gcMemberPillar" key={pillar.title}>
        <div><span className="researchKicker">PILLAR 0{i+1}</span><h2>{pillar.title}</h2><p>{pillar.description}</p></div>
        <div className="gcMemberCompanies">
          {pillar.companies.map(x=><section className="gcMemberCompany" key={x.ticker}>
            <div><strong>{x.ticker}</strong><span>{x.company}</span></div>
            <p>{x.role}</p>
            <small>Key question / risk: {x.researchRisk}</small>
          </section>)}
        </div>
      </article>)}
    </section>
    <section className="shell gcMemberNote"><h2>Research notes</h2><p>Company roles and ticker mappings require editorial and corporate-action verification before inclusion in a dated investment thesis. This version does not provide accumulation zones, target prices, return forecasts, or trade instructions. Price levels must come from contemporaneous research and risk review, not marketing assumptions.</p><p>Leveraged CFDs can magnify both gains and losses and can result in rapid loss of capital. Nothing in this dossier is tailored to any investor's finances, experience, or suitability.</p><p><strong>Member Telegram:</strong> Use your payment confirmation code in the verification form above. Gencouv reviews the request manually before sharing any private invite.</p><a href="https://t.me/gencouv" target="_blank" rel="noreferrer">Contact member support ↗</a></section>
  </main>;
}
