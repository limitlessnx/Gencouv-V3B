"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect,useState } from "react";
import { createClient } from "@/lib/supabase-browser";
const links=[
 ["Overview","/dashboard","M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z"],
 ["Trading Bots","/dashboard/trading-bots","M5 7h14v13H5z M9 3h6 M12 3v4 M9 12h.1 M15 12h.1 M9 16h6"],
 ["Inner Circle","/dashboard/inner-circle","M12 3l9 5-9 5-9-5z M3 12l9 5 9-5 M3 16l9 5 9-5"],
 ["Investment Intelligence","/dashboard/investment-intelligence","M3 3v18h18 M6 15l5-6 4 3 6-7"],
 ["Portfolio management","/dashboard/portfolio","M3 7h18v13H3z M8 7V4h8v3 M3 12h18"],
 ["Transactions","/dashboard/transactions","M5 3h14v18l-3-2-4 2-4-2-3 2z M8 8h8 M8 12h8 M8 16h5"],
 ["Support","https://t.me/Gencou_bot?start=dashboard","M4 13v-2a8 8 0 0116 0v2 M4 13h4v6H4z M16 13h4v6h-4z"]
];
export default function ClientNavigation({email}:{email:string}){
 const path=usePathname();const [hash,setHash]=useState("");const [open,setOpen]=useState(false);const [busy,setBusy]=useState(false);const [error,setError]=useState("");
 useEffect(()=>{const sync=()=>setHash(window.location.hash);sync();window.addEventListener("hashchange",sync);return()=>window.removeEventListener("hashchange",sync)},[path]);
 useEffect(()=>{setOpen(false)},[path]);
 async function logout(){setBusy(true);setError("");try{const {error}=await createClient().auth.signOut();if(error)throw error;window.location.assign("/login")}catch{setError("Unable to sign out. Please try again.");setBusy(false)}}
 const menu=<nav aria-label="Client navigation">{links.map(([label,href,d])=>{const active=path===href||(href==="/dashboard/trading-bots"&&path?.startsWith("/dashboard/marketplace/"));return <Link key={href} href={href} aria-current={active?"page":undefined} onClick={()=>{setOpen(false);if(href.startsWith("/dashboard#"))setHash(href.slice(10));else setHash("")}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d}/></svg>{label}</Link>})}</nav>;
 const account=<div className="client-account"><small>Signed in as</small><strong>{email}</strong><button type="button" disabled={busy} onClick={logout}>{busy?"Signing out…":"Sign out"}</button>{error&&<p role="alert">{error}</p>}<Link href="/">Public website</Link></div>;
 return <><aside className="client-sidebar"><Link href="/dashboard" className="client-brand"><span>G</span><div>GENCOUV<small>CLIENT WORKSPACE</small></div></Link>{menu}{account}</aside><header className="client-mobile-header"><Link href="/dashboard" className="client-brand">GENCOUV</Link><button className="client-menu-toggle" type="button" aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?"Close":"Menu"}</button>{open&&<div className="client-mobile-menu">{menu}{account}</div>}</header></>;
}
