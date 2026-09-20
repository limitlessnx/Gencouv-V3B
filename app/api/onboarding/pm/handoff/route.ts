import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

function authorized(request: Request) {
  const expected = process.env.GENCOUV_ONBOARDING_AGENT_SECRET;
  if (!expected) return false;
  const auth = request.headers.get("authorization") || "";
  return auth === `Bearer ${expected}`;
}

function clean(value: unknown, max = 500) {
  return String(value || "").trim().slice(0, max);
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const token = clean(body?.handoff_token || body?.token, 80).toUpperCase();

  if (!token) {
    return NextResponse.json({ success: false, error: "handoff_token is required" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: handoff, error } = await admin
    .from("gencouv_pm_onboarding_handoffs")
    .select("id,handoff_token,user_id,customer_email,customer_name,country,intended_deposit,recommended_account_type,status,source,context,expires_at,started_at,completed_at,created_at,updated_at")
    .eq("handoff_token", token)
    .maybeSingle();

  if (error) {
    console.error("PM handoff lookup failed", error);
    return NextResponse.json({ success: false, error: "Lookup failed" }, { status: 500 });
  }

  if (!handoff) {
    return NextResponse.json({ success: false, error: "Handoff not found" }, { status: 404 });
  }

  if (handoff.expires_at && new Date(handoff.expires_at).getTime() < Date.now()) {
    await admin
      .from("gencouv_pm_onboarding_handoffs")
      .update({ status: "expired", updated_at: new Date().toISOString() })
      .eq("id", handoff.id);

    return NextResponse.json({ success: false, error: "Handoff expired" }, { status: 410 });
  }

  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (handoff.status === "pending") {
    updates.status = "started";
    updates.started_at = new Date().toISOString();
  }

  const allowedStatus = new Set(["pending", "started", "completed", "expired", "cancelled"]);
  const requestedStatus = clean(body?.status, 40).toLowerCase();

  if (requestedStatus && allowedStatus.has(requestedStatus)) {
    updates.status = requestedStatus;
    if (requestedStatus === "completed") {
      updates.completed_at = new Date().toISOString();
    }
  }

  await admin
    .from("gencouv_pm_onboarding_handoffs")
    .update(updates)
    .eq("id", handoff.id);

  return NextResponse.json({
    success: true,
    handoff: {
      handoff_token: handoff.handoff_token,
      customer_name: handoff.customer_name,
      customer_email: handoff.customer_email,
      country: handoff.country,
      intended_deposit: handoff.intended_deposit,
      recommended_account_type: handoff.recommended_account_type,
      status: requestedStatus && allowedStatus.has(requestedStatus) ? requestedStatus : (handoff.status === "pending" ? "started" : handoff.status),
      context: handoff.context,
      created_at: handoff.created_at,
    },
  });
}
