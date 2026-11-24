import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const sender = "Gencouv Research <research@gencouv.com>";
const origin = "https://gencouv.com";
const genericResponse = "If this address is eligible, we have sent a confirmation link. Check your inbox.";
const allowedEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

function json(message: string, status = 200) {
  return NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export async function POST(request: NextRequest) {
  let input: Record<string, unknown>;
  try {
    if (Number(request.headers.get("content-length") || 0) > 4096) return json("Invalid request.", 400);
    input = await request.json();
    if (!input || typeof input !== "object" || Array.isArray(input)) return json("Invalid request.", 400);
  } catch { return json("Invalid request.", 400); }

  const action = input.action;
  if (action === "subscribe") {
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    if (!allowedEmail.test(email) || email.length > 254) return json("Enter a valid email address.", 400);
    if (input.consent !== true) return json("Please agree to receive the research newsletter.", 400);

    try {
      const db = createAdminClient();
      const { data: suppressed, error: suppressedError } = await db.from("gencouv_suppression_list").select("id").eq("normalized_email", email).limit(1);
      if (suppressedError) throw suppressedError;
      if (suppressed?.length) return json(genericResponse);

      const { data: current, error: lookupError } = await db.from("gencouv_research_subscribers")
        .select("email,status,last_confirmation_sent_at").eq("email", email).maybeSingle();
      if (lookupError) throw lookupError;
      if (current?.status === "active" || current?.status === "unsubscribed") return json(genericResponse);
      if (current?.last_confirmation_sent_at && Date.now() - new Date(current.last_confirmation_sent_at).getTime() < 10 * 60 * 1000) return json(genericResponse);

      const token = randomBytes(32).toString("hex");
      const now = new Date().toISOString();
      const payload = {
        email, status: "pending", consent_scope: "research_newsletter",
        consent_source: "investment_intelligence_page", consent_at: now,
        token_hash: hash(token), token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        last_confirmation_sent_at: now, updated_at: now
      };
      const { error: saveError } = await db.from("gencouv_research_subscribers").upsert(payload, { onConflict: "email" });
      if (saveError) throw saveError;

      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) throw new Error("Resend sender is not configured");
      const verifyUrl = `${origin}/investment-intelligence/confirm?token=${token}`;
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: sender, to: [email], subject: "Confirm your Gencouv Research subscription",
          text: `You requested the free Gencouv Investment Intelligence newsletter. To confirm your email, open this link and press Confirm subscription:\n\n${verifyUrl}\n\nThis link expires in 24 hours. If you didn't request this, ignore the message. You're not subscribed until you confirm.\n\nGencouv Capital | ${origin}/privacy`
        }),
        cache: "no-store"
      });
      if (!response.ok) {
        await db.from("gencouv_research_subscribers").update({ last_confirmation_sent_at: null }).eq("email", email).eq("token_hash", hash(token));
        throw new Error(`Resend delivery failure ${response.status}`);
      }
      return json(genericResponse);
    } catch (error) {
      console.error("Research newsletter subscription error", error instanceof Error ? error.message : "unknown");
      return json("Subscription temporarily unavailable. Please try again later.", 503);
    }
  }

  if (action === "confirm" || action === "unsubscribe") {
    const token = typeof input.token === "string" ? input.token : "";
    if (!/^[a-f0-9]{64}$/.test(token)) return json("Invalid or expired confirmation link.", 400);
    try {
      const db = createAdminClient();
      const tokenHash = hash(token);
      const { data: subscriber, error } = await db.from("gencouv_research_subscribers")
        .select("email,status,token_expires_at").eq("token_hash", tokenHash).maybeSingle();
      if (error) throw error;
      if (!subscriber) return json("Invalid or expired link.", 400);

      if (action === "confirm") {
        if (subscriber.status === "active") return json("Your research subscription is already confirmed.");
        if (subscriber.status === "unsubscribed") return json("This subscription was cancelled. Contact support for help.", 400);
        if (!subscriber.token_expires_at || new Date(subscriber.token_expires_at).getTime() < Date.now()) return json("This confirmation link has expired. Subscribe again to get a new link.", 400);
        const { data: suppressed, error: suppressError } = await db.from("gencouv_suppression_list").select("id").eq("normalized_email", subscriber.email).limit(1);
        if (suppressError) throw suppressError;
        if (suppressed?.length) return json("This address is not eligible for research emails.", 400);
        const { error: updateError } = await db.from("gencouv_research_subscribers")
          .update({ status: "active", verified_at: new Date().toISOString(), updated_at: new Date().toISOString() })
          .eq("email", subscriber.email).eq("token_hash", tokenHash).eq("status", "pending");
        if (updateError) throw updateError;
        return json("Your email is confirmed. You're now subscribed to Gencouv Research.");
      }

      const { error: updateError } = await db.from("gencouv_research_subscribers")
        .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .eq("email", subscriber.email).eq("token_hash", tokenHash);
      if (updateError) throw updateError;
      return json("You have been unsubscribed from Gencouv Research.");
    } catch (error) {
      console.error("Research newsletter action error", error instanceof Error ? error.message : "unknown");
      return json("Unable to process this request right now.", 503);
    }
  }
  return json("Unsupported request.", 400);
}
