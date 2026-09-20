import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

function bearer(request: Request) {
  const value = request.headers.get("authorization") || "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
}

function cleanToken(value: unknown) {
  const token = String(value || "").trim();
  return /^pm_[a-f0-9]{32}$/.test(token) ? token : null;
}

export async function POST(request: Request) {
  const expected = process.env.GENCOUV_ONBOARDING_AGENT_SECRET;
  if (!expected) {
    return NextResponse.json({ success:false, error:"Onboarding handoff resolver is not configured." }, { status:503 });
  }

  if (bearer(request) !== expected) {
    return NextResponse.json({ success:false, error:"Unauthorized." }, { status:401 });
  }

  const body = await request.json().catch(() => ({}));
  const token = cleanToken(body?.handoff_token || body?.token);
  if (!token) {
    return NextResponse.json({ success:false, error:"Invalid handoff token." }, { status:400 });
  }

  const admin = createAdminClient();
  const { data:handoff, error } = await admin
    .from("gencouv_pm_onboarding_handoffs")
    .select("id,handoff_token,conversation_id,user_id,customer_email,customer_name,country,intended_deposit,recommended_account_type,status,source,context,expires_at,started_at,created_at")
    .eq("handoff_token", token)
    .single();

  if (error || !handoff) {
    return NextResponse.json({ success:false, error:"Handoff not found." }, { status:404 });
  }

  if (new Date(handoff.expires_at).getTime() <= Date.now()) {
    await admin
      .from("gencouv_pm_onboarding_handoffs")
      .update({ status:"expired", updated_at:new Date().toISOString() })
      .eq("id", handoff.id);
    return NextResponse.json({ success:false, error:"Handoff expired." }, { status:410 });
  }

  const { data:messages } = await admin
    .from("gencouv_support_messages")
    .select("role,content,created_at")
    .eq("conversation_id", handoff.conversation_id)
    .order("created_at", { ascending:true })
    .limit(20);

  if (handoff.status === "pending") {
    await admin
      .from("gencouv_pm_onboarding_handoffs")
      .update({
        status:"started",
        started_at:new Date().toISOString(),
        updated_at:new Date().toISOString(),
      })
      .eq("id", handoff.id);
  }

  return NextResponse.json({
    success:true,
    handoff:{
      token:handoff.handoff_token,
      customer:{
        name:handoff.customer_name,
        email:handoff.customer_email,
        country:handoff.country,
        intended_deposit:handoff.intended_deposit,
        recommended_account_type:handoff.recommended_account_type,
      },
      source:handoff.source,
      context:handoff.context,
      conversation:messages || [],
      status:handoff.status === "pending" ? "started" : handoff.status,
    },
  });
}
