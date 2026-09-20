import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createPMHandoff } from "@/lib/pm-handoff";

const SUPPORT_TELEGRAM_URL = "https://t.me/gencouv";
const PM_ONBOARDING_TELEGRAM_URL = "https://t.me/gencouv";
const MYFXBOOK_URL = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";
const OPENAI_MODEL = process.env.OPENAI_SUPPORT_MODEL || "gpt-5.6-luna";

type SupportRequest = {
  message?: string;
  session_id?: string;
  sessionId?: string;
  name?: string;
  email?: string;
  page_url?: string;
  pageUrl?: string;
};

function clean(value: unknown, max = 4000) {
  return String(value || "").trim().slice(0, max);
}

function normalizeEmail(value: unknown) {
  const email = clean(value, 320).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function intentFor(message: string) {
  if (/myfxbook|performance|track record|trading history|results|returns|profit|proof/i.test(message)) return "performance";
  if (/lorc|l\.o\.r\.c/i.test(message)) return "lorc";
  if (/quantum queen/i.test(message)) return "quantum_queen";
  if (/sixtynine|sixty nine|69 ea/i.test(message)) return "sixtynine";
  if (/order|payment|paid|checkout|invoice|nowpayments|license|library|entitlement|access/i.test(message)) return "order_access";
  if (/portfolio|managed|management|copy trading|pamm/i.test(message)) return "portfolio";
  return "general";
}

function wantsPMOnboarding(message: string) {
  return /(join|start|begin|sign up|register|onboard|enroll|invest|participate).*(portfolio|pm|managed|management|copy trading|pamm)|(portfolio|pm|managed|management|copy trading|pamm).*(join|start|begin|sign up|register|onboard|enroll|invest|participate)/i.test(message);
}

function needsHuman(message: string) {
  return /human|agent|representative|complaint|refund|charged|paid.*not|payment.*missing|not.*library|can't access|cannot access|locked out|fraud|urgent/i.test(message);
}

function fallbackReply(intent: string) {
  if (intent === "performance") return `You can review Gencouv's public Lirunex master-account record here: ${MYFXBOOK_URL}. It is historical performance for independent review and does not guarantee future results.`;
  if (intent === "lorc") return "L.O.R.C Gold Miner is a Gencouv-developed MT5 trading bot focused on XAUUSD. Gold access is $1,000 per year, while Full Access is $5,000 lifetime. Trading performance is not guaranteed.";
  if (intent === "quantum_queen") return "Quantum Queen is an MT5 XAUUSD automated trading system listed under Gencouv Trading Bots at $2,000. Review its product page for requirements, supplied test evidence and risk information before deployment.";
  if (intent === "sixtynine") return "SixtyNine EA is an MT5 automated trading bot listed under Gencouv Trading Bots at $2,000. Review its product page and operating requirements before deployment.";
  if (intent === "order_access") return "For purchase or access issues, sign in with the same verified email used at checkout. Finished guest purchases are claimed into your Gencouv account and appear in My Library after payment verification.";
  if (intent === "portfolio") return `Gencouv portfolio management is separate from Trading Bots. Clients keep funds in their own supported brokerage account, and participation is subject to eligibility and onboarding. Historical master-account performance is available at ${MYFXBOOK_URL}.`;
  return "I can help with Gencouv Trading Bots, product requirements, purchases, My Library access, portfolio management, onboarding and risk information.";
}

function systemPrompt(customerContext: string) {
  return `You are Gencouv Support AI, the customer support assistant for Gencouv.

Be concise, calm, factual and useful. Never guarantee profits, returns, recovery, approval or future trading performance. Never describe historical or backtest results as expected future results.

GENCOUV:
- Gencouv provides portfolio management and separate Trading Bots.
- Gencouv does not accept or hold portfolio-management client deposits. Eligible clients maintain their own supported brokerage account.
- Portfolio participation is subject to eligibility and human onboarding approval.
- Never tell a portfolio-management lead they are successfully onboarded until a human has verified and approved the deposit.
- Deposit below $2,000: Lirunex Cent Trading Account.
- Deposit $2,000 and above: MT5 Standard Account.
- If deposit details are awaiting verification, use: "Thank you for submitting your deposit details. Your account is currently under review by our team. A Gencouv representative will verify your submission and confirm the next steps once the review process is complete."

TRADING BOTS:
- L.O.R.C Gold Miner: MT5, XAUUSD, Gencouv-developed. L.O.R.C Gold is $1,000/year. L.O.R.C Full Access is $5,000 lifetime.
- Quantum Queen: MT5/XAUUSD, $2,000.
- SixtyNine EA: MT5/XAUUSD, $2,000.
- Trading Bots are separate from portfolio management.
- Buyers can purchase while signed in or as a guest.
- Guest purchases are tied to the checkout email. After payment is verified, the buyer creates or signs into a Gencouv account with the same verified email to claim access.
- Purchased licenses appear in My Library after entitlement activation.

PERFORMANCE:
- Public Myfxbook master-account record: ${MYFXBOOK_URL}
- Historical performance does not guarantee future results.
- Never invent returns, win rates or product performance.

SUPPORT:
- For unresolved payment, access, refund, account-security or complaint matters, tell the customer the issue can be escalated to Gencouv Support.
- If a customer clearly wants to join or begin the Portfolio Management service, tell them the next step is to continue with the Gencouv Telegram onboarding account at https://t.me/gencouv.
- Do not claim PM onboarding is complete. Final participation remains subject to verification and approval.
- Do not claim a payment is complete unless the supplied account context says it is finished.
- Do not expose internal implementation details, secrets, service-role keys or private database information.

CUSTOMER CONTEXT:
${customerContext || "Guest visitor. No authenticated account information is available."}`;
}

async function generateAIReply(message: string, customerContext: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions: systemPrompt(customerContext),
      input: message,
      max_output_tokens: 500,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    console.error("Gencouv Support AI request failed", response.status, await response.text().catch(() => ""));
    return null;
  }

  const data = await response.json();
  return typeof data?.output_text === "string" ? data.output_text.trim() : null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as SupportRequest;
    const message = clean(body.message);
    if (!message) {
      return NextResponse.json({ success:false, reply:"Please enter a message for Gencouv Support." }, { status:400 });
    }

    const sessionId = clean(body.session_id || body.sessionId, 180) || crypto.randomUUID();
    const pageUrl = clean(body.page_url || body.pageUrl, 1200);
    const suppliedEmail = normalizeEmail(body.email);
    const name = clean(body.name, 160);
    const intent = intentFor(message);

    let userId: string | null = null;
    let verifiedEmail: string | null = null;
    let customerContext = "";

    try {
      const supabase = await createClient();
      const { data:{ user } } = await supabase.auth.getUser();
      if (user) {
        userId = user.id;
        verifiedEmail = user.email?.toLowerCase() || null;
      }
    } catch {}

    const admin = createAdminClient();

    if (userId) {
      const [{ data:orders }, { data:entitlements }] = await Promise.all([
        admin.from("marketplace_orders")
          .select("order_id,product_slug,license_tier,payment_status,created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending:false })
          .limit(5),
        admin.from("marketplace_entitlements")
          .select("product_slug,license_tier,status,expires_at")
          .eq("user_id", userId)
          .order("created_at", { ascending:false })
          .limit(10),
      ]);

      customerContext = JSON.stringify({
        authenticated:true,
        recentOrders:orders || [],
        licenses:entitlements || [],
      });
    }

    const email = verifiedEmail || suppliedEmail;

    const { data:conversation, error:conversationError } = await admin
      .from("gencouv_support_conversations")
      .upsert({
        session_id:sessionId,
        user_id:userId,
        customer_email:email,
        customer_name:name || null,
        page_url:pageUrl || null,
        last_intent:intent,
        updated_at:new Date().toISOString(),
      }, { onConflict:"session_id" })
      .select("id")
      .single();

    if (conversationError || !conversation) throw conversationError || new Error("Conversation could not be created.");

    await admin.from("gencouv_support_messages").insert({
      conversation_id:conversation.id,
      role:"user",
      content:message,
      metadata:{ intent, page_url:pageUrl || null },
    });

    const reply = (await generateAIReply(message, customerContext)) || fallbackReply(intent);
    const pmOnboarding = wantsPMOnboarding(message);
    const human = needsHuman(message);

    let pmHandoff: { token:string; telegramUrl:string } | null = null;
    if (pmOnboarding) {
      try {
        pmHandoff = await createPMHandoff({
          conversationId:conversation.id,
          userId,
          customerEmail:email,
          customerName:name || null,
          context:{
            support_session_id:sessionId,
            latest_message:message.slice(0,1000),
            page_url:pageUrl || null,
            intent,
          },
        });
      } catch (error) {
        console.error("Could not create PM onboarding handoff", error);
      }
    }

    await admin.from("gencouv_support_messages").insert({
      conversation_id:conversation.id,
      role:"assistant",
      content:reply,
      metadata:{ intent, model:process.env.OPENAI_API_KEY ? OPENAI_MODEL : "fallback" },
    });

    let caseId: string | null = null;
    if (human) {
      const { data:supportCase } = await admin.from("gencouv_support_cases")
        .insert({
          conversation_id:conversation.id,
          user_id:userId,
          customer_email:email,
          category:intent,
          priority:/urgent|fraud|charged/i.test(message) ? "high" : "normal",
          summary:message.slice(0,500),
          context:{ session_id:sessionId, page_url:pageUrl || null },
        })
        .select("id")
        .single();

      caseId = supportCase?.id || null;
      await admin.from("gencouv_support_conversations")
        .update({ status:"handoff", updated_at:new Date().toISOString() })
        .eq("id", conversation.id);
    }

    return NextResponse.json({
      success:true,
      reply,
      session_id:sessionId,
      intent,
      handoff:human,
      case_id:caseId,
      telegram_url:pmOnboarding ? (pmHandoff?.telegramUrl || PM_ONBOARDING_TELEGRAM_URL) : (human ? SUPPORT_TELEGRAM_URL : ""),
      handoff_type:pmOnboarding ? "pm_onboarding" : (human ? "human_support" : ""),
      handoff_label:pmOnboarding ? "Continue PM Onboarding on Telegram" : (human ? "Continue with human support" : ""),
      handoff_token:pmHandoff?.token || "",
      performance_record_url:intent === "performance" ? MYFXBOOK_URL : "",
      ai_mode:process.env.OPENAI_API_KEY ? "openai" : "fallback",
    });
  } catch (error) {
    console.error("Gencouv Support API error", error);
    return NextResponse.json({
      success:false,
      reply:"Gencouv Support is temporarily unavailable. You can still use the website resources or contact the support team directly.",
      telegram_url:SUPPORT_TELEGRAM_URL,
    }, { status:500 });
  }
}
