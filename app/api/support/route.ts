import { NextResponse } from "next/server";

const TELEGRAM_URL = "https://t.me/Gencou_bot?start=website_support_handoff";
const MYFXBOOK_URL = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";

const PERFORMANCE_CONTEXT = `
Gencouv verified performance record:
- Public Myfxbook record: ${MYFXBOOK_URL}
- This is Gencouv's master-account record for the Lirunex strategy.
- When a client asks for a performance record, trading history, results, track record, or proof of performance, provide the Myfxbook link and explain that it is the live/public record they can inspect themselves.
- Use the live Myfxbook page for current figures. Do not invent, estimate, or guarantee returns.
- Historical performance is not a promise of future results. Individual client results can differ because of account size, execution, fees, risk settings, drawdown, and other account-specific factors.
- Do not imply that every client received exactly the master-account return unless that is specifically verified.
- A suitable response can say: "Yes. You can review Gencouv's master-account trading record on Myfxbook here: ${MYFXBOOK_URL}. It gives you a transparent view of the strategy's tracked performance and trading history. These are historical results, not guaranteed future returns, and individual client results may differ based on account and risk settings."
`;

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

function asksForPerformance(message: string) {
  return /myfxbook|performance|track record|trading record|trading history|results|returns|profit|gain|proof of performance|verified record/i.test(
    message,
  );
}

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

  const performanceIntent = asksForPerformance(message);
  const webhookUrl = process.env.N8N_GENCOUV_SUPPORT_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        success: true,
        reply: performanceIntent
          ? `Yes. You can review Gencouv's master-account trading record on Myfxbook here: ${MYFXBOOK_URL}. It gives you a transparent view of the strategy's tracked performance and trading history. These are historical results, not guaranteed future returns, and individual client results may differ based on account and risk settings.`
          : "Gencouv Support is being connected. For copy-trading eligibility, EA access, indicators, or account onboarding, continue with the Telegram onboarding agent.",
        intent: performanceIntent ? "performance_record" : "general",
        lead_status: "support_only",
        handoff_to_telegram: !performanceIntent,
        telegram_url: TELEGRAM_URL,
        performance_record_url: performanceIntent ? MYFXBOOK_URL : "",
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
        intent_hint: performanceIntent ? "performance_record" : "",
        performance_context: PERFORMANCE_CONTEXT,
        performance_record_url: MYFXBOOK_URL,
      }),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return NextResponse.json(
        {
          success: false,
          reply: performanceIntent
            ? `You can review Gencouv's master-account trading record on Myfxbook here: ${MYFXBOOK_URL}. The record is historical and does not guarantee future results.`
            : "Gencouv Support is temporarily unavailable. You can continue directly with the Telegram onboarding agent.",
          handoff_to_telegram: !performanceIntent,
          telegram_url: TELEGRAM_URL,
          performance_record_url: performanceIntent ? MYFXBOOK_URL : "",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      reply:
        data.reply ||
        (performanceIntent
          ? `You can review Gencouv's master-account trading record on Myfxbook here: ${MYFXBOOK_URL}. These are historical results, not a guarantee of future performance.`
          : "Gencouv Support can help with copy trading, EAs, indicators and onboarding questions."),
      intent: data.intent || (performanceIntent ? "performance_record" : "general"),
      lead_status: data.lead_status || "support_only",
      handoff_to_telegram: Boolean(data.handoff_to_telegram),
      telegram_url: data.telegram_url || TELEGRAM_URL,
      upsell_product: data.upsell_product || "",
      performance_record_url: data.performance_record_url || (performanceIntent ? MYFXBOOK_URL : ""),
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        reply: performanceIntent
          ? `You can review Gencouv's master-account trading record on Myfxbook here: ${MYFXBOOK_URL}. These are historical results, not a guarantee of future performance.`
          : "Gencouv Support could not connect right now. You can continue directly with the Telegram onboarding agent.",
        handoff_to_telegram: !performanceIntent,
        telegram_url: TELEGRAM_URL,
        performance_record_url: performanceIntent ? MYFXBOOK_URL : "",
      },
      { status: 502 },
    );
  }
}
