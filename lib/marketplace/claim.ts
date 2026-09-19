import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

export async function claimMarketplacePurchases(user:{id:string;email?:string|null;email_confirmed_at?:string|null}) {
  const rawEmail=user.email?.trim().toLowerCase();
  if(!rawEmail||!user.email_confirmed_at) return {claimed:0,reason:"email_not_verified" as const};

  const admin=createAdminClient();
  const {data:orders,error}=await admin
    .from("marketplace_orders")
    .select("order_id")
    .is("user_id",null)
    .eq("payment_status","finished")
    .ilike("customer_email",rawEmail);

  if(error) throw error;
  const ids=(orders||[]).map(order=>order.order_id);
  if(!ids.length) return {claimed:0,reason:"none" as const};

  const now=new Date().toISOString();

  const {error:orderError}=await admin
    .from("marketplace_orders")
    .update({user_id:user.id,claimed_at:now,updated_at:now})
    .in("order_id",ids)
    .is("user_id",null);

  if(orderError) throw orderError;

  const {error:entitlementError}=await admin
    .from("marketplace_entitlements")
    .update({user_id:user.id,status:"active",claimed_at:now,updated_at:now})
    .in("order_id",ids)
    .is("user_id",null)
    .ilike("customer_email",rawEmail);

  if(entitlementError) throw entitlementError;

  return {claimed:ids.length,reason:"claimed" as const};
}
