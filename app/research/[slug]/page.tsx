import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeNavigation from "@/components/home/HomeNavigation";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";
import { createAdminClient } from "@/lib/supabase-admin";
import "../../home-redesign.css";
import "../../investment-intelligence/research.css";
import "../archive.css";
export const dynamic="force-dynamic";
type Params={params:Promise<{slug:string}>};
async function getReport(slug:string){
 const {data,error}=await createAdminClient().from("gencouv_research_reports").select("title,summary,thesis,evidence,risks,invalidation,sources,conflict_disclosure,market,format,published_at").eq("slug",slug).eq("status","published").eq("access_level","public").maybeSingle();
 if(error)throw error;
 return data;
}
export async function generateMetadata({params}:Params):Promise<Metadata>{
 const {slug}=await params;
 if(!/^[a-z0-9-]{1,110}$/.test(slug))return {title:"Research note not found"};
 try{const r=await getReport(slug);return r?{title:r.title+" | Gencouv Research",description:r.summary.slice(0,160),alternates:{canonical:"/research/"+slug}}:{title:"Research note not found"};}catch{return {title:"Gencouv Research"};}
}
export default async function ReportPage({params}:Params){
 const {slug}=await params;
 if(!/^[a-z0-9-]{1,110}$/.test(slug))notFound();
 let r;
 try{r=await getReport(slug);}catch{notFound();}
 if(!r)notFound();
 const blocks=[["Research thesis",r.thesis],["Evidence and analysis",r.evidence],["Key risks and downside scenarios",r.risks],["Invalidation conditions",r.invalidation],["References and source material",r.sources],["Conflicts of interest",r.conflict_disclosure]];
 return <main className="researchPage archivePage"><HomeNavigation/>
  <article className="shell archiveArticle"><a href="/research">← Public research archive</a><div className="archiveArticleMeta"><span>{r.market} / {r.format.replaceAll("_"," ")}</span><time>{r.published_at?new Date(r.published_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):""}</time></div><h1>{r.title}</h1><p className="archiveArticleLead">{r.summary}</p>
  {blocks.map(([name,text])=><section key={name}><h2>{name}</h2><p>{text||"Not disclosed in this report."}</p></section>)}
  <div className="archiveRisk"><strong>Risk disclosure</strong><p>Research is general educational commentary and may be inaccurate. It is not personalized investment advice, and it does not guarantee any outcome. Evaluate independent sources and your own risk tolerance.</p></div>
  </article>
  <FloatingGencouvChat/>
 </main>;
}