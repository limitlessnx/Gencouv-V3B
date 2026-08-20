import Link from "next/link";

const cards = [
  ["Inbox", "Replies", "/dashboard/email/inbox"],
  ["Subscribers", "Contacts", "/dashboard/email/subscribers"],
  ["Education sequence", "30 days", "/dashboard/email/campaigns"],
  ["Compose", "Outbound", "/dashboard/email/compose"],
];

export default function EmailDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-sm font-medium text-cyan-300">Fluxknight</p><h1 className="text-3xl font-semibold tracking-tight">Gencouv Email Center</h1><p className="mt-2 text-sm text-slate-400">Replies, subscribers, campaigns and outbound email in one place.</p></div>
          <Link href="/dashboard/email/compose" className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950">Compose email</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([title, label, href]) => <Link key={title} href={href} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.07]"><p className="text-sm text-slate-400">{title}</p><p className="mt-2 text-2xl font-semibold">{label}</p><p className="mt-3 text-xs text-cyan-300">Open →</p></Link>)}</div>
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6"><h2 className="font-semibold">Email operations</h2><p className="mt-2 max-w-2xl text-sm text-slate-400">The dashboard is designed to use Resend server-side. Inbound replies will be persisted through the Resend webhook once configured; suppressed and unsubscribed contacts must never be included in outbound sends.</p></section>
      </div>
    </main>
  );
}
