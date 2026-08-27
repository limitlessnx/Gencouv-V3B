# Gencouv Campaign Enrollment Pipeline

## Purpose

Promote only eligible, validated, non-suppressed leads into one daily email cohort and enroll each lead at most once per campaign. Resend must be triggered only after enrollment succeeds.

## Pipeline

`gencouv_raw_leads` -> validation/suppression/qualification -> `gencouv_qualified_leads` -> `gencouv_daily_cohorts` -> `gencouv_campaign_enrollments` -> Resend `gencouv.campaign.enrolled`

## Rules

1. Daily cohort target is configurable: **30 leads/day initially**, with capacity to increase in controlled steps up to **200 leads/day** without rebuilding the workflow.
2. Normalize email before every comparison or insert.
3. Suppression is a hard stop. Check `gencouv_suppression_list` before qualification and again immediately before enrollment.
4. Only leads with `validation_status = verified_mx` and `qualification_status = qualified` may proceed.
5. Do not enroll a lead when `do_not_contact` is true, or when bounce, unsubscribe, or suppression state indicates a stop.
6. Enrollment is idempotent. The existing unique enrollment constraints must be treated as the final duplicate guard.
7. A raw lead creation event must not start Resend directly.
8. Emit the Resend event only after a successful enrollment insert/upsert.
9. Use event name `gencouv.campaign.enrolled` for the campaign trigger.
10. Payload should include `lead_id`, `normalized_email`, `cohort_date`, `campaign_key`, `CTA_LINK`, and `ONBOARDING_LINK`.
11. Product positioning should use `portfolio_management`, not the retired `copy_trading` label.
12. Save the returned Resend contact/run identifier back to the enrollment record where available.
13. Delivery, bounce, unsubscribe, and reply events update the enrollment and stop future sequence steps when appropriate.
14. Increasing the daily target must only affect **new cohorts**. Existing cohorts retain their original membership and sequence schedule.

## n8n orchestration

### Daily run

1. Fetch the day's raw Apify leads.
2. Normalize and deduplicate emails.
3. Exclude addresses in suppression.
4. Require verified email status and the configured qualification criteria.
5. Insert/upsert qualified records into `gencouv_qualified_leads`.
6. Read the configured daily cohort target (initially 30, maximum 200).
7. Create one `gencouv_daily_cohorts` record for the cohort date and campaign key.
8. Select up to the configured target of newly eligible leads for that cohort.
9. Insert enrollment rows with an idempotent conflict-safe operation.
10. For each newly inserted enrollment only, emit `gencouv.campaign.enrolled` to Resend.
11. Record the Resend identifiers and initial sequence state.
12. Sync cohort/enrollment status to Fluxknight.

### Scaling

The daily target must be a configuration value, not a hard-coded workflow limit. Start at 30. An authorized operator can raise it progressively up to 200 as deliverability and operational capacity permit. Lowering the target affects only future cohorts and never removes leads from an existing cohort.

### Retry behavior

If a node fails, retry the failed stage without generating a new enrollment. Never restart the whole campaign by emitting `lead.created` events for existing records.

## Resend

The campaign automation should listen for `gencouv.campaign.enrolled`, not `gencouv.lead.created`. Each enrolled lead receives the configured delayed sequence once. The sequence must stop on reply, bounce, unsubscribe, suppression, or explicit do-not-contact state.

## Monitoring

Fluxknight should expose daily counts for raw, rejected/suppressed, qualified, enrolled, active, replied, stopped, bounced, unsubscribed, and completed leads. A mismatch between qualified and enrolled counts should be surfaced as an error rather than silently ignored.
