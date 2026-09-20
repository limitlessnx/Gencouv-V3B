"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase-admin";
import { requireGencouvStaff } from "@/lib/staff-access";

const allowedStatuses = new Set([
  "created",
  "opened",
  "in_progress",
  "submitted",
  "approved",
  "rejected",
  "expired",
]);

export async function updatePMHandoffStatus(formData: FormData) {
  await requireGencouvStaff();

  const id = String(formData.get("id") || "").trim();
  const status = String(formData.get("status") || "").trim();

  if (!/^[0-9a-f-]{36}$/i.test(id) || !allowedStatuses.has(status)) {
    throw new Error("Invalid PM handoff update.");
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("gencouv_pm_handoffs")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/dashboard/pm-handoffs");
}
