"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResearchConfirmAction() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [state, setState] = useState<{ message: string; error: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(action: "confirm" | "unsubscribe") {
    if (!token || busy) return;
    setBusy(true);
    try {
      const response = await fetch("/api/research-newsletter", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, token })
      });
      const data = await response.json();
      setState({ message: data.message, error: !response.ok });
    } catch {
      setState({ message: "Could not connect. Please retry.", error: true });
    } finally { setBusy(false); }
  }
  return <section className="shell researchHero" style={{minHeight:"65vh"}}>
    <div className="researchEyebrow">GENCOUV RESEARCH</div>
    <h1>Confirm your <em>subscription.</em></h1>
    <p>Confirm that you requested the free newsletter. We won't send research emails until you confirm.</p>
    {token ? <div className="researchActions">
      <button disabled={busy} className="researchPrimary" onClick={() => submit("confirm")}>{busy ? "Processing..." : "Confirm my email"}</button>
      <button disabled={busy} className="researchSecondary" onClick={() => submit("unsubscribe")}>Unsubscribe instead</button>
    </div> : <p className="researchFormError">Missing confirmation token.</p>}
    {state && <p className={state.error ? "researchFormError" : "researchFormSuccess"} role="status">{state.message}</p>}
    <p style={{marginTop:"24px"}}><a href="/investment-intelligence">Return to Investment Intelligence ↗</a></p>
  </section>;
}
