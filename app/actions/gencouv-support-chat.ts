"use server";

import { auth } from "@trigger.dev/sdk";
import { chat } from "@trigger.dev/sdk/ai";

const startSession = chat.createStartSessionAction("gencouv-support-agent");

export async function startGencouvSupportSession(args: {
  chatId: string;
  clientData?: unknown;
}) {
  if (!process.env.TRIGGER_SECRET_KEY) {
    throw new Error("Gencouv Trigger.dev support is not configured.");
  }

  return startSession({
    chatId: args.chatId,
    clientData: args.clientData,
  });
}

export async function mintGencouvSupportAccessToken(chatId: string) {
  if (!process.env.TRIGGER_SECRET_KEY) {
    throw new Error("Gencouv Trigger.dev support is not configured.");
  }

  return auth.createPublicToken({
    scopes: {
      read: { sessions: chatId },
      write: { sessions: chatId },
    },
    expirationTime: "1h",
  });
}
