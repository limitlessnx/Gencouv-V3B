import "server-only";

import { createAdminClient } from "@/lib/supabase-admin";

export type PMHandoffInput = {
  conversationId?: string | null;
  userId?: string | null;
  customerEmail?: string | null;
  customerName?: string | null;
  context?: Record<string, unknown>;
};

function makeToken() {
  return `pm_${crypto.randomUUID().replace(/-/g, "").slice(0, 20)}`;
}

export function buildPMTelegramUrl(token: string) {
  const draft =
    `Hi, I want to continue my Gencouv Portfolio Management onboarding. Handoff code: ${token}`;
  return `https://t.me/gencouv?text=${encodeURIComponent(draft)}`;
}

export async function createPMHandoff(input: PMHandoffInput) {
  const admin = createAdminClient();
  const handoffToken = makeToken();

  const { data, error } = await admin
    .from("gencouv_pm_handoffs")
    .insert({
      handoff_token: handoffToken,
      conversation_id: input.conversationId || null,
      user_id: input.userId || null,
      customer_email: input.customerEmail || null,
      customer_name: input.customerName || null,
      source: "website_support",
      status: "created",
      context: input.context || {},
    })
    .select("id,handoff_token")
    .single();

  if (error || !data) {
    throw error || new Error("Could not create PM onboarding handoff.");
  }

  return {
    id: data.id as string,
    token: data.handoff_token as string,
    telegramUrl: buildPMTelegramUrl(data.handoff_token as string),
  };
}
