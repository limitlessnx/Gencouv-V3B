import type { ReactNode } from "react";
import Link from "next/link";
import "./workspace.css";

const links = [
 ["Overview","/dashboard"],
 ["Trading Bots library","/dashboard#library"],
 ["Inner Circle","/inner-circle"],
 ["Investment Intelligence","/investment-intelligence"],
 ["Portfolio management","/dashboard#portfolio"],
 ["Transactions","/dashboard#orders"],
 ["Support","https://t.me/Gencou_bot?start=dashboard"],
];
export default function WorkspaceLayout({children}:{children:ReactNode}){
 return <div className="client-workspace">
 <aside className="client-sidebar"><Link href="/dashboard" className="client-brand"><span>G</span><div>GENCOUV<small>CLIENT WORKSPACE</small></div></Link><nav aria-label="Client navigation">{links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav><Link className="client-site" href="/">Public website</Link></aside>
 <div className="client-content"><header className="client-mobile-header"><Link href="/dashboard" className="client-brand">GENCOUV</Link><details><summary>Menu</summary><nav aria-label="Mobile client navigation">{links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}<Link href="/">Public website</Link></nav></details></header>{children}</div></div>;
}
