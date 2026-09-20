# Gencouv Trigger.dev Support Agent

This branch introduces the durable Trigger.dev chat-agent runtime without replacing the current production support path yet.

## Required environment

- `TRIGGER_PROJECT_REF`
- `TRIGGER_SECRET_KEY`
- `OPENAI_API_KEY`
- optional `OPENAI_SUPPORT_MODEL`

## Current status

- Trigger.dev v4.6.3 SDK dependency added.
- Vercel AI SDK dependencies added.
- `trigger.config.ts` added.
- Durable `gencouv-support-agent` created with `chat.agent()`.
- Production website still uses the native support API until Trigger.dev project credentials are connected and the chat transport is wired.

## Next integration step

After the Trigger.dev project is connected, wire the frontend with `useTriggerChatTransport`, mint scoped session tokens server-side, and pass only server-verified customer context into chat session clientData. Never trust a browser-supplied email for account/order lookup.
