import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { token } = await context.params;
  const cleanToken = String(token || "").trim();

  if (!/^pm_[a-f0-9]{20}$/i.test(cleanToken)) {
    return NextResponse.redirect(new URL("https://t.me/gencouv"));
  }

  try {
    const admin = createAdminClient();

    await admin
      .from("gencouv_pm_handoffs")
      .update({
        status: "opened",
        telegram_opened_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("handoff_token", cleanToken)
      .eq("status", "created");

    const draft = [
      "Hi Gencouv, I want to continue my Portfolio Management onboarding.",
      `Reference: ${cleanToken}`,
    ].join("\n");

    const telegram = new URL("https://t.me/gencouv");
    telegram.searchParams.set("text", draft);

    return NextResponse.redirect(telegram);
  } catch (error) {
    console.error("PM handoff redirect error", error);
    return NextResponse.redirect(new URL("https://t.me/gencouv"));
  }
}
