"use client";

const TELEGRAM = "https://t.me/Gencou_bot?start=website_support";

export default function FloatingGencouvChat() {
  return (
    <div className="gencouv-chat-wrap" aria-label="Gencouv support">
      <span className="gencouv-chat-label">Chat with Gencouv Support</span>
      <a
        href={TELEGRAM}
        target="_blank"
        rel="noreferrer"
        className="gencouv-chat-button"
        aria-label="Open Gencouv Support on Telegram"
      >
        <span className="gencouv-chat-bubble" aria-hidden="true"><i /><i /><i /></span>
        <span className="gencouv-chat-status" aria-hidden="true" />
      </a>

      <style jsx>{`
        .gencouv-chat-wrap{position:fixed;right:max(20px,env(safe-area-inset-right));bottom:max(24px,calc(env(safe-area-inset-bottom) + 16px));z-index:2147483000;display:flex;align-items:flex-end;gap:12px;isolation:isolate}
        .gencouv-chat-label{margin-bottom:14px;padding:9px 13px;border:1px solid rgba(53,228,192,.28);border-radius:999px;background:rgba(3,18,17,.88);color:#dffcf4;font-size:12px;font-weight:700;box-shadow:0 12px 35px rgba(0,0,0,.34);backdrop-filter:blur(14px);white-space:nowrap}
        .gencouv-chat-button{position:relative;width:62px;height:62px;display:grid;place-items:center;border:1px solid #35e4c0;border-radius:50%;background:radial-gradient(circle at 35% 28%,#123c39,#041817 70%);box-shadow:0 0 0 8px rgba(53,228,192,.06),0 0 36px rgba(53,228,192,.32),0 18px 45px rgba(0,0,0,.48);cursor:pointer;animation:chatPulse 2.8s ease-in-out infinite;text-decoration:none}
        .gencouv-chat-bubble{position:relative;width:29px;height:22px;display:flex;align-items:center;justify-content:center;gap:3px;border-radius:8px;background:#f5fffc}
        .gencouv-chat-bubble:after{content:"";position:absolute;right:4px;bottom:-5px;width:9px;height:9px;background:#f5fffc;clip-path:polygon(0 0,100% 0,100% 100%)}
        .gencouv-chat-bubble i{width:3px;height:3px;border-radius:50%;background:#0a3934}
        .gencouv-chat-status{position:absolute;right:3px;bottom:4px;width:13px;height:13px;border:3px solid #061817;border-radius:50%;background:#35e4a6;box-shadow:0 0 12px rgba(53,228,166,.8)}
        @keyframes chatPulse{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @media(max-width:700px){.gencouv-chat-wrap{right:max(10px,env(safe-area-inset-right));bottom:max(12px,calc(env(safe-area-inset-bottom) + 8px));gap:7px}.gencouv-chat-button{width:52px;height:52px}.gencouv-chat-bubble{transform:scale(.84)}.gencouv-chat-label{display:none}}
        @media(prefers-reduced-motion:reduce){.gencouv-chat-button{animation:none}}
      `}</style>
    </div>
  );
}
