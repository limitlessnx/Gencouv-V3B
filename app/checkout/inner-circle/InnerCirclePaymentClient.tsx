"use client";
import { useState } from "react";

export default function InnerCirclePaymentClient({enabled}:{enabled:boolean}){
 const [email,setEmail]=useState("");
 const [accepted,setAccepted]=useState(false);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState("");
 async function pay(){
  if(!enabled||!accepted||busy)return;
  setBusy(true);setError("");
  try{
   const res=await fetch("/api/payments/nowpayments/create",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({productId:"gencouv-inner-circle-annual",email})
   });
   const data=await res.json();
   if(!res.ok||!data?.invoiceUrl)throw new Error(data?.error||"Unable to create invoice");
   const url=new URL(data.invoiceUrl);
   if(url.protocol!=="https:")throw new Error("Invalid payment destination");
   window.location.assign(url.toString());
  }catch(e){setError(e instanceof Error?e.message:"Payment service temporarily unavailable");setBusy(false);}
 }
 return <div className="gcicPaymentForm">
   {enabled?<><label htmlFor="member-checkout-email">Checkout email</label>
     <input id="member-checkout-email" type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
     <label className="gcicConsent"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)}/><span>I have reviewed the annual membership terms and risk disclosures. I understand this is not a promise of returns or personalized advice, and leveraged CFDs can cause substantial losses.</span></label>
     <button type="button" disabled={!accepted||busy} onClick={pay}>{busy?"Opening secure checkout…":"Pay $1,000 annually with NOWPayments"} ↗</button>
     <small>One annual invoice. NOWPayments processes cryptocurrency payments. The renewal is not automatic. Access is granted only after verified payment.</small>
   </>:<>
     <div className="gcicPendingNotice"><strong>Annual enrollment is not yet active.</strong><p>The $1,000 NOWPayments checkout is configured but intentionally locked until regulatory review, member terms and promised delivery are approved.</p></div>
     <a className="gcicWaitlistLink" href="/investment-intelligence#newsletter">Join the free research list ↗</a>
     <small>No payment is collected and no membership access is issued at this stage.</small>
   </>}
   {error&&<p role="alert" className="gcicPaymentError">{error}</p>}
 </div>;
}
