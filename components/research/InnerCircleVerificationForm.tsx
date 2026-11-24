"use client";
import { useState, type FormEvent } from "react";

export default function InnerCircleVerificationForm({orderId,status}:{orderId:string;status:string}){
 const [code,setCode]=useState("");
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState("");
 const [error,setError]=useState(false);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(busy)return;setBusy(true);setMessage("");setError(false);
  try{
    const res=await fetch("/api/inner-circle/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderId,code})});
    const data=await res.json();setMessage(data.message||data.error||"Could not submit verification.");setError(!res.ok);
    if(res.ok){setCode("");}
  }catch{setMessage("Could not connect to the verification service.");setError(true);}
  finally{setBusy(false);}
 }
 return <section className="gcicVerifyCard" aria-labelledby="gcic-verify-heading">
  <span className="researchKicker">PRIVATE COMMUNITY VERIFICATION</span>
  <h2 id="gcic-verify-heading">Verify your membership before Telegram access.</h2>
  <p>Sign in with your confirmed checkout email. Enter the unique code sent only after NOWPayments verifies your annual membership payment. Your request will be reviewed before any private group invitation is issued.</p>
  {status==="approved"?
    <div className="gcicApprovedAccess"><p role="status" className="gcicVerified">Your payment and membership verification are approved.</p><a href="/api/inner-circle/invite" target="_blank" rel="noopener noreferrer" className="gcicInviteButton">Open your private Telegram invitation ↗</a><small>Keep the invitation private. The Gencouv group administrator must approve your Telegram join request.</small></div>:
    status==="pending_review"?
    <p role="status" className="gcicPending">Your verification is awaiting manual review. You will not be added automatically.</p>:
    <form onSubmit={submit}>
      <label htmlFor="gcicCode">Membership verification code</label>
      <input id="gcicCode" value={code} onChange={e=>setCode(e.target.value.toUpperCase())} autoComplete="off" maxLength={35} placeholder="GCIC-XXXXX-XXXXX-XXXXX-XXXXX" required/>
      <button type="submit" disabled={busy||!code.trim()}>{busy?"Verifying...":"Submit for manual verification"}</button>
    </form>
  }
  {message&&<p role="status" className={error?"gcicVerifyError":"gcicVerified"}>{message}</p>}
  <small>Payment order reference: {orderId}. Never share your code publicly. Group access is only granted after approval.</small>
 </section>;
}
