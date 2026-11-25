import {createClient} from "@/lib/supabase-server";
import {redirect} from "next/navigation";
import ResetForm from "./ResetForm";
export default async function Reset(){const db=await createClient();const {data:{user}}=await db.auth.getUser();if(!user)redirect("/forgot-password");return <main className="auth-shell"><section className="auth-card"><h1>Set a new password</h1><p>Updating the password for {user.email}.</p><ResetForm/></section></main>}