import type { Metadata } from "next";
import HomeNavigation from "@/components/home/HomeNavigation";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";
import { createAdminClient } from "@/lib/supabase-admin";
import "../home-redesign.css";
import "../investment-intelligence/research.css";
import "./archive.css";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Research Archive | Gencouv Capital",description:"Explore dated, public Gencouv research notes across equities, crypto and macroeconomic markets.",alternates:{canonical:"/research"}};
type Entry={id:string;slug:string;title:string;market:string;format:string;summary:string;published_at:string|null};
export default async function Archive(){
 let reports:Entry[]=[];
 try{
  const {data,error}=await createAdminClient().from("gencouv_research_reports").select("id,slug,title,market,format,summary,published_at").eq("status","published").eq("access_level","public").order("published_at",{ascending:false}).limit(80);
  if(error)throw error;
  reports=data||[];
 }catch(e){console.error("research archive retrieval",e instanceof Error?e.message:"unknown");}
 return <main className="researchPage archivePage"><HomeNavigation/>
   <section className="shell archiveHero"><span className="researchKicker">GENCOUV / PUBLIC RESEARCH</span><h1>The research archive.</h1><p>Original market research, supporting reasoning and risk assessments. Only reviewed, publicly released Gencouv reports appear here.</p><a href="/investment-intelligence">← Investment Intelligence</a></section>
   <section className="shell archiveList" aria-label="Published research">
    {!reports.length?<div className="archiveEmpty"><h2>Research publications coming soon.</h2><p>We’re developing the research desk and editorial review process. Approved public reports will appear here once published, with dates and their original theses preserved.</p><a href="/investment-intelligence#newsletter">Join the free research newsletter ↗</a></div>:<div className="archiveGrid">{reports.map(report=><article key={report.id}><div className="archiveMeta"><span>{report.market} / {report.format.replaceAll("_"," ")}</span><time>{report.published_at?new Date(report.published_at).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):""}</time></div><h2>{report.title}</h2><p>{report.summary}</p><a href={"/research/"+encodeURIComponent(report.slug)}>Read research note ↗</a></article>)}</div>}
   </section>
   <section className="researchDisclaimer shell"><h2>Research risk notice</h2><p>Research is provided for general information and education, not personal investment advice. Published ideas may be incorrect, incomplete or overtaken by new events. All investments involve risk, including loss of capital.</p></section>
   <FloatingGencouvChat/>
 </main>;
}