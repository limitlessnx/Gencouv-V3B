"use client";

import { FormEvent, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { useTriggerChatTransport } from "@trigger.dev/sdk/chat/react";
import type { gencouvSupportAgent } from "@/trigger/gencouv-support-agent";
import {
  mintGencouvSupportAccessToken,
  startGencouvSupportSession,
  createGencouvPMHandoff,
} from "@/app/actions/gencouv-support-chat";

const HUMAN_SUPPORT = "https://t.me/gencouv";

function makeSessionId() {
  if (typeof window === "undefined") return "gencouv-support";
  const key = "gencouv_trigger_support_session";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const value = `gencouv-${crypto.randomUUID()}`;
  window.localStorage.setItem(key, value);
  return value;
}

function messageText(message: any) {
  if (!Array.isArray(message?.parts)) return "";
  return message.parts
    .filter((part: any) => part?.type === "text" && typeof part?.text === "string")
    .map((part: any) => part.text)
    .join("");
}

export default function FloatingGencouvChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [handoffBusy, setHandoffBusy] = useState(false);
  const chatId = useMemo(() => makeSessionId(), []);

  const transport = useTriggerChatTransport<typeof gencouvSupportAgent>({
    task: "gencouv-support-agent",
    accessToken: ({ chatId }) => mintGencouvSupportAccessToken(chatId),
    startSession: ({ chatId }) =>
      startGencouvSupportSession({ chatId }),
  });

  const { messages, sendMessage, stop, status, error } = useChat({
    id: chatId,
    transport,
  });

  const busy = status === "submitted" || status === "streaming";

  async function startPMHandoff() {
    if (handoffBusy) return;
    setHandoffBusy(true);
    const popup = window.open("", "_blank");
    try {
      const handoff = await createGencouvPMHandoff(chatId);
      if (popup) {
        popup.location.href = handoff.telegramUrl;
      } else {
        window.location.href = handoff.telegramUrl;
      }
    } catch {
      if (popup) popup.close();
      window.open(HUMAN_SUPPORT, "_blank", "noopener,noreferrer");
    } finally {
      setHandoffBusy(false);
    }
  }

  async function send(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <div className="gcWrap">
      {open && (
        <section className="gcPanel" aria-label="Gencouv Support chat">
          <header>
            <div>
              <span className="gcDot" />
              <div>
                <strong>Gencouv Support AI</strong>
                <small>Durable support powered by Trigger.dev</small>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close support chat">×</button>
          </header>

          <div className="gcMessages">
            <div className="gcMsg assistant">
              <span>
                Hi. I’m Gencouv Support AI. I can help with Trading Bots, purchases, My Library access,
                portfolio management, onboarding and risk information.
              </span>
            </div>

            {messages.map((message) => {
              const text = messageText(message);
              if (!text) return null;
              return (
                <div key={message.id} className={`gcMsg ${message.role === "user" ? "user" : "assistant"}`}>
                  <span>{text}</span>
                </div>
              );
            })}

            {busy && status === "submitted" && (
              <div className="gcMsg assistant">
                <span className="gcTyping"><i /><i /><i /></span>
              </div>
            )}

            {error && (
              <div className="gcMsg assistant">
                <span>Support could not reconnect right now. Your conversation is preserved. Please retry shortly.</span>
              </div>
            )}
          </div>

          <div className="gcActions">
            {busy && <button type="button" onClick={stop}>Stop response</button>}
            <button type="button" onClick={startPMHandoff} disabled={handoffBusy}>
              {handoffBusy ? "Preparing onboarding…" : "Continue PM onboarding ↗"}
            </button>
          </div>

          <form onSubmit={send}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={4000}
              placeholder="Ask Gencouv Support…"
              aria-label="Message Gencouv Support"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send message">↑</button>
          </form>

          <p className="gcRisk">Trading involves substantial risk. Support information is not financial advice.</p>
        </section>
      )}

      {!open && <span className="gcLabel">Support AI</span>}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="gcButton"
        aria-label={open ? "Close Gencouv Support" : "Open Gencouv Support"}
      >
        {open ? <span className="gcClose">×</span> : <span className="gcBubble" aria-hidden="true"><i /><i /><i /></span>}
        {!open && <span className="gcStatus" aria-hidden="true" />}
      </button>

      <style jsx>{`
        .gcWrap{position:fixed;right:max(20px,env(safe-area-inset-right));bottom:max(24px,calc(env(safe-area-inset-bottom) + 16px));z-index:2147483000;display:flex;align-items:flex-end;gap:12px;font-family:inherit}
        .gcLabel{margin-bottom:14px;padding:9px 13px;border:1px solid rgba(53,228,192,.28);border-radius:999px;background:rgba(3,18,17,.9);color:#dffcf4;font-size:12px;font-weight:700;box-shadow:0 12px 35px rgba(0,0,0,.34);backdrop-filter:blur(14px)}
        .gcButton{position:relative;width:62px;height:62px;display:grid;place-items:center;border:1px solid #35e4c0;border-radius:50%;background:radial-gradient(circle at 35% 28%,#123c39,#041817 70%);box-shadow:0 0 0 8px rgba(53,228,192,.06),0 0 36px rgba(53,228,192,.32),0 18px 45px rgba(0,0,0,.48);cursor:pointer;color:white}
        .gcBubble{position:relative;width:29px;height:22px;display:flex;align-items:center;justify-content:center;gap:3px;border-radius:8px;background:#f5fffc}.gcBubble:after{content:"";position:absolute;right:4px;bottom:-5px;width:9px;height:9px;background:#f5fffc;clip-path:polygon(0 0,100% 0,100% 100%)}.gcBubble i{width:3px;height:3px;border-radius:50%;background:#0a3934}.gcStatus{position:absolute;right:3px;bottom:4px;width:13px;height:13px;border:3px solid #061817;border-radius:50%;background:#35e4a6;box-shadow:0 0 12px rgba(53,228,166,.8)}.gcClose{font-size:27px;line-height:1}
        .gcPanel{position:absolute;right:0;bottom:78px;width:min(390px,calc(100vw - 28px));height:min(610px,calc(100vh - 120px));display:grid;grid-template-rows:auto 1fr auto auto auto;border:1px solid rgba(53,228,192,.2);border-radius:20px;overflow:hidden;background:linear-gradient(180deg,rgba(5,18,19,.98),rgba(2,9,10,.99));box-shadow:0 35px 90px rgba(0,0,0,.55);backdrop-filter:blur(22px)}
        header{display:flex;justify-content:space-between;align-items:center;padding:17px 18px;border-bottom:1px solid rgba(255,255,255,.07)}header>div{display:flex;align-items:center;gap:10px}header strong,header small{display:block}header strong{font-size:13px;color:#e9f5f2}header small{margin-top:3px;font-size:9px;color:#718681}header button{border:0;background:transparent;color:#899c98;font-size:22px;cursor:pointer}.gcDot{width:9px;height:9px;border-radius:50%;background:#35e4c0;box-shadow:0 0 12px rgba(53,228,192,.65)}
        .gcMessages{padding:18px;overflow-y:auto;display:flex;flex-direction:column;gap:11px}.gcMsg{display:flex}.gcMsg span{max-width:86%;padding:11px 13px;border-radius:14px;font-size:12px;line-height:1.55;white-space:pre-wrap}.gcMsg.assistant{justify-content:flex-start}.gcMsg.assistant span{background:#0a1718;border:1px solid rgba(255,255,255,.07);color:#c5d3cf}.gcMsg.user{justify-content:flex-end}.gcMsg.user span{background:#35e4c0;color:#03100e;font-weight:650}
        .gcTyping{display:flex!important;gap:4px}.gcTyping i{width:5px;height:5px;border-radius:50%;background:#78918b;animation:gcBlink 1.2s infinite}.gcTyping i:nth-child(2){animation-delay:.15s}.gcTyping i:nth-child(3){animation-delay:.3s}@keyframes gcBlink{0%,80%,100%{opacity:.25}40%{opacity:1}}
        .gcActions{display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:0 14px 10px}.gcActions button,.gcActions a{border:1px solid rgba(53,228,192,.18);border-radius:9px;background:rgba(53,228,192,.04);color:#8edccb;padding:7px 9px;font-size:9px;text-decoration:none;cursor:pointer}
        form{display:grid;grid-template-columns:1fr 42px;gap:8px;padding:12px 14px;border-top:1px solid rgba(255,255,255,.07)}form input{min-width:0;padding:12px 13px;border:1px solid rgba(255,255,255,.1);border-radius:11px;background:#061112;color:#eef8f5;font:inherit;font-size:12px;outline:none}form input:focus{border-color:rgba(53,228,192,.55)}form button{border:0;border-radius:11px;background:#35e4c0;color:#03100e;font-size:20px;font-weight:900;cursor:pointer}form button:disabled{opacity:.35;cursor:not-allowed}.gcRisk{margin:0;padding:0 15px 13px;color:#536762;font-size:8px;line-height:1.5}
        @media(max-width:700px){.gcWrap{right:max(10px,env(safe-area-inset-right));bottom:max(12px,calc(env(safe-area-inset-bottom) + 8px));gap:7px}.gcButton{width:54px;height:54px}.gcLabel{display:none}.gcPanel{bottom:67px;width:calc(100vw - 20px);height:min(620px,calc(100vh - 96px))}}
      `}</style>
    </div>
  );
}
