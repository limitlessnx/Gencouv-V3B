import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

function authorized(request: Request) {
  const secret = process.env.GENCOUV_ONBOARDING_AGENT_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization") || "";
  return header === `Bearer ${secret}`;
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ success:false, error:"Unauthorized" }, { status:401 });
  }

  const body = await request.json().catch(() => ({}));
  const token = String(body?.handoff_token || body?.token || "").trim().toUpperCase();

  if (!/^PM-[A-F0-9]{12}$/.test(token)) {
    return NextResponse.json({ success:false, error:"Invalid handoff token" }, { status:400 });
  }

  const admin = createAdminClient();

  const { data:handoff, error } = await admin
    .from("gencouv_pm_handoffs")
    .select("id,handoff_token,conversation_id,user_id,customer_email,customer_name,status,context,created_at,updated_at")
    .eq("handoff_token", token)
    .single();

  if (error || !handoff) {
    return NextResponse.json({ success:false, error:"Handoff not found" }, { status:404 });
  }

  if (handoff.status === "created") {
    await admin
      .from("gencouv_pm_handoffs")
      .update({
        status:"telegram_started",
        telegram_started_at:new Date().toISOString(),
        updated_at:new Date().toISOString(),
      })
      .eq("id", handoff.id);
  }

  return NextResponse.json({
    success:true,
    handoff:{
      ...handoff,
      status:handoff.status === "created" ? "telegram_started" : handoff.status,
    },
  });
}
