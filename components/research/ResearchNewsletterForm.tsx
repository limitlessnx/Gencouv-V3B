"use client";

import { useState, type FormEvent } from "react";

export default function ResearchNewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; error: boolean } | null>(null);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !consent) return;
    setBusy(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/research-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "subscribe", email, consent })
      });
      const result = await response.json();
      setFeedback({ message: result.message || "Unable to subscribe.", error: !response.ok });
      if (response.ok) { setEmail(""); setConsent(false); }
    } catch {
      setFeedback({ message: "Unable to connect. Please retry.", error: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="researchSignupForm" onSubmit={subscribe}>
      <label htmlFor="research-email">Email address</label>
      <input id="research-email" type="email" autoComplete="email" placeholder="you@example.com"
        value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} />
      <label className="researchConsent">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required />
        <span>I agree to receive the Gencouv Research newsletter about stocks, crypto, and market education. This does not subscribe me to copy-trading or EA promotions. I can unsubscribe anytime.</span>
      </label>
      <button className="researchPrimary" type="submit" disabled={busy || !consent}>
        {busy ? "Submitting..." : "Subscribe to research"} <span aria-hidden="true">↗</span>
      </button>
      {feedback && <p className={feedback.error ? "researchFormError" : "researchFormSuccess"} role="status">{feedback.message}</p>}
      <small>Confirm your email using the link we send before your subscription becomes active. Read our <a href="/privacy">Privacy Policy</a>.</small>
    </form>
  );
}
