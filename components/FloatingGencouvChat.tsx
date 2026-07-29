"use client";

const TELEGRAM = "https://t.me/Gencou_bot?start=website_floating_chat";

export default function FloatingGencouvChat() {
  return (
    <div className="gencouv-chat-wrap" aria-label="Chat with Gencouv AI">
      <span className="gencouv-chat-label">Chat with Gencouv AI</span>
      <a
        href={TELEGRAM}
        target="_blank"
        rel="noreferrer"
        className="gencouv-chat-button"
        aria-label="Open Gencouv AI on Telegram"
      >
        <span className="gencouv-chat-bubble" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="gencouv-chat-status" aria-hidden="true" />
      </a>

      <style jsx>{`
        .gencouv-chat-wrap {
          position: fixed;
          right: max(20px, env(safe-area-inset-right));
          bottom: max(24px, calc(env(safe-area-inset-bottom) + 16px));
          z-index: 2147483000;
          display: flex;
          align-items: center;
          gap: 14px;
          pointer-events: none;
          isolation: isolate;
        }

        .gencouv-chat-label {
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
          pointer-events: auto;
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

        @keyframes chatPulse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @media (max-width: 700px) {
          .gencouv-chat-wrap {
            right: max(14px, env(safe-area-inset-right));
            bottom: max(18px, calc(env(safe-area-inset-bottom) + 12px));
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
            max-width: 138px;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 10px;
            padding: 8px 10px;
          }
        }

        @media (max-width: 390px) {
          .gencouv-chat-label {
            display: none;
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
