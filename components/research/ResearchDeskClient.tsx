"use client";
import { useEffect, useState, type FormEvent } from "react";

type Report={
 id:string;slug:string;title:string;market:string;format:string;summary:string;thesis:string;evidence:string;risks:string;
 invalidation:string;sources:string;conflict_disclosure:string;status:string;access_level:string;created_by:string;updated_at:string;
};
type Role="analyst"|"reviewer"|"admin";
const blank={title:"",market:"stocks",format:"research_note",summary:"",thesis:"",evidence:"",risks:"",invalidation:"",sources:"",conflict_disclosure:"",access_level:"public"};
type Draft=typeof blank & {id?:string};
const fields=[
 ["title","Report title", "text"],
 ["summary","Executive summary (20+ characters)","textarea"],
 ["thesis","Core thesis and scenario analysis (30+ characters)","textarea"],
 ["evidence","Evidence and supporting data","textarea"],
 ["risks","Material risks / downside case (30+ characters)","textarea"],
 ["invalidation","What would invalidate this thesis? (15+ characters)","textarea"],
 ["sources","Source links and references (one per line)","textarea"],
 ["conflict_disclosure","Analyst conflicts / holdings disclosure","textarea"],
] as const;
export default function ResearchDeskClient(){
 const [reports,setReports]=useState<Report[]>([]);
 const [role,setRole]=useState<Role|null>(null);
 const [draft,setDraft]=useState<Draft>(blank);
 const [working,setWorking]=useState(false);
 const [message,setMessage]=useState("");
 const [failure,setFailure]=useState(false);
 const [selected,setSelected]=useState<string|null>(null);
 async function load(){
  try{
   const response=await fetch("/api/research-desk",{cache:"no-store"});
   const result=await response.json();
   if(!response.ok){setFailure(true);setMessage(result.error||"Unable to load reports");return;}
   setReports(result.reports||[]);setRole(result.role);setFailure(false);
  }catch{setFailure(true);setMessage("Unable to connect to the research desk.");}
 }
 useEffect(()=>{void load()},[]);
 async function act(action:string,id?:string){
  setWorking(true);setMessage("");
  try{
   const response=await fetch("/api/research-desk",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(action==="save"?{...draft,action}:{action,id})});
   const result=await response.json();
   if(!response.ok)throw new Error(result.error||"Unable to complete action");
   setFailure(false);setMessage(action==="save"?"Draft saved.":"Report moved through editorial workflow.");
   if(action==="save")setDraft(blank);
   await load();
  }catch(e){setFailure(true);setMessage(e instanceof Error?e.message:"Operation failed.");}
  finally{setWorking(false);}
 }
 function edit(r:Report){if(!["draft","rejected"].includes(r.status))return;const v:Draft={id:r.id,title:r.title,market:r.market,format:r.format,summary:r.summary,thesis:r.thesis,evidence:r.evidence,risks:r.risks,invalidation:r.invalidation,sources:r.sources,conflict_disclosure:r.conflict_disclosure,access_level:r.access_level};setDraft(v);window.scrollTo({top:0,behavior:"smooth"});}
 const formFields=fields.map(([key,label,kind])=><label key={key}>{label}{kind==="text"?<input required minLength={8} maxLength={170} value={draft[key]} onChange={e=>setDraft({...draft,[key]:e.target.value})}/>:<textarea required={["summary","thesis","risks","invalidation"].includes(key)} rows={key==="thesis"?6:3} value={draft[key]} onChange={e=>setDraft({...draft,[key]:e.target.value})}/>}</label>);
 return <div className="deskPanels">
  <section className="deskPanel" aria-label="Research drafting">
   <div className="deskPanelHeading"><div><span>01 / ANALYST WORKSPACE</span><h2>{draft.id?"Edit research draft":"New research report"}</h2></div><button className="deskOutline" type="button" onClick={()=>setDraft(blank)}>Clear</button></div>
   <form onSubmit={(e:FormEvent)=>{e.preventDefault();void act("save")}} className="deskForm">
    <div className="deskFormRow"><label>Research desk<select value={draft.market} onChange={e=>setDraft({...draft,market:e.target.value})}><option value="stocks">Equity research</option><option value="crypto">Digital asset research</option><option value="macro">Macroeconomic research</option></select></label><label>Publication format<select value={draft.format} onChange={e=>setDraft({...draft,format:e.target.value})}><option value="research_note">Research note</option><option value="market_brief">Market brief</option><option value="deep_dive">Deep dive</option><option value="thesis_update">Thesis update</option></select></label></div>
    <label>Content access<select value={draft.access_level} onChange={e=>setDraft({...draft,access_level:e.target.value})}><option value="public">Public educational report</option><option value="premium">Premium draft only (publishing disabled)</option></select></label>
    {formFields}
    <p className="deskSmall">Saving never publishes or emails a report. Premium content cannot be published in this release.</p>
    <button type="submit" disabled={working} className="deskPrimary">{working?"Saving...":"Save draft"}</button>
   </form>
  </section>
  <section className="deskPanel" aria-label="Editorial queue">
   <div className="deskPanelHeading"><div><span>02 / EDITORIAL CONTROL</span><h2>Review and publication queue</h2></div><button className="deskOutline" type="button" onClick={()=>void load()}>Refresh</button></div>
   <p className="deskSmall">Editors submit drafts, independent reviewers approve, and administrators publish only approved public research. No automated distribution.</p>
   {role&&<p className="deskRole">Signed in with research role: <b>{role}</b></p>}
   {message&&<p role="status" className={failure?"deskError":"deskSuccess"}>{message}</p>}
   {!reports.length?<div className="deskEmpty">No research reports are visible to this account.</div>:<div className="deskQueue">{reports.map(report=><article key={report.id} className="deskReport">
    <div className="deskReportTop"><span>{report.market} / {report.format.replaceAll("_"," ")}</span><b className={"deskStatus deskStatus-"+report.status}>{report.status}</b></div>
    <h3>{report.title}</h3><p>{report.summary}</p><small>Updated {new Date(report.updated_at).toLocaleString()}</small>
    <div className="deskActions">
      <button type="button" className="deskOutline" onClick={()=>setSelected(selected===report.id?null:report.id)}>{selected===report.id?"Hide details":"Review details"}</button>
      {["draft","rejected"].includes(report.status)&&<button type="button" className="deskOutline" onClick={()=>edit(report)}>Edit</button>}
      {["draft","rejected"].includes(report.status)&&<button disabled={working} type="button" className="deskPrimary" onClick={()=>void act("submit",report.id)}>Submit for review</button>}
      {report.status==="submitted"&&(role==="reviewer"||role==="admin")&&<>
        <button disabled={working} type="button" className="deskOutline" onClick={()=>void act("reject",report.id)}>Reject</button>
        <button disabled={working} type="button" className="deskPrimary" onClick={()=>void act("approve",report.id)}>Approve</button>
      </>}
      {report.status==="approved"&&role==="admin"&&report.access_level==="public"&&<button disabled={working} type="button" className="deskPrimary" onClick={()=>{if(window.confirm("Publish this approved public report? It will become visible in the research archive."))void act("publish",report.id)}}>Publish</button>}
      {report.status==="published"&&<a className="deskOutline" href={"/research/"+report.slug} target="_blank" rel="noreferrer">Open public report ↗</a>}
    </div>
    {selected===report.id&&<div className="deskFullNote">{([["Thesis",report.thesis],["Evidence",report.evidence],["Risks",report.risks],["Invalidation",report.invalidation],["Sources",report.sources],["Conflicts",report.conflict_disclosure]] as const).map(([label,value])=><section key={label}><h4>{label}</h4><p>{value||"Not provided"}</p></section>)}</div>}
   </article>)}</div>}
  </section>
 </div>;
}