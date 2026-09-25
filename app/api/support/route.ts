import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createPMHandoff } from "@/lib/pm-handoff";

const SUPPORT_TELEGRAM_URL = "https://t.me/gencouv";
const MYFXBOOK_URL = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";
const LIRUNEX_URL = "https://lirunex.com/";
const LIRUNEX_ACCOUNT_TYPES_URL = "https://lirunex.com/account-types/";
const LIRUNEX_GENCOUV_SIGNUP_URL = "https://client.lirunex.com/auth/signup?partnerId=330505&affiliateId=37122";
const GENCOUV_COPY_MINIMUM_USD = 1000;
const GENCOUV_STANDARD_THRESHOLD_USD = 10000;
const OPENAI_MODEL = process.env.OPENAI_SUPPORT_MODEL || "gpt-5.6-luna";

type SupportRequest = { message?: string; session_id?: string; sessionId?: string; name?: string; email?: string; page_url?: string; pageUrl?: string };

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
  if (/portfolio|managed|management|pm service/i.test(message)) return "portfolio";
  return "general";
}

function wantsOnboardingHandoff(message: string, intent: string) {
  if (intent === "portfolio") return /(join|start|begin|onboard|invest|participate|continue|ready|want to|how do i join|how can i join)/i.test(message);
  if (intent !== "copy_trading") return false;
  const funded = /(funded|deposited|deposit(?:ed)?\s+\$?\d|money is in|funding complete|account.*funded)/i.test(message);
  const readyForConnection = /(connect.*master|master account|ready.*connect|finish onboarding|complete onboarding)/i.test(message);
  return funded || readyForConnection;
}
function needsHuman(message: string) { return /human|agent|representative|complaint|refund|charged|paid.*not|payment.*missing|not.*library|can't access|cannot access|locked out|fraud|urgent/i.test(message); }

function fallbackReply(intent: string) {
  if (intent === "broker") return `Gencouv uses Lirunex as a supported broker. For current account types, spreads, leverage, commissions, eligibility and terms, use Lirunex's official information at ${LIRUNEX_ACCOUNT_TYPES_URL}. Broker conditions can change and may vary by jurisdiction. Trading leveraged products involves substantial risk.`;
  if (intent === "performance") return `You can review Gencouv's public Lirunex master-account record here: ${MYFXBOOK_URL}. It is historical performance for independent review and does not guarantee future results.`;
  if (intent === "lorc") return "L.O.R.C Gold Miner is a Gencouv-developed MT5 trading bot focused on XAUUSD. Gold access is $1,000 per year, while Full Access is $5,000 lifetime. Trading performance is not guaranteed.";
  if (intent === "quantum_queen") return "Quantum Queen is an MT5 XAUUSD automated trading system listed under Gencouv Trading Bots at $2,000. Review its product page for requirements, supplied test evidence and risk information before deployment.";
  if (intent === "sixtynine") return "SixtyNine EA is an MT5 automated trading bot listed under Gencouv Trading Bots at $2,000. Review its product page and operating requirements before deployment.";
  if (intent === "order_access") return "For purchase or access issues, sign in with the same verified email used at checkout. Finished guest purchases are claimed into your Gencouv account and appear in My Library after payment verification.";
  if (intent === "copy_trading") return `Gencouv Copy Trading starts from ${GENCOUV_COPY_MINIMUM_USD}. Clients keep their trading capital in their own Lirunex account. To get started, register using Gencouv\'s Lirunex link: ${LIRUNEX_GENCOUV_SIGNUP_URL}. Complete Lirunex verification and fund the account. Under Gencouv\'s onboarding policy, deposits below ${GENCOUV_STANDARD_THRESHOLD_USD} use an MT5 Standard Cent account, while deposits of ${GENCOUV_STANDARD_THRESHOLD_USD} or more use an MT5 Standard account. Once verified and funded, continue with the Gencouv Telegram onboarding agent at ${SUPPORT_TELEGRAM_URL} for final checks and connection to the Gencouv master account. Copy trading involves substantial risk and past performance does not guarantee future results.`;
  if (intent === "portfolio") return `Gencouv Portfolio Management is a separate Gencouv service. Clients keep funds in their own supported brokerage account and participation is subject to eligibility and human onboarding approval. If you are ready to proceed, continue with the Gencouv Telegram onboarding agent at ${SUPPORT_TELEGRAM_URL}. Historical master-account performance is available at ${MYFXBOOK_URL} and does not guarantee future results.`;
  return "I can help with Gencouv Copy Trading and Portfolio Management, including how the services work, Lirunex account setup, verification and funding guidance, onboarding steps, performance information and trading-risk information.";
}

function systemPrompt(customerContext: string) {
  return `You are Gencouv Support AI, the customer support assistant for Gencouv.

Be concise, calm, factual and useful. Never guarantee profits, returns, recovery, approval or future trading performance. Never describe historical or backtest results as expected future results.

GENCOUV:
- Gencouv provides Portfolio Management/PAM/PAMM/copy-trading services and separate Trading Bots.
- Gencouv does not accept or hold Portfolio Management client deposits. Eligible clients maintain their own supported brokerage account.
- Participation is subject to eligibility and human onboarding approval.
- Never tell a Portfolio Management, PAM, PAMM or copy-trading lead they are successfully onboarded until a human has verified and approved them.
- If deposit details are awaiting verification, use exactly: "Thank you for submitting your deposit details. Your account is currently under review by our team. A Gencouv representative will verify your submission and confirm the next steps once the review process is complete."

BROKER / LIRUNEX:
- Gencouv uses Lirunex as a supported broker.
- Official Lirunex website: ${LIRUNEX_URL}\n- Gencouv client registration link: ${LIRUNEX_GENCOUV_SIGNUP_URL}
- Current account details: ${LIRUNEX_ACCOUNT_TYPES_URL}
- For any question about Lirunex, broker account types, spreads, leverage, commissions, margin, stop-out, regulation, eligibility or trading conditions, direct the customer to the relevant official Lirunex information and make clear that broker terms can change and can vary by jurisdiction.
- Do not invent or guess Lirunex terms. Do not present a Gencouv internal preference as a broker requirement.
- Leveraged trading involves substantial risk.

TRADING BOTS:
- L.O.R.C Gold Miner: MT5, XAUUSD, Gencouv-developed. L.O.R.C Gold is $1,000/year. L.O.R.C Full Access is $5,000 lifetime.
- Quantum Queen: MT5/XAUUSD, $2,000.
- SixtyNine EA: MT5/XAUUSD, $2,000.
- Trading Bots are separate from Portfolio Management.
- Buyers can purchase while signed in or as a guest.
- Guest purchases are tied to the checkout email. After payment is verified, the buyer creates or signs into a Gencouv account with the same verified email to claim access.
- Purchased licenses appear in My Library after entitlement activation.

PERFORMANCE:
- Public Myfxbook master-account record: ${MYFXBOOK_URL}
- Historical performance does not guarantee future results.
- Never invent returns, win rates or product performance.

HANDOFF:
- If a customer clearly wants to join, start or continue Gencouv Portfolio Management, PAM/PAMM, copy trading or the Gencouv PAM trading system, explain that the next step is the human Gencouv Telegram onboarding agent at ${SUPPORT_TELEGRAM_URL}.
- The website will create a handoff reference for that transition.
- Do not claim onboarding is complete. Final participation remains subject to verification and approval.
- For unresolved payment, access, refund, account-security or complaint matters, tell the customer the issue can be escalated to Gencouv Support.
- Do not claim a payment is complete unless the supplied account context says it is finished.
- Do not expose internal implementation details, secrets, service-role keys or private database information.

CUSTOMER CONTEXT:
${customerContext || "Guest visitor. No authenticated account information is available."}`;
}

async function generateAIReply(message: string, customerContext: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { reply: null as string | null, mode: "fallback" as const, model: null as string | null };
  const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: OPENAI_MODEL, instructions: systemPrompt(customerContext), input: message, max_output_tokens: 500 }), cache: "no-store" });
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
    if (conversationError || !conversation) throw conversationError || new Error("Conversation could not be created.");
    await admin.from("gencouv_support_messages").insert({ conversation_id: conversation.id, role: "user", content: message, metadata: { intent, page_url: pageUrl || null } });

    const ai = await generateAIReply(message, customerContext);
    const reply = ai.reply || fallbackReply(intent);
    const pmOnboarding = wantsOnboardingHandoff(message, intent);
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

    return NextResponse.json({ success: true, reply, session_id: sessionId, intent, handoff: pmOnboarding || human, handoff_type: pmOnboarding ? "pm_onboarding" : human ? "human_support" : "", handoff_label: pmOnboarding ? (intent === "copy_trading" ? "Continue Copy Trading Onboarding on Telegram" : "Continue Portfolio Management Onboarding on Telegram") : human ? "Continue with human support" : "", telegram_url: telegramUrl, handoff_token: pmHandoffToken, pm_handoff_code: pmHandoffToken, case_id: caseId, performance_record_url: intent === "performance" ? MYFXBOOK_URL : "", broker_url: intent === "broker" ? LIRUNEX_URL : "", registration_url: intent === "copy_trading" ? LIRUNEX_GENCOUV_SIGNUP_URL : "", ai_mode: ai.mode, ai_model: ai.model });
  } catch (error) {
    console.error("Gencouv Support API error", error);
    return NextResponse.json({ success: false, reply: "Gencouv Support is temporarily unavailable. You can still use the website resources or contact the support team directly.", telegram_url: SUPPORT_TELEGRAM_URL }, { status: 500 });
  }
}GENCOUV SERVICES:\n- Customer-facing investment services are Gencouv Copy Trading and Gencouv Portfolio Management. Keep them distinct. Do not rename Copy Trading as Portfolio Management, PAM or PAMM.\n- Gencouv does not accept or hold Copy Trading or Portfolio Management client trading deposits. Clients maintain funds in their own supported brokerage account.\n\nGENCOUV COPY TRADING:\n- Explain Copy Trading clearly: after proper onboarding and connection, eligible trading activity from the selected/master strategy can be replicated to the client\'s own brokerage account according to the copy-trading setup.\n- Gencouv\'s minimum funding requirement for Copy Trading is $1,000. This is a Gencouv participation rule, NOT Lirunex\'s universal broker minimum.\n- Official Gencouv Lirunex registration link: ${LIRUNEX_GENCOUV_SIGNUP_URL}\n- New clients should use that link, complete Lirunex account/KYC verification, fund their own Lirunex account, then continue to the human Telegram onboarding agent for final onboarding and master-account connection.\n- Gencouv routing policy: $1,000-$9,999.99 uses an MT5 Standard Cent account; $10,000 or more uses an MT5 Standard account. This is Gencouv\'s onboarding policy, not a universal Lirunex requirement.\n- If merely interested or ready to start but not funded, give the registration link and guide registration, verification and funding. Do not send them to Telegram merely to obtain the registration link.\n- Once the client says the account is funded or asks for final/master-account connection, hand them to ${SUPPORT_TELEGRAM_URL}.\n- Human onboarding confirms broker verification, confirms deposit amount, asks necessary onboarding/eligibility questions, checks correct account routing, and only after all checks pass connects the eligible account to the Gencouv master account.\n- Never claim Copy Trading is active, connected, approved or onboarding is complete until human confirmation. Registration, broker verification and funding are not Gencouv activation.\n- Copy trading and leveraged trading involve substantial risk. Past performance does not guarantee future results.\n\nGENCOUV PORTFOLIO MANAGEMENT:\n- Treat Portfolio Management as separate from Copy Trading.\n- Participation is subject to eligibility and human onboarding approval. When a client clearly wants to proceed, hand them to ${SUPPORT_TELEGRAM_URL}.\n- Never claim Portfolio Management onboarding or approval is complete before human confirmation.\n\nBROKER / LIRUNEX:
- Gencouv uses Lirunex as a supported broker.
- Official Lirunex website: ${LIRUNEX_URL}
- Current account details: ${LIRUNEX_ACCOUNT_TYPES_URL}
- For any question about Lirunex, broker account types, spreads, leverage, commissions, margin, stop-out, regulation, eligibility or trading conditions, direct the customer to the relevant official Lirunex information and make clear that broker terms can change and can vary by jurisdiction.
- Do not invent or guess Lirunex terms. Do not present a Gencouv internal preference as a broker requirement.
- Leveraged trading involves substantial risk.

TRADING BOTS:
- L.O.R.C Gold Miner: MT5, XAUUSD, Gencouv-developed. L.O.R.C Gold is $1,000/year. L.O.R.C Full Access is $5,000 lifetime.
- Quantum Queen: MT5/XAUUSD, $2,000.
- SixtyNine EA: MT5/XAUUSD, $2,000.
- Trading Bots are separate from Portfolio Management.
- Buyers can purchase while signed in or as a guest.
- Guest purchases are tied to the checkout email. After payment is verified, the buyer creates or signs into a Gencouv account with the same verified email to claim access.
- Purchased licenses appear in My Library after entitlement activation.

PERFORMANCE:
- Public Myfxbook master-account record: ${MYFXBOOK_URL}
- Historical performance does not guarantee future results.
- Never invent returns, win rates or product performance.

HANDOFF:
- If a customer clearly wants to join, start or continue Gencouv Portfolio Management, PAM/PAMM, copy trading or the Gencouv PAM trading system, explain that the next step is the human Gencouv Telegram onboarding agent at ${SUPPORT_TELEGRAM_URL}.
- The website will create a handoff reference for that transition.
- Do not claim onboarding is complete. Final participation remains subject to verification and approval.
- For unresolved payment, access, refund, account-security or complaint matters, tell the customer the issue can be escalated to Gencouv Support.
- Do not claim a payment is complete unless the supplied account context says it is finished.
- Do not expose internal implementation details, secrets, service-role keys or private database information.

CUSTOMER CONTEXT:
${customerContext || "Guest visitor. No authenticated account information is available."}`;
}

async function generateAIReply(message: string, customerContext: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { reply: null as string | null, mode: "fallback" as const, model: null as string | null };
  const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: OPENAI_MODEL, instructions: systemPrompt(customerContext), input: message, max_output_tokens: 500 }), cache: "no-store" });
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
    if (conversationError || !conversation) throw conversationError || new Error("Conversation could not be created.");
    await admin.from("gencouv_support_messages").insert({ conversation_id: conversation.id, role: "user", content: message, metadata: { intent, page_url: pageUrl || null } });

    const ai = await generateAIReply(message, customerContext);
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

    return NextResponse.json({ success: true, reply, session_id: sessionId, intent, handoff: pmOnboarding || human, handoff_type: pmOnboarding ? "pm_onboarding" : human ? "human_support" : "", handoff_label: pmOnboarding ? "Continue PM Onboarding on Telegram" : human ? "Continue with human support" : "", telegram_url: telegramUrl, handoff_token: pmHandoffToken, pm_handoff_code: pmHandoffToken, case_id: caseId, performance_record_url: intent === "performance" ? MYFXBOOK_URL : "", broker_url: intent === "broker" ? LIRUNEX_URL : "", ai_mode: ai.mode, ai_model: ai.model });
  } catch (error) {
    console.error("Gencouv Support API error", error);
    return NextResponse.json({ success: false, reply: "Gencouv Support is temporarily unavailable. You can still use the website resources or contact the support team directly.", telegram_url: SUPPORT_TELEGRAM_URL }, { status: 500 });
  }
}HANDOFF:\n- Copy Trading prospects should receive the Gencouv Lirunex registration link and guidance first. Create the Telegram handoff after they indicate the account is funded or ready for final connection.\n- Portfolio Management clients who clearly want to proceed should receive the Telegram onboarding handoff.\n- Human onboarding URL: ${SUPPORT_TELEGRAM_URL}\n- Do not claim onboarding, approval or master-account connection is complete before human confirmation.\n- For unresolved payment, access, refund, account-security or complaint matters, escalate to Gencouv Support.\n- Do not expose internal implementation details, secrets, service-role keys or private database information.\n\nCUSTOMER CONTEXT:
${customerContext || "Guest visitor. No authenticated account information is available."}`;
}

async function generateAIReply(message: string, customerContext: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { reply: null as string | null, mode: "fallback" as const, model: null as string | null };
  const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: OPENAI_MODEL, instructions: systemPrompt(customerContext), input: message, max_output_tokens: 500 }), cache: "no-store" });
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
    if (conversationError || !conversation) throw conversationError || new Error("Conversation could not be created.");
    await admin.from("gencouv_support_messages").insert({ conversation_id: conversation.id, role: "user", content: message, metadata: { intent, page_url: pageUrl || null } });

    const ai = await generateAIReply(message, customerContext);
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

    return NextResponse.json({ success: true, reply, session_id: sessionId, intent, handoff: pmOnboarding || human, handoff_type: pmOnboarding ? "pm_onboarding" : human ? "human_support" : "", handoff_label: pmOnboarding ? "Continue PM Onboarding on Telegram" : human ? "Continue with human support" : "", telegram_url: telegramUrl, handoff_token: pmHandoffToken, pm_handoff_code: pmHandoffToken, case_id: caseId, performance_record_url: intent === "performance" ? MYFXBOOK_URL : "", broker_url: intent === "broker" ? LIRUNEX_URL : "", ai_mode: ai.mode, ai_model: ai.model });
  } catch (error) {
    console.error("Gencouv Support API error", error);
    return NextResponse.json({ success: false, reply: "Gencouv Support is temporarily unavailable. You can still use the website resources or contact the support team directly.", telegram_url: SUPPORT_TELEGRAM_URL }, { status: 500 });
  }
}GENCOUV SERVICES:\n- Customer-facing investment services are Gencouv Copy Trading and Gencouv Portfolio Management. Keep them distinct. Do not rename Copy Trading as Portfolio Management, PAM or PAMM.\n- Gencouv does not accept or hold Copy Trading or Portfolio Management client trading deposits. Clients maintain funds in their own supported brokerage account.\n\nGENCOUV COPY TRADING:\n- Explain Copy Trading clearly: after proper onboarding and connection, eligible trading activity from the selected/master strategy can be replicated to the client\'s own brokerage account according to the copy-trading setup.\n- Gencouv\'s minimum funding requirement for Copy Trading is $1,000. This is a Gencouv participation rule, NOT Lirunex\'s universal broker minimum.\n- Official Gencouv Lirunex registration link: ${LIRUNEX_GENCOUV_SIGNUP_URL}\n- New clients should use that link, complete Lirunex account/KYC verification, fund their own Lirunex account, then continue to the human Telegram onboarding agent for final onboarding and master-account connection.\n- Gencouv routing policy: $1,000-$9,999.99 uses an MT5 Standard Cent account; $10,000 or more uses an MT5 Standard account. This is Gencouv\'s onboarding policy, not a universal Lirunex requirement.\n- If merely interested or ready to start but not funded, give the registration link and guide registration, verification and funding. Do not send them to Telegram merely to obtain the registration link.\n- Once the client says the account is funded or asks for final/master-account connection, hand them to ${SUPPORT_TELEGRAM_URL}.\n- Human onboarding confirms broker verification, confirms deposit amount, asks necessary onboarding/eligibility questions, checks correct account routing, and only after all checks pass connects the eligible account to the Gencouv master account.\n- Never claim Copy Trading is active, connected, approved or onboarding is complete until human confirmation. Registration, broker verification and funding are not Gencouv activation.\n- Copy trading and leveraged trading involve substantial risk. Past performance does not guarantee future results.\n\nGENCOUV PORTFOLIO MANAGEMENT:\n- Treat Portfolio Management as separate from Copy Trading.\n- Participation is subject to eligibility and human onboarding approval. When a client clearly wants to proceed, hand them to ${SUPPORT_TELEGRAM_URL}.\n- Never claim Portfolio Management onboarding or approval is complete before human confirmation.\n\nBROKER / LIRUNEX:
- Gencouv uses Lirunex as a supported broker.
- Official Lirunex website: ${LIRUNEX_URL}
- Current account details: ${LIRUNEX_ACCOUNT_TYPES_URL}
- For any question about Lirunex, broker account types, spreads, leverage, commissions, margin, stop-out, regulation, eligibility or trading conditions, direct the customer to the relevant official Lirunex information and make clear that broker terms can change and can vary by jurisdiction.
- Do not invent or guess Lirunex terms. Do not present a Gencouv internal preference as a broker requirement.
- Leveraged trading involves substantial risk.

TRADING BOTS:
- L.O.R.C Gold Miner: MT5, XAUUSD, Gencouv-developed. L.O.R.C Gold is $1,000/year. L.O.R.C Full Access is $5,000 lifetime.
- Quantum Queen: MT5/XAUUSD, $2,000.
- SixtyNine EA: MT5/XAUUSD, $2,000.
- Trading Bots are separate from Portfolio Management.
- Buyers can purchase while signed in or as a guest.
- Guest purchases are tied to the checkout email. After payment is verified, the buyer creates or signs into a Gencouv account with the same verified email to claim access.
- Purchased licenses appear in My Library after entitlement activation.

PERFORMANCE:
- Public Myfxbook master-account record: ${MYFXBOOK_URL}
- Historical performance does not guarantee future results.
- Never invent returns, win rates or product performance.

HANDOFF:
- If a customer clearly wants to join, start or continue Gencouv Portfolio Management, PAM/PAMM, copy trading or the Gencouv PAM trading system, explain that the next step is the human Gencouv Telegram onboarding agent at ${SUPPORT_TELEGRAM_URL}.
- The website will create a handoff reference for that transition.
- Do not claim onboarding is complete. Final participation remains subject to verification and approval.
- For unresolved payment, access, refund, account-security or complaint matters, tell the customer the issue can be escalated to Gencouv Support.
- Do not claim a payment is complete unless the supplied account context says it is finished.
- Do not expose internal implementation details, secrets, service-role keys or private database information.

CUSTOMER CONTEXT:
${customerContext || "Guest visitor. No authenticated account information is available."}`;
}

async function generateAIReply(message: string, customerContext: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { reply: null as string | null, mode: "fallback" as const, model: null as string | null };
  const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: OPENAI_MODEL, instructions: systemPrompt(customerContext), input: message, max_output_tokens: 500 }), cache: "no-store" });
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
    if (conversationError || !conversation) throw conversationError || new Error("Conversation could not be created.");
    await admin.from("gencouv_support_messages").insert({ conversation_id: conversation.id, role: "user", content: message, metadata: { intent, page_url: pageUrl || null } });

    const ai = await generateAIReply(message, customerContext);
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

    return NextResponse.json({ success: true, reply, session_id: sessionId, intent, handoff: pmOnboarding || human, handoff_type: pmOnboarding ? "pm_onboarding" : human ? "human_support" : "", handoff_label: pmOnboarding ? "Continue PM Onboarding on Telegram" : human ? "Continue with human support" : "", telegram_url: telegramUrl, handoff_token: pmHandoffToken, pm_handoff_code: pmHandoffToken, case_id: caseId, performance_record_url: intent === "performance" ? MYFXBOOK_URL : "", broker_url: intent === "broker" ? LIRUNEX_URL : "", ai_mode: ai.mode, ai_model: ai.model });
  } catch (error) {
    console.error("Gencouv Support API error", error);
    return NextResponse.json({ success: false, reply: "Gencouv Support is temporarily unavailable. You can still use the website resources or contact the support team directly.", telegram_url: SUPPORT_TELEGRAM_URL }, { status: 500 });
  }
}
