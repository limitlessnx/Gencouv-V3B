import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import ClientNavigation from "./ClientNavigation";
import "./workspace.css";

export default async function WorkspaceLayout({children}:{children:ReactNode}){
 const db=await createClient();
 const {data:{user}}=await db.auth.getUser();
 if(!user) redirect("/login");
 return <div className="client-workspace"><ClientNavigation email={user.email||"Client account"}/><div className="client-content">{children}</div></div>;
}
