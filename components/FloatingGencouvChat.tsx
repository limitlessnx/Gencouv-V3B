"use client";

import { FormEvent, useMemo, useState } from "react";

const TELEGRAM = "https://t.me/Gencou_bot?start=website_support_handoff";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
  telegramUrl?: string;
};

type SupportResponse = {
  success?: boolean;
  reply?: string;
  lead_status?: string;
  handoff_to_telegram?: boolean;
  telegram_url?: string;
};

export default function FloatingGencouvChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Welcome to Gencouv Support. How can we help you today?" },
  ]);

  const sessionId = useMemo(
    () => `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    [],
  );

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) return;

    setInput("");
    setMessages((current) => [...current, { role: "user", text: message }]);
    setLoading(true);

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          session_id: sessionId,
          page_url: window.location.href,
        }),
      });

      const data = (await response.json()) as SupportResponse;
      if (!response.ok || !data.success) {
        throw new Error(data.reply || "Support is not available right now.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: data.reply || "How can Gencouv Support assist you?",
          telegramUrl:
            data.handoff_to_telegram || data.lead_status === "qualified"
              ? data.telegram_url || TELEGRAM
              : undefined,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "Gencouv Support is temporarily unavailable. You can continue with our Telegram onboarding agent.",
          telegramUrl: TELEGRAM,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="gencouv-chat-wrap" aria-label="Gencouv trading support">
      {open ? (
        <section className="gencouv-chat-panel" aria-label="Gencouv Support chat">
          <header>
            <div>
              <span>GENCOUV SUPPORT</span>
              <strong>Trading desk assistant</strong>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>

          <div className="gencouv-chat-feed">
            {messages.map((message, index) => (
              <article className={message.role} key={`${message.role}-${index}`}>
                <p>{message.text}</p>
                {message.telegramUrl ? (
                  <a href={message.telegramUrl} target="_blank" rel="noreferrer">Continue on Telegram</a>
                ) : null}
              </article>
            ))}
            {loading ? <article className="assistant"><p>One moment...</p></article> : null}
          </div>

          <form onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message..."
              aria-label="Message Gencouv Support"
            />
            <button type="submit" disabled={loading || !input.trim()}>Send</button>
          </form>
        </section>
      ) : (
        <span className="gencouv-chat-label">Chat with Gencouv Support</span>
      )}

      <button
        type="button"
        className="gencouv-chat-button"
        aria-label={open ? "Close Gencouv Support" : "Open Gencouv Support"}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="gencouv-chat-bubble" aria-hidden="true"><i /><i /><i /></span>
        <span className="gencouv-chat-status" aria-hidden="true" />
      </button>

      <style jsx>{`
        .gencouv-chat-wrap{position:fixed;right:max(20px,env(safe-area-inset-right));bottom:max(24px,calc(env(safe-area-inset-bottom) + 16px));z-index:2147483000;display:flex;align-items:flex-end;gap:12px;isolation:isolate}
        .gencouv-chat-label{margin-bottom:14px;padding:9px 13px;border:1px solid rgba(53,228,192,.28);border-radius:999px;background:rgba(3,18,17,.88);color:#dffcf4;font-size:12px;font-weight:700;box-shadow:0 12px 35px rgba(0,0,0,.34);backdrop-filter:blur(14px);white-space:nowrap}
        .gencouv-chat-button{position:relative;width:62px;height:62px;display:grid;place-items:center;border:1px solid #35e4c0;border-radius:50%;background:radial-gradient(circle at 35% 28%,#123c39,#041817 70%);box-shadow:0 0 0 8px rgba(53,228,192,.06),0 0 36px rgba(53,228,192,.32),0 18px 45px rgba(0,0,0,.48);cursor:pointer;animation:chatPulse 2.8s ease-in-out infinite}
        .gencouv-chat-bubble{position:relative;width:29px;height:22px;display:flex;align-items:center;justify-content:center;gap:3px;border-radius:8px;background:#f5fffc}
        .gencouv-chat-bubble:after{content:"";position:absolute;right:4px;bottom:-5px;width:9px;height:9px;background:#f5fffc;clip-path:polygon(0 0,100% 0,100% 100%)}
        .gencouv-chat-bubble i{width:3px;height:3px;border-radius:50%;background:#0a3934}
        .gencouv-chat-status{position:absolute;right:3px;bottom:4px;width:13px;height:13px;border:3px solid #061817;border-radius:50%;background:#35e4a6;box-shadow:0 0 12px rgba(53,228,166,.8)}
        .gencouv-chat-panel{width:min(340px,calc(100vw - 100px));height:min(520px,calc(100vh - 135px));display:grid;grid-template-rows:auto 1fr auto;overflow:hidden;border:1px solid rgba(53,228,192,.22);border-radius:22px;background:radial-gradient(circle at 80% 0%,rgba(53,228,192,.12),transparent 34%),rgba(4,15,17,.96);box-shadow:0 28px 90px rgba(0,0,0,.58);backdrop-filter:blur(18px)}
        header{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:15px;border-bottom:1px solid rgba(255,255,255,.08)}
        header span,header strong{display:block}header span{color:#35e4c0;font-size:9px;letter-spacing:.18em}header strong{margin-top:4px;color:#f3fffb;font-size:14px}header button{width:32px;height:32px;border:1px solid rgba(255,255,255,.1);border-radius:50%;background:rgba(255,255,255,.05);color:#dffcf4;cursor:pointer}
        .gencouv-chat-feed{display:flex;flex-direction:column;gap:9px;overflow-y:auto;padding:14px}.gencouv-chat-feed article{width:fit-content;max-width:90%;border-radius:16px;padding:10px 12px;font-size:12px;line-height:1.5}.gencouv-chat-feed p{margin:0}.assistant{align-self:flex-start;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.05);color:#d8e5e2}.user{align-self:flex-end;background:#35e4c0;color:#03120d;font-weight:650}.gencouv-chat-feed a{display:inline-flex;margin-top:9px;color:#35e4c0;font-weight:800}
        form{display:grid;grid-template-columns:1fr auto;gap:8px;padding:11px;border-top:1px solid rgba(255,255,255,.08)}input{min-width:0;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.06);color:#f3fffb;padding:10px 12px;font-size:12px;outline:none}input::placeholder{color:#7f9691}form button{border:0;border-radius:999px;background:#35e4c0;color:#03120d;padding:0 13px;font-size:12px;font-weight:850;cursor:pointer}form button:disabled{cursor:not-allowed;opacity:.55}
        @keyframes chatPulse{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @media(max-width:1000px){.gencouv-chat-panel{width:min(320px,calc(100vw - 88px));height:min(480px,calc(100vh - 120px))}}
        @media(max-width:700px){.gencouv-chat-wrap{right:max(10px,env(safe-area-inset-right));bottom:max(12px,calc(env(safe-area-inset-bottom) + 8px));gap:7px}.gencouv-chat-button{width:52px;height:52px}.gencouv-chat-bubble{transform:scale(.84)}.gencouv-chat-label{display:none}.gencouv-chat-panel{width:min(300px,calc(100vw - 76px));height:min(450px,calc(100vh - 100px));border-radius:19px}header{padding:13px}.gencouv-chat-feed{padding:12px}form{padding:9px}}
        @media(max-width:390px){.gencouv-chat-button{display:none}.gencouv-chat-panel{width:calc(100vw - 20px);height:min(440px,calc(100vh - 40px))}}
        @media(prefers-reduced-motion:reduce){.gencouv-chat-button{animation:none}}
      `}</style>
    </div>
  );
}