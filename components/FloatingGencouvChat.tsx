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
  intent?: string;
  lead_status?: string;
  handoff_to_telegram?: boolean;
  telegram_url?: string;
  upsell_product?: string;
};

export default function FloatingGencouvChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text:
        "Welcome to Gencouv Support. Ask about copy trading, EAs, indicators, broker setup, risk, or eligibility. Copy-trading access starts from $1,000 and requires suitability review.",
    },
  ]);

  const sessionId = useMemo(
    () =>
      `web-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
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
          text:
            data.reply ||
            "I can help with Gencouv trading support, copy trading, EAs and indicators.",
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
          text:
            "Gencouv Support could not connect to the live assistant right now. You can continue directly with the Telegram onboarding agent.",
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
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              x
            </button>
          </header>

          <div className="gencouv-chat-feed">
            {messages.map((message, index) => (
              <article className={message.role} key={`${message.role}-${index}`}>
                <p>{message.text}</p>
                {message.telegramUrl ? (
                  <a href={message.telegramUrl} target="_blank" rel="noreferrer">
                    Continue on Telegram
                  </a>
                ) : null}
              </article>
            ))}
            {loading ? (
              <article className="assistant">
                <p>Checking the best route for your request...</p>
              </article>
            ) : null}
          </div>

          <form onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about copy trading, EAs, indicators..."
              aria-label="Message Gencouv Support"
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
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
        <span className="gencouv-chat-bubble" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="gencouv-chat-status" aria-hidden="true" />
      </button>

      <style jsx>{`
        .gencouv-chat-wrap {
          position: fixed;
          right: max(20px, env(safe-area-inset-right));
          bottom: max(24px, calc(env(safe-area-inset-bottom) + 16px));
          z-index: 2147483000;
          display: flex;
          align-items: flex-end;
          gap: 14px;
          isolation: isolate;
        }

        .gencouv-chat-label {
          margin-bottom: 14px;
          padding: 9px 13px;
          border: 1px solid rgba(53, 228, 192, 0.28);
          border-radius: 999px;
          background: rgba(3, 18, 17, 0.88);
          color: #dffcf4;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.02em;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.34);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          white-space: nowrap;
        }

        .gencouv-chat-button {
          position: relative;
          width: 68px;
          height: 68px;
          display: grid;
          place-items: center;
          border: 1px solid #35e4c0;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 28%, #123c39, #041817 70%);
          color: white;
          box-shadow:
            0 0 0 8px rgba(53, 228, 192, 0.06),
            0 0 36px rgba(53, 228, 192, 0.32),
            0 18px 45px rgba(0, 0, 0, 0.48);
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease;
          animation: chatPulse 2.8s ease-in-out infinite;
        }

        .gencouv-chat-button:hover,
        .gencouv-chat-button:focus-visible {
          transform: translateY(-4px) scale(1.03);
          box-shadow:
            0 0 0 10px rgba(53, 228, 192, 0.08),
            0 0 45px rgba(53, 228, 192, 0.42),
            0 22px 55px rgba(0, 0, 0, 0.54);
          outline: none;
        }

        .gencouv-chat-bubble {
          position: relative;
          width: 31px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          border-radius: 8px;
          background: #f5fffc;
        }

        .gencouv-chat-bubble::after {
          content: "";
          position: absolute;
          right: 4px;
          bottom: -5px;
          width: 10px;
          height: 10px;
          background: #f5fffc;
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }

        .gencouv-chat-bubble i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #0a3934;
        }

        .gencouv-chat-status {
          position: absolute;
          right: 3px;
          bottom: 4px;
          width: 14px;
          height: 14px;
          border: 3px solid #061817;
          border-radius: 50%;
          background: #35e4a6;
          box-shadow: 0 0 12px rgba(53, 228, 166, 0.8);
        }

        .gencouv-chat-panel {
          width: min(390px, calc(100vw - 24px));
          height: min(590px, calc(100vh - 120px));
          display: grid;
          grid-template-rows: auto 1fr auto;
          overflow: hidden;
          border: 1px solid rgba(53, 228, 192, 0.22);
          border-radius: 24px;
          background:
            radial-gradient(circle at 80% 0%, rgba(53, 228, 192, 0.12), transparent 34%),
            rgba(4, 15, 17, 0.96);
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.58);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .gencouv-chat-panel header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .gencouv-chat-panel header span,
        .gencouv-chat-panel header strong {
          display: block;
        }

        .gencouv-chat-panel header span {
          color: #35e4c0;
          font-size: 10px;
          letter-spacing: 0.18em;
        }

        .gencouv-chat-panel header strong {
          margin-top: 5px;
          color: #f3fffb;
          font-size: 15px;
        }

        .gencouv-chat-panel header button {
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: #dffcf4;
          cursor: pointer;
        }

        .gencouv-chat-feed {
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
          padding: 16px;
        }

        .gencouv-chat-feed article {
          width: fit-content;
          max-width: 88%;
          border-radius: 17px;
          padding: 11px 13px;
          font-size: 13px;
          line-height: 1.55;
        }

        .gencouv-chat-feed p {
          margin: 0;
        }

        .gencouv-chat-feed .assistant {
          align-self: flex-start;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.05);
          color: #d8e5e2;
        }

        .gencouv-chat-feed .user {
          align-self: flex-end;
          background: #35e4c0;
          color: #03120d;
          font-weight: 650;
        }

        .gencouv-chat-feed a {
          display: inline-flex;
          margin-top: 10px;
          color: #35e4c0;
          font-weight: 800;
        }

        .gencouv-chat-panel form {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          padding: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .gencouv-chat-panel input {
          min-width: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: #f3fffb;
          padding: 12px 14px;
          outline: none;
        }

        .gencouv-chat-panel input::placeholder {
          color: #7f9691;
        }

        .gencouv-chat-panel form button {
          border: 0;
          border-radius: 999px;
          background: #35e4c0;
          color: #03120d;
          padding: 0 15px;
          font-weight: 850;
          cursor: pointer;
        }

        .gencouv-chat-panel form button:disabled {
          cursor: not-allowed;
          opacity: 0.55;
        }

        @keyframes chatPulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @media (max-width: 700px) {
          .gencouv-chat-wrap {
            right: max(12px, env(safe-area-inset-right));
            bottom: max(14px, calc(env(safe-area-inset-bottom) + 10px));
            gap: 8px;
          }

          .gencouv-chat-button {
            width: 58px;
            height: 58px;
          }

          .gencouv-chat-bubble {
            transform: scale(0.9);
          }

          .gencouv-chat-label {
            display: none;
          }

          .gencouv-chat-panel {
            height: min(560px, calc(100vh - 92px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gencouv-chat-button {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
