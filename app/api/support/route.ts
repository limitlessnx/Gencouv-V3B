import { NextResponse } from "next/server";

const TELEGRAM_URL = "https://t.me/Gencou_bot?start=website_support_handoff";
const MYFXBOOK_URL = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";

const PERFORMANCE_CONTEXT = `
Gencouv portfolio-management performance context:
- Public Myfxbook record: ${MYFXBOOK_URL}
- This is Gencouv's master-account record for the Lirunex managed strategy.
- When a client asks for performance, trading history, results, track record or proof of performance, provide the Myfxbook link and explain that it is a public historical record they can inspect themselves.
- Do not invent, estimate or guarantee returns.
- Historical performance is not a promise of future results. Individual client outcomes can differ because of account size, execution, fees, risk settings, deposits, withdrawals, drawdown and other account-specific factors.
- Gencouv does not accept or hold client deposits. Eligible clients maintain their own supported brokerage account.
- Portfolio-management participation is subject to eligibility and onboarding. Do not promise approval.
- Marketplace products such as Expert Advisors and indicators are separate from Gencouv's managed portfolio service.
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
  return /myfxbook|performance|track record|trading record|trading history|results|returns|profit|gain|proof of performance|verified record/i.test(message);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as SupportRequest;
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ success: false, reply: "Please enter a message for Gencouv Support." }, { status: 400 });
  }

  const performanceIntent = asksForPerformance(message);
  const webhookUrl = process.env.N8N_GENCOUV_SUPPORT_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({
      success: true,
      reply: performanceIntent
        ? `You can review Gencouv's Lirunex managed-strategy record on Myfxbook here: ${MYFXBOOK_URL}. It provides historical master-account performance and trading information for independent review. Historical results are not guaranteed future returns, and individual client outcomes may differ.`
        : "Gencouv Support can help with portfolio management, eligibility, the client-held brokerage structure, performance information, onboarding and separate marketplace products. Human onboarding is available when you are ready to proceed.",
      intent: performanceIntent ? "performance_record" : "general",
      lead_status: "support_only",
      handoff_to_telegram: false,
      telegram_url: TELEGRAM_URL,
      performance_record_url: performanceIntent ? MYFXBOOK_URL : "",
    }, { status: 200 });
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
        service_context: "portfolio_management",
      }),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return NextResponse.json({
        success: false,
        reply: performanceIntent
          ? `You can review Gencouv's managed-strategy record on Myfxbook here: ${MYFXBOOK_URL}. The record is historical and does not guarantee future results.`
          : "Gencouv Support is temporarily unavailable. Portfolio-management information remains available on the website, and onboarding can continue through the human onboarding channel when required.",
        handoff_to_telegram: false,
        telegram_url: TELEGRAM_URL,
        performance_record_url: performanceIntent ? MYFXBOOK_URL : "",
      }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      reply: data.reply || (performanceIntent
        ? `You can review Gencouv's managed-strategy record on Myfxbook here: ${MYFXBOOK_URL}. These are historical results, not a guarantee of future performance.`
        : "Gencouv Support can help with portfolio management, eligibility, onboarding, risk information and separate marketplace products."),
      intent: data.intent || (performanceIntent ? "performance_record" : "general"),
      lead_status: data.lead_status || "support_only",
      handoff_to_telegram: Boolean(data.handoff_to_telegram),
      telegram_url: data.telegram_url || TELEGRAM_URL,
      upsell_product: data.upsell_product || "",
      performance_record_url: data.performance_record_url || (performanceIntent ? MYFXBOOK_URL : ""),
    });
  } catch {
    return NextResponse.json({
      success: false,
      reply: performanceIntent
        ? `You can review Gencouv's managed-strategy record on Myfxbook here: ${MYFXBOOK_URL}. These are historical results, not a guarantee of future performance.`
        : "Gencouv Support could not connect right now. Please review the portfolio-management and risk pages while support reconnects.",
      handoff_to_telegram: false,
      telegram_url: TELEGRAM_URL,
      performance_record_url: performanceIntent ? MYFXBOOK_URL : "",
    }, { status: 502 });
  }
}
