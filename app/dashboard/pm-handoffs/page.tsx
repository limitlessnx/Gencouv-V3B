import Link from "next/link";
import { createAdminClient } from "@/lib/supabase-admin";
import { requireGencouvStaff } from "@/lib/staff-access";
import { updatePMHandoffStatus } from "./actions";

function fmt(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function statusLabel(status: string) {
  return status.replaceAll("_", " ");
}

export default async function PMHandoffsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  await requireGencouvStaff();
  const params = await searchParams;
  const q = String(params.q || "").trim();
  const status = String(params.status || "").trim();

  const admin = createAdminClient();

  let query = admin
    .from("gencouv_pm_handoffs")
    .select("id,handoff_token,conversation_id,user_id,customer_email,customer_name,source,status,context,telegram_opened_at,created_at,updated_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (status) query = query.eq("status", status);
  if (q) {
    query = query.or(
      `handoff_token.ilike.%${q.replaceAll(",", "")}%,customer_email.ilike.%${q.replaceAll(",", "")}%,customer_name.ilike.%${q.replaceAll(",", "")}%`
    );
  }

  const { data: handoffs, error } = await query;
  if (error) throw error;

  const conversationIds = (handoffs || [])
    .map((item) => item.conversation_id)
    .filter(Boolean);

  const { data: messages } = conversationIds.length
    ? await admin
        .from("gencouv_support_messages")
        .select("conversation_id,role,content,created_at")
        .in("conversation_id", conversationIds)
        .order("created_at", { ascending: true })
    : { data: [] as any[] };

  const messageMap = new Map<string, any[]>();
  for (const message of messages || []) {
    const list = messageMap.get(message.conversation_id) || [];
    list.push(message);
    messageMap.set(message.conversation_id, list);
  }

  return (
    <main className="pmShell">
      <header className="top">
        <div>
          <span>GENCOUV INTERNAL</span>
          <h1>PM Onboarding Handoffs</h1>
          <p>Search a handoff reference and continue the client conversation with context intact.</p>
        </div>
        <Link href="/dashboard">Back to dashboard</Link>
      </header>

      <form className="filters">
        <input name="q" defaultValue={q} placeholder="Reference, email or name" />
        <select name="status" defaultValue={status}>
          <option value="">All statuses</option>
          <option value="created">Created</option>
          <option value="opened">Telegram opened</option>
          <option value="in_progress">In progress</option>
          <option value="submitted">Submitted</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="expired">Expired</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <section className="summary">
        <strong>{handoffs?.length || 0}</strong>
        <span>handoffs shown</span>
      </section>

      <section className="list">
        {(handoffs || []).map((handoff) => {
          const transcript = handoff.conversation_id
            ? messageMap.get(handoff.conversation_id) || []
            : [];
          const context = (handoff.context || {}) as Record<string, unknown>;

          return (
            <article className="card" key={handoff.id}>
              <div className="cardHead">
                <div>
                  <span className="token">{handoff.handoff_token}</span>
                  <h2>{handoff.customer_name || "Unnamed PM lead"}</h2>
                  <p>{handoff.customer_email || "No email captured"}</p>
                </div>
                <span className={`status ${handoff.status}`}>{statusLabel(handoff.status)}</span>
              </div>

              <div className="meta">
                <div><span>Created</span><strong>{fmt(handoff.created_at)}</strong></div>
                <div><span>Telegram opened</span><strong>{fmt(handoff.telegram_opened_at)}</strong></div>
                <div><span>Source</span><strong>{handoff.source}</strong></div>
              </div>

              {typeof context.latest_message === "string" && context.latest_message ? (
                <div className="intent">
                  <span>Latest PM intent</span>
                  <p>{context.latest_message}</p>
                </div>
              ) : null}

              <details>
                <summary>Website conversation ({transcript.length})</summary>
                <div className="transcript">
                  {transcript.length ? transcript.map((message, index) => (
                    <div className={`msg ${message.role}`} key={index}>
                      <strong>{message.role === "user" ? "Client" : "Support AI"}</strong>
                      <p>{message.content}</p>
                      <small>{fmt(message.created_at)}</small>
                    </div>
                  )) : <p className="empty">No stored conversation is attached to this handoff.</p>}
                </div>
              </details>

              <form action={updatePMHandoffStatus} className="actions">
                <input type="hidden" name="id" value={handoff.id} />
                <select name="status" defaultValue={handoff.status}>
                  <option value="created">Created</option>
                  <option value="opened">Telegram opened</option>
                  <option value="in_progress">In progress</option>
                  <option value="submitted">Submitted</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="expired">Expired</option>
                </select>
                <button type="submit">Update status</button>
                <a href="https://t.me/gencouv" target="_blank" rel="noreferrer">Open Telegram ↗</a>
              </form>
            </article>
          );
        })}

        {!handoffs?.length && (
          <div className="emptyState">
            <strong>No PM handoffs found.</strong>
            <p>Try another reference, email, name or status.</p>
          </div>
        )}
      </section>

      <style>{`
        .pmShell{min-height:100vh;background:#020909;color:#d9e6e2;padding:38px max(22px,5vw);font-family:inherit}
        .top{display:flex;justify-content:space-between;gap:30px;align-items:flex-end;max-width:1180px;margin:auto;padding-bottom:28px;border-bottom:1px solid rgba(255,255,255,.08)}
        .top span{font-size:9px;letter-spacing:.18em;color:#35e4c0}.top h1{margin:9px 0 6px;font-size:34px}.top p{margin:0;color:#71847f;font-size:12px}.top a,.actions a{color:#35e4c0;text-decoration:none;font-size:11px}
        .filters{max-width:1180px;margin:24px auto;display:grid;grid-template-columns:1fr 190px 110px;gap:10px}
        .filters input,.filters select,.filters button,.actions select,.actions button{border:1px solid rgba(255,255,255,.1);border-radius:10px;background:#071112;color:#d9e6e2;padding:11px 12px;font:inherit;font-size:11px}.filters button,.actions button{background:#35e4c0;color:#03100e;border:0;font-weight:800;cursor:pointer}
        .summary{max-width:1180px;margin:0 auto 14px;color:#71847f;font-size:10px}.summary strong{color:#d9e6e2;font-size:16px;margin-right:6px}
        .list{max-width:1180px;margin:auto;display:grid;gap:14px}.card{border:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,rgba(10,22,23,.95),rgba(5,12,13,.98));border-radius:16px;padding:20px}
        .cardHead{display:flex;justify-content:space-between;gap:24px}.token{display:inline-block;padding:5px 8px;border-radius:6px;background:rgba(53,228,192,.08);color:#35e4c0!important;font-family:monospace;font-size:10px!important}.card h2{font-size:19px;margin:10px 0 4px}.cardHead p{margin:0;color:#71847f;font-size:10px}.status{height:max-content;padding:6px 9px;border-radius:999px;background:rgba(255,255,255,.05);font-size:8px;text-transform:uppercase;letter-spacing:.08em}.status.approved{color:#35e4c0}.status.rejected,.status.expired{color:#bd7777}
        .meta{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:18px 0;padding:14px 0;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}.meta span,.intent span{display:block;color:#61736f;font-size:8px;text-transform:uppercase;letter-spacing:.08em}.meta strong{display:block;margin-top:5px;font-size:10px;font-weight:600}
        .intent{padding:12px;background:rgba(53,228,192,.035);border:1px solid rgba(53,228,192,.08);border-radius:10px;margin-bottom:14px}.intent p{margin:7px 0 0;font-size:11px;line-height:1.55;color:#a9b8b4}
        details{border-top:1px solid rgba(255,255,255,.06);padding-top:13px}summary{cursor:pointer;color:#8fa19c;font-size:10px}.transcript{display:grid;gap:8px;margin-top:12px;max-height:340px;overflow:auto}.msg{padding:10px;border-radius:9px;background:#071112}.msg.user{border-left:2px solid #35e4c0}.msg strong{font-size:8px;text-transform:uppercase;color:#788c87}.msg p{font-size:10px;line-height:1.55;margin:5px 0;color:#bac7c3}.msg small{font-size:7px;color:#52635f}
        .actions{display:flex;gap:9px;align-items:center;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.06)}.actions select{min-width:170px}.actions a{margin-left:auto}.empty,.emptyState{color:#71847f;font-size:11px}.emptyState{padding:35px;border:1px dashed rgba(255,255,255,.1);border-radius:14px}.emptyState strong{color:#cbd8d4}
        @media(max-width:700px){.pmShell{padding:24px 14px}.top{display:block}.top a{display:inline-block;margin-top:16px}.filters{grid-template-columns:1fr}.cardHead{display:block}.status{display:inline-block;margin-top:12px}.meta{grid-template-columns:1fr}.actions{align-items:stretch;flex-direction:column}.actions a{margin:0;padding:8px 0}.actions select{width:100%}}
      `}</style>
    </main>
  );
}
