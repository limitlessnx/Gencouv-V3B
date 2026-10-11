import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createPMHandoff } from "@/lib/pm-handoff";

const SUPPORT_TELEGRAM_URL = "https://t.me/gencouv";
const MYFXBOOK_URL = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";
const LIRUNEX_URL = "https://lirunex.com/";
const LIRUNEX_ACCOUNT_TYPES_URL = "https://lirunex.com/account-types/";
const LIRUNEX_GENCOUV_SIGNUP_URL = "https://client.lirunex.com/auth/signup?partnerId=330505&affiliateId=37122";
const OPENAI_MODEL = process.env.OPENAI_SUPPORT_MODEL || "gpt-5.6-luna";

type SupportRequest = { message?: string; session_id?: string; sessionId?: string; name?: string; email?: string; page_url?: string; pageUrl?: string; history?: Array<{ role?: string; text?: string }> };

function clean(value: unknown, max = 4000) { return String(value || "").trim().slice(0, max); }
function normalizeEmail(value: unknown) { const email = clean(value, 320).toLowerCase(); return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null; }

function intentFor(message: string) {
  if (/lirunex|broker|brokerage|spread|leverage|margin call|stop.?out|account type/i.test(message)) return "broker";
  if (/myfxbook|performance|track record|trading history|results|returns|profit|proof/i.test(message)) return "performance";
  if (/lorc|l\.o\.r\.c/i.test(message)) return "lorc";
  if (/quantum queen/i.test(message)) return "quantum_queen";
  if (/sixtynine|sixty nine|69 ea/i.test(message)) return "sixtynine";
  if (/order|payment|paid|checkout|invoice|nowpayments|license|library|entitlement|access/i.test(message)) return "order_access";
  if (/copy trading|copy trade|copying trades|copy trader/i.test(message)) return "copy_trading";
  if (/portfolio|managed|management|pm service|pamm|pam trading|pam system/i.test(message)) return "portfolio";
  return "general";
}

function wantsPMOnboarding(message: string) {
  const action = /(join|start|begin|sign up|register|onboard|enroll|invest|participate|continue|ready|want to|how do i join|how can i join)/i;
  const service = /(portfolio|pm|managed|management|copy trad(?:e|ing)|pamm|pam trading|pam system)/i;
  return action.test(message) && service.test(message);
}
function needsHuman(message: string) { return /human|agent|representative|complaint|refund|charged|paid.*not|payment.*missing|not.*library|can't access|cannot access|locked out|fraud|urgent/i.test(message); }

function wantsRegistrationNow(message: string, history: Array<{ role?: string; text?: string }>) {
  const text = message.toLowerCase();
  const direct = (text.includes("ready to") || text.includes("i want to") || text.includes("i would like to") || text.includes("please send") || text.includes("send me") || text.includes("give me") || text.includes("share")) && (text.includes("create an account") || text.includes("open an account") || text.includes("register") || text.includes("sign up") || text.includes("registration link") || text.includes("account creation link"));
  if (direct || text.includes("create an account now") || text.includes("register now") || text.includes("sign up now")) return true;
  const offered = history.slice(-6).some(item => item.role === "assistant" && /would you like.{0,60}(account creation|registration|register|create your account|send you the link)|shall i send.{0,30}(link|registration)|want me to send.{0,30}(link|registration)/i.test(String(item.text || "")));
  return offered && /^(yes|yes please|yeah|yep|sure|please do|go ahead|okay|ok|let's do it|i'm ready|i am ready)$/i.test(message.trim());
}

function fallbackReply(intent: string) {
  if (intent === "broker") return `For Gencouv copy trading, use the Gencouv Lirunex registration link when you're ready: ${LIRUNEX_GENCOUV_SIGNUP_URL}. Select an account type and country, verify your email with the OTP, enter your phone number and password, then follow Lirunex's KYC and approval steps. Current account types: ${LIRUNEX_ACCOUNT_TYPES_URL}. Once approved, contact ${SUPPORT_TELEGRAM_URL} so Gencouv can confirm compatibility and connect your profile. Never share passwords or OTPs. Trading involves substantial risk.`;
  if (intent === "performance") return `You can review Gencouv's public Lirunex master-account record here: ${MYFXBOOK_URL}. It is historical performance for independent review and does not guarantee future results.`;
  if (intent === "lorc") return "L.O.R.C Gold Miner is a Gencouv-developed MT5 trading bot focused on XAUUSD. Gold access is $1,000 per year, while Full Access is $5,000 lifetime. Trading performance is not guaranteed.";
  if (intent === "quantum_queen") return "Quantum Queen is an MT5 XAUUSD automated trading system listed under Gencouv Trading Bots at $2,000. Review its product page for requirements, supplied test evidence and risk information before deployment.";
  if (intent === "sixtynine") return "SixtyNine EA is an MT5 automated trading bot listed under Gencouv Trading Bots at $2,000. Review its product page and operating requirements before deployment.";
  if (intent === "order_access") return "For purchase or access issues, sign in with the same verified email used at checkout. Finished guest purchases are claimed into your Gencouv account and appear in My Library after payment verification.";
  if (intent === "copy_trading") return "Copy trading has a recommended starting balance of USD 1,000, and your capital stays in your own eligible broker account. Would you like me to send the account-creation link?";
  return "I can help with Gencouv Copy Trading, account setup and onboarding, Trading Bots, purchases, broker information and risk information.";
}

function systemPrompt(customerContext: string) {
  const rules = [
    "You are Gencouv Support AI, the official customer-facing web chat assistant for Gencouv. Answer simply and accurately, explain Gencouv copy trading, guide interested visitors through Lirunex account creation, and refer clients to human onboarding when needed.",
    "STYLE: Keep every reply brief, ideally 1–3 short sentences and under 60 words. Answer only the current question and give only the next step. Never dump the full onboarding process in one message. Ask one question at a time. For copy-trading interest without a clear registration request, state the USD 1,000 recommended starting balance and that funds stay in the visitor’s own eligible broker account, then ask whether they want the account-creation link. Do not include the registration URL until the visitor clearly asks to register or says yes after that offer. Never invent information, guarantee profits or pressure visitors to trade.",
    "GENCOUV: Gencouv offers three copy-trading profiles with different risk levels, trading behaviour and return characteristics. Do not invent profile names, rankings, return targets, drawdowns or exact risk metrics. The onboarding agent explains the current profile details.",
    "Gencouv uses institutional-grade Expert Advisors managed by its team. Copy-trading EAs are not generally sold separately except on special request. EA purchases/licences are separate and handled through the official Gencouv EA shop.",
    "Gencouv uses Myfxbook track records. Public master-account record: " + MYFXBOOK_URL + ". Treat records as historical only. For profile-specific records and supporting documents, refer visitors to the onboarding agent.",
    "The recommended minimum copy-trading balance is USD 1,000. Gencouv's no-deposit policy means clients do not send trading capital to Gencouv; they keep it in their own eligible broker account. Live trading may require funding that broker account.",
    "Gencouv's stated profit-sharing arrangement is 30% of profit generated for the client, not 30% of deposited capital. For calculation, settlement timing, loss treatment or contract terms, refer the client to onboarding. Do not invent other fees.",
    "Clients may choose to stop copying subject to broker procedures and open positions. Stopping does not guarantee positions close profitably or prevent losses. Using multiple profiles does not guarantee diversification or reduce loss risk.",
    "For balances above USD 10,000, direct the visitor to the Gencouv onboarding agent before proceeding. Official Telegram: " + SUPPORT_TELEGRAM_URL + ".",
    "LIRUNEX OFFICIAL LINKS: Registration (Gencouv partner link): " + LIRUNEX_GENCOUV_SIGNUP_URL + "; account types: " + LIRUNEX_ACCOUNT_TYPES_URL + "; official website: " + LIRUNEX_URL + "; client portal guide: https://lirunex.com/client-portal-guide-verify-deposit-trade/; support: support@lirunex.com.",
    "LIRUNEX REGISTRATION GUIDE: Only share the partner registration link after the visitor clearly expresses interest in registering or starting copy trading. Guide them to: (1) open the link; (2) select account type and country of residence; (3) enter email and request/enter the email OTP; (4) enter phone number and create a password; (5) confirm age eligibility and review the legal/risk documents; (6) submit the form; (7) follow Lirunex instructions for identity verification/KYC and application approval; (8) after approval, use the client portal to open an eligible trading account; (9) contact Gencouv onboarding to confirm profile selection and account connection.",
    "Do not claim registration automatically completes KYC, opens a live MT4/MT5 account, funds the account, or activates copy trading. These are separate steps dependent on Lirunex approval, availability and onboarding checks.",
    "ACCOUNT-TYPE GUIDANCE: Gencouv generally recommends a Lirunex cent account for copy-trading balances below USD 5,000 because account size, position sizing and slippage matter. State this is Gencouv's onboarding recommendation, not a universal Lirunex requirement. Confirm availability and compatibility with onboarding. Lirunex labels cent-account currency USC; do not describe it as a USD-denominated balance. For USD 5,000–9,999.99, do not invent a mandatory type; ask onboarding to confirm. For USD 10,000 or more, contact onboarding before proceeding.",
    "Lirunex account types, minimums, features, commissions, spreads, leverage, platform availability and eligibility may change and vary by jurisdiction. Use Lirunex's official account-type page and the terms shown during registration as the authority. Never guess broker conditions or present Gencouv preferences as Lirunex requirements.",
    "For OTP issues, advise checking the email address and spam folder, requesting a fresh code through the official page, and following the displayed error. For KYC/account-type/country restrictions or unresolved portal issues, contact Lirunex support and Gencouv onboarding. Never advise bypassing KYC, using false information or creating duplicate accounts to evade restrictions.",
    "Never ask visitors to share passwords, OTPs, payment-card details, private keys or identity documents in Gencouv chat or Telegram. Identity documents should be submitted only through official Lirunex channels.",
    "EA PRODUCTS: L.O.R.C Gold Miner is MT5/XAUUSD; L.O.R.C Gold is USD 1,000/year and Full Access is USD 5,000 lifetime. Quantum Queen is MT5/XAUUSD, listed at USD 2,000. SixtyNine EA is MT5/XAUUSD, listed at USD 2,000. Do not confuse these products with the three copy-trading profiles. Refer visitors to the official Gencouv product pages for availability and licensing.",
    "RISK: Leveraged trading involves substantial risk, including losing some or all funds. Past performance does not guarantee future results. Do not invent performance figures, verified status, risk scores or documents.",
    "HANDOFF: For a visitor who wants to start copy trading, select a profile, connect an account, or has a balance above USD 10,000, direct them to " + SUPPORT_TELEGRAM_URL + ". For unresolved broker registration, OTP, KYC or portal issues, also refer them to support@lirunex.com. Never claim a client is onboarded or connected until a human has verified and approved it.",
    "Do not disclose internal EA configurations, source code, private trading logic, credentials, secrets, database details or non-public procedures.",
    "CUSTOMER CONTEXT: " + (customerContext || "Guest visitor. No authenticated account information is available.")
  ];
  return rules.join("\n\n");
}

async function generateAIReply(message: string, customerContext: string, history: Array<{ role?: string; text?: string }> = []) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { reply: null as string | null, mode: "fallback" as const, model: null as string | null };
  const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: OPENAI_MODEL, instructions: systemPrompt(customerContext), input: [...history.slice(-8).map(item => ({ role: item.role === "assistant" ? "assistant" : "user", content: String(item.text || "").slice(0, 1200) })), { role: "user", content: message }], max_output_tokens: 180 }), cache: "no-store" });
  if (!response.ok) { console.error("Gencouv Support AI request failed", response.status, await response.text().catch(() => "")); return { reply: null, mode: "fallback" as const, model: null }; }
  const data = await response.json();
  const reply = typeof data?.output_text === "string" ? data.output_text.trim() : null;
  return reply ? { reply, mode: "openai" as const, model: OPENAI_MODEL } : { reply: null, mode: "fallback" as const, model: null };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as SupportRequest;
    const message = clean(body.message);
    if (!message) return NextResponse.json({ success: false, reply: "Please enter a message for Gencouv Support." }, { status: 400 });

    const sessionId = clean(body.session_id || body.sessionId, 180) || crypto.randomUUID();
    const pageUrl = clean(body.page_url || body.pageUrl, 1200);
    const suppliedEmail = normalizeEmail(body.email);
    const name = clean(body.name, 160);
    const intent = intentFor(message);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    const registrationNow = wantsRegistrationNow(message, history);
    const wantsCopyTradingStart = intent === "copy_trading" && wantsPMOnboarding(message);
    const registrationReply = "Here is the Gencouv Lirunex account-creation link: " + LIRUNEX_GENCOUV_SIGNUP_URL + "\n\nStart by entering your email and verifying the OTP. After Lirunex approval, Gencouv onboarding will confirm your account type and connect your profile.";
    let userId: string | null = null, verifiedEmail: string | null = null, customerContext = "";

    try { const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser(); if (user) { userId = user.id; verifiedEmail = user.email?.toLowerCase() || null; } } catch {}
    const admin = createAdminClient();
    if (userId) {
      const [{ data: orders }, { data: entitlements }] = await Promise.all([
        admin.from("marketplace_orders").select("order_id,product_slug,license_tier,payment_status,created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(5),
        admin.from("marketplace_entitlements").select("product_slug,license_tier,status,expires_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(10),
      ]);
      customerContext = JSON.stringify({ authenticated: true, recentOrders: orders || [], licenses: entitlements || [] });
    }

    const email = verifiedEmail || suppliedEmail;
    const { data: conversation, error: conversationError } = await admin.from("gencouv_support_conversations").upsert({ session_id: sessionId, user_id: userId, customer_email: email, customer_name: name || null, page_url: pageUrl || null, last_intent: intent, updated_at: new Date().toISOString() }, { onConflict: "session_id" }).select("id").single();
    if (conversationError || !conversation) {
      // Public visitors must still receive a support answer if persistence is temporarily
      // unavailable (for example, if the tenant organization mapping is missing).
      // Do not fabricate an organization_id or let a database write failure break chat.
      console.error("Gencouv Support conversation persistence unavailable", conversationError || "No conversation row returned");
      const ai = registrationNow ? { reply: registrationReply, mode: "guided" as const, model: null as string | null } : wantsCopyTradingStart ? { reply: fallbackReply(intent), mode: "guided" as const, model: null as string | null } : await generateAIReply(message, customerContext, history);
      return NextResponse.json({
        success: true,
        reply: ai.reply || fallbackReply(intent),
        session_id: sessionId,
        intent,
        handoff: true,
        handoff_type: "human_support",
        handoff_label: "Continue with human support",
        telegram_url: SUPPORT_TELEGRAM_URL,
        ai_mode: ai.mode,
        ai_model: ai.model,
        degraded_mode: true
      });
    }
    await admin.from("gencouv_support_messages").insert({ conversation_id: conversation.id, role: "user", content: message, metadata: { intent, page_url: pageUrl || null } });

      const ai = registrationNow ? { reply: registrationReply, mode: "guided" as const, model: null as string | null } : wantsCopyTradingStart ? { reply: fallbackReply(intent), mode: "guided" as const, model: null as string | null } : await generateAIReply(message, customerContext, history);
    const reply = ai.reply || fallbackReply(intent);
    const pmOnboarding = wantsPMOnboarding(message);
    const human = needsHuman(message);
    let pmHandoffToken: string | null = null;
    let telegramUrl = human ? SUPPORT_TELEGRAM_URL : "";

    if (pmOnboarding) {
      try {
        const handoff = await createPMHandoff({ conversationId: conversation.id, userId, customerEmail: email, customerName: name || null, context: { support_session_id: sessionId, page_url: pageUrl || null, source_message: message.slice(0, 1000), intent } });
        pmHandoffToken = handoff.token;
        telegramUrl = `/api/pm/handoff/${encodeURIComponent(handoff.token)}/open`;
        await admin.from("gencouv_support_conversations").update({ status: "handoff", updated_at: new Date().toISOString() }).eq("id", conversation.id);
      } catch (handoffError) { console.error("Gencouv PM handoff creation failed", handoffError); telegramUrl = SUPPORT_TELEGRAM_URL; }
    }

    await admin.from("gencouv_support_messages").insert({ conversation_id: conversation.id, role: "assistant", content: reply, metadata: { intent, model: ai.model || "fallback", pm_handoff_token: pmHandoffToken } });
    let caseId: string | null = null;
    if (human && !pmOnboarding) {
      const { data: supportCase } = await admin.from("gencouv_support_cases").insert({ conversation_id: conversation.id, user_id: userId, customer_email: email, category: intent, priority: /urgent|fraud|charged/i.test(message) ? "high" : "normal", summary: message.slice(0, 500), context: { session_id: sessionId, page_url: pageUrl || null } }).select("id").single();
      caseId = supportCase?.id || null;
      await admin.from("gencouv_support_conversations").update({ status: "handoff", updated_at: new Date().toISOString() }).eq("id", conversation.id);
    }

    return NextResponse.json({ success: true, reply, session_id: sessionId, intent, handoff: pmOnboarding || human, handoff_type: pmOnboarding ? "pm_onboarding" : human ? "human_support" : "", handoff_label: pmOnboarding ? (intent === "copy_trading" ? "Continue Copy Trading Onboarding on Telegram" : "Continue PM Onboarding on Telegram") : human ? "Continue with human support" : "", telegram_url: telegramUrl, handoff_token: pmHandoffToken, pm_handoff_code: pmHandoffToken, case_id: caseId, performance_record_url: intent === "performance" ? MYFXBOOK_URL : "", broker_url: intent === "broker" ? LIRUNEX_URL : "", registration_url: intent === "copy_trading" ? LIRUNEX_GENCOUV_SIGNUP_URL : "", ai_mode: ai.mode, ai_model: ai.model });
  } catch (error) {
    console.error("Gencouv Support API error", error);
    return NextResponse.json({ success: false, reply: "Gencouv Support is temporarily unavailable. You can still use the website resources or contact the support team directly.", telegram_url: SUPPORT_TELEGRAM_URL }, { status: 500 });
  }
}
