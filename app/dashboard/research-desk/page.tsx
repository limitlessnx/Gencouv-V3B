import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import HomeNavigation from "@/components/home/HomeNavigation";
import ResearchDeskClient from "@/components/research/ResearchDeskClient";
import "../../home-redesign.css";
import "../../investment-intelligence/research.css";
import "./desk.css";
export const dynamic = "force-dynamic";
export default async function ResearchDeskPage(){
 const db=await createClient();
 const {data:{user}}=await db.auth.getUser();
 if(!user)redirect("/login?next=/dashboard/research-desk");
 const admin=createAdminClient();
 const {data:membership}=await admin.from("gencouv_research_team").select("role").eq("user_id",user.id).maybeSingle();
 return <main className="researchPage deskPage"><HomeNavigation/>
  <section className="shell deskHero"><a href="/dashboard">← Client dashboard</a><span>GENCOUV / INTERNAL EDITORIAL WORKSPACE</span><h1>Research Desk</h1><p>Create original research, document evidence and risk, and route every report through independent editorial review before public publication.</p></section>
  {membership?<div className="shell"><ResearchDeskClient/></div>:<section className="shell deskUnauthorized"><h2>Research team access required</h2><p>This workspace is restricted to Gencouv's approved analysts, reviewers and administrators. Your account has not been assigned a research role.</p><a href="https://t.me/gencouv" target="_blank" rel="noreferrer">Contact Gencouv about team access ↗</a></section>}
 </main>;
}