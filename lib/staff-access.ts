import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

function allowedEmails() {
  return new Set(
    (process.env.GENCOUV_STAFF_EMAILS || "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function requireGencouvStaff() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard/pm-handoffs");
  }

  const email = user.email?.toLowerCase() || "";
  const metadataRole =
    typeof user.app_metadata?.role === "string"
      ? user.app_metadata.role.toLowerCase()
      : "";

  const isStaff =
    metadataRole === "staff" ||
    metadataRole === "admin" ||
    allowedEmails().has(email);

  if (!isStaff) {
    redirect("/dashboard");
  }

  return user;
}
