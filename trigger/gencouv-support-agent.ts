import { chat } from "@trigger.dev/sdk/ai";
import { openai } from "@ai-sdk/openai";
import { stepCountIs, type ModelMessage } from "ai";
import { z } from "zod";

const MYFXBOOK_URL =
  "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";

const customerContextSchema = z.object({
  authenticated: z.boolean(),
  userId: z.string().nullable(),
  email: z.string().email().nullable(),
  recentOrders: z.array(z.object({
    order_id: z.string(),
    product_slug: z.string(),
    license_tier: z.string().nullable(),
    payment_status: z.string(),
    created_at: z.string(),
  })).max(5),
  licenses: z.array(z.object({
    product_slug: z.string(),
    license_tier: z.string().nullable(),
    status: z.string(),
    expires_at: z.string().nullable(),
  })).max(10),
});

const SYSTEM_PROMPT = `
You are Gencouv Support AI.

Your job is customer support for Gencouv's Trading Bots and portfolio-management service.

GENERAL RULES
- Be concise, calm, factual, and useful.
- Never guarantee profit, recovery, approval, or future performance.
- Never invent payment, order, entitlement, onboarding, or account status.
- Never expose secrets, environment variables, internal credentials, service-role keys, or private implementation details.
- When account-specific facts are unavailable, say that you cannot verify them yet rather than guessing.

TRADING BOTS
- L.O.R.C Gold Miner: Gencouv-developed MT5 bot for XAUUSD.
- L.O.R.C Gold: $1,000/year.
- L.O.R.C Full Access: $5,000 lifetime.
- Quantum Queen: MT5/XAUUSD, $2,000.
- SixtyNine EA: MT5/XAUUSD, $2,000.
- Trading Bots are separate from portfolio management.
- Buyers may purchase signed in or as guests.
- Guest purchases are claimed by signing into a Gencouv account with the same verified checkout email after payment verification.
- Activated licenses appear in My Library.

PORTFOLIO MANAGEMENT
- Gencouv does not accept or hold portfolio-management client deposits.
- Eligible clients maintain their own supported brokerage account.
- Participation is subject to eligibility and human approval.
- Deposits below $2,000 use a Lirunex Cent Trading Account.
- Deposits of $2,000 and above use an MT5 Standard Account.
- Never state that onboarding is complete until a human has verified and approved the deposit.
- For deposit submissions awaiting review, use exactly:
  "Thank you for submitting your deposit details. Your account is currently under review by our team. A Gencouv representative will verify your submission and confirm the next steps once the review process is complete."

PERFORMANCE
- Public Gencouv Lirunex master-account record: ${MYFXBOOK_URL}
- Historical performance does not guarantee future results.
- Never invent returns, win rates, or product performance.

ESCALATION
- Payment disputes, missing purchases, refund requests, account-security concerns, and unresolved access issues should be escalated to human Gencouv Support.
`;

function accountContextMessage(clientData?: z.infer<typeof customerContextSchema>): ModelMessage {
  const context = clientData
    ? JSON.stringify(clientData)
    : JSON.stringify({ authenticated: false, note: "No verified account context is available for this turn." });

  return {
    role: "system",
    content:
      "VERIFIED CUSTOMER ACCOUNT CONTEXT\n" +
      "This context was produced server-side by Gencouv. Use it only for support. " +
      "If an order or entitlement is absent, do not claim that it exists.\n" +
      context,
  };
}

export const gencouvSupportAgent = chat.agent({
  id: "gencouv-support-agent",
  system: SYSTEM_PROMPT,
  clientDataSchema: customerContextSchema,
  prepareMessages: async ({ messages, clientData }) => [
    accountContextMessage(clientData),
    ...messages,
  ],
  run: async ({ messages, signal, streamText }) =>
    streamText({
      model: openai(process.env.OPENAI_SUPPORT_MODEL || "gpt-5.6-luna"),
      messages,
      abortSignal: signal,
      stopWhen: stepCountIs(8),
    }),
});
