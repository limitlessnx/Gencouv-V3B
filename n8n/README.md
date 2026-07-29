# Gencouv Website Support Agent

This workflow powers the Gencouv website support assistant and hands qualified prospects to the Telegram onboarding bot.

## What it does

- Answers Gencouv trading-support questions.
- Explains copy trading, Expert Advisors, indicators, broker-connected execution and account setup.
- Uses a $1,000 minimum trading-capital requirement for copy-trading qualification.
- Never promises profit or guaranteed returns.
- Recommends a suitable Gencouv EA or indicator only when relevant.
- Sends qualified prospects to `https://t.me/Gencou_bot`.
- Loads the support knowledge base from Google Drive.
- Saves qualified leads and support logs in Google Sheets.

## Required n8n credentials

- Google Drive OAuth2 credential named `gencouv`.
- Google Sheets OAuth2 credential named `gencouv`.
- An OpenAI credential selected in the `Gencouv Support Intelligence` node.

After importing, n8n may require the credentials to be reselected once because exported workflows reference internal credential IDs.

## Required Google Drive file

Create a Google Drive text, PDF or document containing the approved Gencouv knowledge base. Replace:

`REPLACE_WITH_GOOGLE_DRIVE_KNOWLEDGE_FILE_ID`

with that file's ID in the `Load Gencouv Knowledge Base` node.

Recommended knowledge sections:

- About Gencouv
- Copy trading process
- $1,000 minimum trading capital
- Supported brokers and account types
- Alpha and Core profiles
- EAs and indicators
- Pricing and payment rules
- Risk and drawdown explanations
- Existing-client support procedures
- Human escalation rules

## Required Google Sheet

Create one spreadsheet with two tabs named exactly:

### Leads

Use this header row:

`timestamp | session_id | source | name | email | phone | country | intent | lead_status | trading_experience | available_capital_usd | broker | risk_tolerance | preferred_product | main_question | telegram_handoff | page_url`

### Support Logs

Use this header row:

`timestamp | session_id | source | message | reply | intent | lead_status | upsell_product | handoff_to_telegram | page_url`

Replace every occurrence of:

`REPLACE_WITH_GOOGLE_SHEET_ID`

with the spreadsheet ID.

## Website request format

Send a POST request to the workflow production webhook:

```json
{
  "session_id": "visitor-session-id",
  "message": "How does Gencouv copy trading work?",
  "name": "",
  "email": "",
  "phone": "",
  "page_url": "https://gencouv.com"
}
```

## Workflow response format

```json
{
  "success": true,
  "reply": "Support response",
  "intent": "copy_trading",
  "lead_status": "qualified",
  "handoff_to_telegram": true,
  "telegram_url": "https://t.me/Gencou_bot",
  "upsell_product": ""
}
```

## Important

Test the webhook manually before activating the workflow. Then copy the production webhook URL into the Gencouv website environment variables and connect the website chat interface to it.
