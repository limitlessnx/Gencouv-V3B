"use server";

import { auth } from "@trigger.dev/sdk";
import { chat } from "@trigger.dev/sdk/ai";
import type { gencouvSupportAgent } from "@/trigger/gencouv-support-agent";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createPMHandoff } from "@/lib/pm-handoff";

const startSession =
  chat.createStartSessionAction<typeof gencouvSupportAgent>("gencouv-support-agent");

async function verifiedCustomerContext() {
  let userId: string | null = null;
  let email: string | null = null;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      userId = user.id;
      email = user.email?.toLowerCase() || null;
    }
  } catch {}

  if (!userId) {
    return {
      authenticated: false,
      userId: null,
      email: null,
      recentOrders: [],
      licenses: [],
    };
  }

  const admin = createAdminClient();
  const [{ data: orders }, { data: entitlements }] = await Promise.all([
    admin
      .from("marketplace_orders")
      .select("order_id,product_slug,license_tier,payment_status,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5),
    admin
      .from("marketplace_entitlements")
      .select("product_slug,license_tier,status,expires_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  return {
    authenticated: true,
    userId,
    email,
    recentOrders: orders || [],
    licenses: entitlements || [],
  };
}

export async function startGencouvSupportSession(args: {
  chatId: string;
}) {
  if (!process.env.TRIGGER_SECRET_KEY) {
    throw new Error("Gencouv Trigger.dev support is not configured.");
  }

  const clientData = await verifiedCustomerContext();

  return startSession({
    chatId: args.chatId,
    clientData,
    metadata: {
      source: "gencouv.com",
      authenticated: clientData.authenticated,
    },
  });
}

export async function mintGencouvSupportAccessToken(chatId: string) {
  if (!process.env.TRIGGER_SECRET_KEY) {
    throw new Error("Gencouv Trigger.dev support is not configured.");
  }

  return auth.createPublicToken({
    scopes: {
      read: { sessions: `${chatId}:out` },
      write: { sessions: chatId },
    },
    expirationTime: "1h",
  });
}


export async function createGencouvPMHandoff(chatId: string) {
  const context = await verifiedCustomerContext();

  const handoff = await createPMHandoff({
    userId: context.userId,
    customerEmail: context.email,
    context: {
      trigger_chat_id: chatId,
      authenticated: context.authenticated,
      recent_orders: context.recentOrders,
      licenses: context.licenses,
    },
  });

  return {
    token: handoff.token,
    telegramUrl: handoff.telegramUrl,
  };
}
