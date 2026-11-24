import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Role = "analyst" | "reviewer" | "admin";
type Input = Record<string, unknown>;
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0,max) : "";
function response(data: unknown, status = 200) {
 return NextResponse.json(data, {status, headers:{"Cache-Control":"no-store"}});
}
async function session() {
 const client = await createClient();
 const {data:{user},error} = await client.auth.getUser();
 if(error || !user) return null;
 const admin = createAdminClient();
 const {data:member,error:roleError} = await admin.from("gencouv_research_team").select("role,display_name").eq("user_id",user.id).maybeSingle();
 if(roleError || !member) return null;
 return {user,admin,role:member.role as Role};
}
function allowedOrigin(request: NextRequest) {
 const origin = request.headers.get("origin");
 if(!origin) return false;
 try {const u=new URL(origin);return ["https://gencouv.com","https://www.gencouv.com"].includes(u.origin);}catch{return false;}
}
export async function GET() {
 try {
  const access=await session();
  if(!access) return response({error:"Research desk access required."},403);
  const {data,error}=await access.admin.from("gencouv_research_reports")
    .select("id,slug,title,market,format,summary,thesis,evidence,risks,invalidation,sources,conflict_disclosure,status,access_level,created_by,reviewed_at,published_at,updated_at")
    .order("updated_at",{ascending:false}).limit(100);
  if(error) throw error;
  const reports=access.role==="analyst" ? (data||[]).filter(x=>x.created_by===access.user.id) : (data||[]);
  return response({role:access.role,reports});
 } catch(e){console.error("research desk list",e instanceof Error?e.message:"unknown");return response({error:"Research desk unavailable."},503);}
}
export async function POST(request: NextRequest) {
 if(!allowedOrigin(request)) return response({error:"Invalid request origin."},403);
 const length=Number(request.headers.get("content-length")||"0");
 if(length>65000) return response({error:"Report exceeds request limit."},413);
 let body:Input;
 try{body=await request.json();if(!body || typeof body!=="object" || Array.isArray(body))throw new Error("invalid");}catch{return response({error:"Invalid JSON."},400);}
 try{
  const access=await session();
  if(!access)return response({error:"Research desk access required."},403);
  const {admin,user,role}=access;
  const action=clean(body.action,20);
  if(action==="save"){
   const title=clean(body.title,170),summary=clean(body.summary,1200),thesis=clean(body.thesis,15000),risks=clean(body.risks,15000),invalidation=clean(body.invalidation,8000);
   const market=clean(body.market,20),format=clean(body.format,30),accessLevel=clean(body.access_level,20);
   if(title.length<8 || summary.length<20 || thesis.length<30 || risks.length<30 || invalidation.length<15 || !["stocks","crypto","macro"].includes(market) || !["research_note","market_brief","deep_dive","thesis_update"].includes(format)||!["public","premium"].includes(accessLevel))return response({error:"Complete the research thesis, evidence summary, risks, and invalidation conditions."},400);
   const values={title,summary,thesis,risks,invalidation,market,format,access_level:accessLevel,
     evidence:clean(body.evidence,15000),sources:clean(body.sources,12000),conflict_disclosure:clean(body.conflict_disclosure,2000),updated_at:new Date().toISOString()};
   const id=clean(body.id,40);
   if(id){
    const {data:prior,error:fetchError}=await admin.from("gencouv_research_reports").select("id,status,created_by").eq("id",id).maybeSingle();
    if(fetchError)throw fetchError;
    if(!prior)return response({error:"Report not found."},404);
    if(!["draft","rejected"].includes(prior.status))return response({error:"Only draft or rejected reports can be edited."},409);
    if(prior.created_by!==user.id && role!=="admin")return response({error:"Only the author or administrator can edit this draft."},403);
    const {error}=await admin.from("gencouv_research_reports").update({...values,status:"draft",reviewed_by:null,reviewed_at:null}).eq("id",id).in("status",["draft","rejected"]);
    if(error)throw error;
    await admin.from("gencouv_research_audit").insert({report_id:id,actor_id:user.id,action:"edited"});
    return response({ok:true,id});
   }
   const slug=title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"").slice(0,80)+"-"+randomUUID().slice(0,8);
   const {data,error}=await admin.from("gencouv_research_reports").insert({...values,slug,created_by:user.id}).select("id").single();
   if(error)throw error;
   await admin.from("gencouv_research_audit").insert({report_id:data.id,actor_id:user.id,action:"created"});
   return response({ok:true,id:data.id},201);
  }
  const id=clean(body.id,40);
  if(!/^[0-9a-f-]{36}$/i.test(id))return response({error:"Invalid report ID."},400);
  const {data:report,error:fetchError}=await admin.from("gencouv_research_reports").select("id,status,created_by,reviewed_by,access_level").eq("id",id).maybeSingle();
  if(fetchError)throw fetchError;
  if(!report)return response({error:"Report not found."},404);
  let expected="",changes:Record<string,unknown>={},audit="";
  if(action==="submit"){
   if(report.created_by!==user.id && role!=="admin")return response({error:"Author permission required."},403);
   if(!["draft","rejected"].includes(report.status))return response({error:"Only drafts can be submitted."},409);
   expected=report.status;changes={status:"submitted"};audit="submitted";
  }else if(action==="approve"||action==="reject"){
   if(!["reviewer","admin"].includes(role))return response({error:"Reviewer permission required."},403);
   if(report.created_by===user.id)return response({error:"Authors cannot approve their own work."},403);
   if(report.status!=="submitted")return response({error:"Only submitted reports can be reviewed."},409);
   expected="submitted";changes={status:action==="approve"?"approved":"rejected",reviewed_by:user.id,reviewed_at:new Date().toISOString()};audit=action==="approve"?"approved":"rejected";
  }else if(action==="publish"){
   if(role!=="admin")return response({error:"Administrator permission required."},403);
   if(report.status!=="approved" || report.access_level!=="public")return response({error:"Only reviewed public research can be published. Premium research remains disabled."},409);
   if(report.reviewed_by===report.created_by)return response({error:"Independent reviewer required."},403);
   expected="approved";changes={status:"published",published_at:new Date().toISOString()};audit="published";
  }else{return response({error:"Unsupported action."},400);}
  const {data:changed,error}=await admin.from("gencouv_research_reports").update({...changes,updated_at:new Date().toISOString()}).eq("id",id).eq("status",expected).select("id").maybeSingle();
  if(error)throw error;
  if(!changed)return response({error:"Report changed before this action. Reload and try again."},409);
  await admin.from("gencouv_research_audit").insert({report_id:id,actor_id:user.id,action:audit});
  return response({ok:true,id});
 }catch(e){console.error("research desk mutation",e instanceof Error?e.message:"unknown");return response({error:"Research desk action failed."},503);}
}