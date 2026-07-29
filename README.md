# Gencouv Website

Premium Next.js website for Gencouv copy trading, Expert Advisors and indicators.

## Included
- Cinematic responsive landing page
- Alpha and Core profile presentation
- Telegram deep links to `@Gencou_bot`
- Intake countdown and premium-access messaging
- Client reviews and performance evidence gallery
- Client login and account creation pages
- Backend dashboard interface
- Supabase authentication integration
- Supabase starter database schema and row-level security
- Website support chat that proxies to n8n

## Setup
1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Create a Supabase project and paste the project URL and anonymous key into `.env.local`.
5. Run `supabase/schema.sql` in the Supabase SQL editor.
6. Add `N8N_GENCOUV_SUPPORT_WEBHOOK_URL` when the n8n support workflow is published.
7. In Supabase Authentication, add `http://localhost:3000/auth/callback` and your production callback URL.
8. Run `npm run dev`.

## Website support chat

Set this Vercel environment variable after the n8n support workflow is published:

```text
N8N_GENCOUV_SUPPORT_WEBHOOK_URL=https://YOUR-N8N-DOMAIN/webhook/gencouv-support
```

The public website calls `/api/support`, and that server route forwards visitor messages to n8n. If the variable is missing or n8n is unavailable, the chat falls back to the Telegram onboarding agent.

## Production notes
- Replace the fixed intake deadline and intake counts with real values or Supabase-admin controls.
- Confirm permission before publishing client names/profile photos. Blur them where necessary.
- Replace placeholder Privacy, Terms and Risk Disclosure links with reviewed legal documents.
- All performance claims should remain clearly labelled historical and supported by current evidence.
