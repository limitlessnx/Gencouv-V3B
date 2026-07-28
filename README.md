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

## Setup
1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Create a Supabase project and paste the project URL and anonymous key into `.env.local`.
5. Run `supabase/schema.sql` in the Supabase SQL editor.
6. In Supabase Authentication, add `http://localhost:3000/auth/callback` and your production callback URL.
7. Run `npm run dev`.

## Production notes
- Replace the fixed intake deadline and intake counts with real values or Supabase-admin controls.
- Confirm permission before publishing client names/profile photos. Blur them where necessary.
- Replace placeholder Privacy, Terms and Risk Disclosure links with reviewed legal documents.
- All performance claims should remain clearly labelled historical and supported by current evidence.
