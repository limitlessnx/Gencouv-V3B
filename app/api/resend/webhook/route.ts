import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TRACKED_EVENTS = new Set([
  "email.sent",
  "email.delivered",
  "email.delivery_delayed",
  "email.bounced",
  "email.complained",
  "email.opened",
  "email.clicked",
  "email.failed",
  "email.suppressed",
  "email.received",
  "contact.created",
  "contact.updated",
  "contact.deleted",
]);

type ResendWebhook = {
  type?: string;
  created_at?: string;
  data?: Record<string, unknown>;
};

function verifySignature(payload: string, headers: Headers, secret: string) {
  const svixId = headers.get("svix-id");
  const timestamp = headers.get("svix-timestamp");
  const signatureHeader = headers.get("svix-signature");

  if (!svixId || !timestamp || !signatureHeader) return false;

  const timestampMs = Number(timestamp) * 1000;
  if (!Number.isFinite(timestampMs) || Math.abs(Date.now() - timestampMs) > 5 * 60 * 1000) {
    return false;
  }

  const normalizedSecret = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  let secretBytes: Buffer;
  try {
    secretBytes = Buffer.from(normalizedSecret, "base64");
  } catch {
    return false;
  }

  const signedContent = `${svixId}.${timestamp}.${payload}`;
  const expected = createHmac("sha256", secretBytes).update(signedContent).digest("base64");

  return signatureHeader.split(" ").some((part) => {
    const [, value] = part.split(",", 2);
    if (!value) return false;
    const a = Buffer.from(value);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  });
}

export async function POST(request: Request) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ success: false, error: "Webhook is not configured." }, { status: 500 });
  }

  const rawBody = await request.text();
  if (!verifySignature(rawBody, request.headers, secret)) {
    return NextResponse.json({ success: false, error: "Invalid webhook signature." }, { status: 401 });
  }

  let event: ResendWebhook;
  try {
    event = JSON.parse(rawBody) as ResendWebhook;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!event.type || !TRACKED_EVENTS.has(event.type)) {
    return NextResponse.json({ success: true, ignored: true });
  }

  const eventId = request.headers.get("svix-id");
  const record = {
    id: eventId,
    type: event.type,
    created_at: event.created_at ?? new Date().toISOString(),
    data: event.data ?? {},
  };

  // Forward the verified event to n8n for persistence, cohort attribution,
  // engagement scoring, and reporting. The n8n endpoint is intentionally
  // environment-configured so the webhook URL is never committed to Git.
  const n8nUrl = process.env.N8N_RESEND_WEBHOOK_URL;
  if (!n8nUrl) {
    return NextResponse.json(
      { success: false, error: "N8N_RESEND_WEBHOOK_URL is not configured." },
      { status: 500 },
    );
  }

  const response = await fetch(n8nUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.N8N_RESEND_WEBHOOK_SECRET
        ? { "x-gencouv-webhook-secret": process.env.N8N_RESEND_WEBHOOK_SECRET }
        : {}),
    },
    body: JSON.stringify(record),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { success: false, error: "Event persistence failed." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, event_id: eventId, event: event.type });
}
