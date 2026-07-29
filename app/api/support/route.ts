import { NextResponse } from "next/server";

const TELEGRAM_URL = "https://t.me/Gencou_bot?start=website_support_handoff";

type SupportRequest = {
  message?: string;
  session_id?: string;
  sessionId?: string;
  name?: string;
  email?: string;
  phone?: string;
  page_url?: string;
  pageUrl?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as SupportRequest;
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json(
      {
        success: false,
        reply: "Please enter a message for Gencouv Support.",
      },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.N8N_GENCOUV_SUPPORT_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        success: true,
        reply:
          "Gencouv Support is being connected. For copy-trading eligibility, EA access, indicators, or account onboarding, continue with the Telegram onboarding agent.",
        intent: "general",
        lead_status: "human_review",
        handoff_to_telegram: true,
        telegram_url: TELEGRAM_URL,
      },
      { status: 200 },
    );
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        session_id: body.session_id || body.sessionId,
        name: body.name || "",
        email: body.email || "",
        phone: body.phone || "",
        page_url: body.page_url || body.pageUrl || "",
        source: "gencouv.com",
      }),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return NextResponse.json(
        {
          success: false,
          reply:
            "Gencouv Support is temporarily unavailable. You can continue directly with the Telegram onboarding agent.",
          handoff_to_telegram: true,
          telegram_url: TELEGRAM_URL,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      reply:
        data.reply ||
        "Gencouv Support can help with copy trading, EAs, indicators and onboarding questions.",
      intent: data.intent || "general",
      lead_status: data.lead_status || "support_only",
      handoff_to_telegram: Boolean(data.handoff_to_telegram),
      telegram_url: data.telegram_url || TELEGRAM_URL,
      upsell_product: data.upsell_product || "",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        reply:
          "Gencouv Support could not connect right now. You can continue directly with the Telegram onboarding agent.",
        handoff_to_telegram: true,
        telegram_url: TELEGRAM_URL,
      },
      { status: 502 },
    );
  }
}
