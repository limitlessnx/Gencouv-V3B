import { NextResponse } from "next/server";

const RESEND_EVENTS_URL = "https://api.resend.com/events";
const DEFAULT_ONBOARDING_LINK = "https://t.me/Gencou_bot?start=email_welcome";

type ResendEventRequest = {
  email?: string;
  event?: "gencouv.lead.created" | "gencouv.support.requested" | "gencouv.onboarding.completed";
  interest?: string;
  source?: string;
  broker?: string;
  profile?: string;
  topic?: string;
  onboarding_link?: string;
};

function unauthorized() {
  return NextResponse.json(
    { success: false, error: "Unauthorized request." },
    { status: 401 },
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const eventSecret = process.env.GENCOUV_EMAIL_EVENT_SECRET;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "Resend is not configured." },
      { status: 500 },
    );
  }

  if (eventSecret) {
    const provided = request.headers.get("x-gencouv-event-secret");
    if (provided !== eventSecret) return unauthorized();
  }

  const body = (await request.json().catch(() => ({}))) as ResendEventRequest;
  const email = body.email?.trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { success: false, error: "A valid email address is required." },
      { status: 400 },
    );
  }

  const event = body.event || "gencouv.lead.created";
  const payload = {
    interest: body.interest || "copy_trading",
    source: body.source || "gencouv.com",
    broker: body.broker || "unknown",
    profile: body.profile || "undecided",
    topic: body.topic || body.interest || "gencouv_enquiry",
    onboarding_link: body.onboarding_link || DEFAULT_ONBOARDING_LINK,
  };

  const response = await fetch(RESEND_EVENTS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      event,
      payload,
    }),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(
      {
        success: false,
        error: "Resend event failed.",
        details: data,
      },
      { status: response.status },
    );
  }

  return NextResponse.json({ success: true, event, email });
}
