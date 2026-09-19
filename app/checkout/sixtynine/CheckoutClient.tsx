"use client";
import { useState } from "react";

export default function CheckoutClient() {
  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  async function startCheckout() {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const response=await fetch("/api/payments/nowpayments/create",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({productId:"sixtynine-ea-mt5-v1-30",email}),
      });
      const data=await response.json();
      if(!response.ok||!data?.invoiceUrl) throw new Error(data?.error||"Unable to start checkout.");
      window.location.assign(data.invoiceUrl);
    } catch(err) {
      setError(err instanceof Error?err.message:"Unable to start checkout.");
      setLoading(false);
    }
  }

  return <div className="checkoutAction">
    <div className="guestBox"><label>Email address</label><input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/><p>Signed-in customers use their account email automatically. Guests use this email to claim the purchase after payment.</p></div>
    <button className="primary checkoutButton" type="button" onClick={startCheckout} disabled={loading}>{loading?"Opening secure checkout…":"Pay $2,000 with crypto"}</button>
    <p className="secureNote">Secure checkout powered by NOWPayments. Your payment is processed by NOWPayments, not stored by Gencouv.</p>
    {error?<p className="checkoutError" role="alert">{error}</p>:null}
    <style jsx>{`.checkoutAction{display:grid;gap:12px;margin-top:26px}.guestBox{padding:16px;border:1px solid rgba(255,255,255,.08)}.guestBox label{display:block;font-size:10px;color:#9eafab;margin-bottom:7px}.guestBox input{width:100%;box-sizing:border-box;padding:13px 14px;border:1px solid rgba(255,255,255,.12);background:#061011;color:#e5efed;outline:none}.guestBox input:focus{border-color:#35e4c0}.guestBox p{margin:8px 0 0;color:#748681;font-size:10px;line-height:1.5}.checkoutButton{width:100%;border:0;cursor:pointer;font-size:15px}.checkoutButton:disabled{opacity:.7;cursor:wait}.secureNote{margin:0;color:#82918f;font-size:12px;line-height:1.6}.checkoutError{margin:0;padding:12px 14px;border:1px solid rgba(255,100,100,.28);border-radius:12px;color:#ffb5b5;background:rgba(255,80,80,.06);font-size:13px}`}</style>
  </div>;
}
