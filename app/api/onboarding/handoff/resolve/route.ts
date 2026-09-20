import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

function bearer(request: Request) {
  const value = request.headers.get("authorization") || "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
}

function cleanToken(value: unknown) {
  const token = String(value || "").trim().toLowerCase();
  return /^pm_[a-f0-9]{20}$/.test(token) ? token : null;
}

export async function POST(request: Request) {
  const expected = process.env.GENCOUV_ONBOARDING_AGENT_SECRET;

  if (!expected) {
    return NextResponse.json(
      { success:false, error:"Onboarding handoff resolver is not configured." },
      { status:503 }
    );
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
    .from("gencouv_pm_handoffs")
    .select("id,handoff_token,conversation_id,user_id,customer_email,customer_name,status,source,context,telegram_opened_at,created_at,updated_at")
    .eq("handoff_token", token)
    .single();

  if (error || !handoff) {
    return NextResponse.json({ success:false, error:"Handoff not found." }, { status:404 });
  }

  const { data:messages } = handoff.conversation_id
    ? await admin
        .from("gencouv_support_messages")
        .select("role,content,created_at")
        .eq("conversation_id", handoff.conversation_id)
        .order("created_at", { ascending:true })
        .limit(30)
    : { data: [] };

  if (handoff.status === "created" || handoff.status === "opened") {
    await admin
      .from("gencouv_pm_handoffs")
      .update({
        status:"in_progress",
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
      },
      source:handoff.source,
      context:handoff.context,
      conversation:messages || [],
      status:
        handoff.status === "created" || handoff.status === "opened"
          ? "in_progress"
          : handoff.status,
      created_at:handoff.created_at,
    },
  });
}
