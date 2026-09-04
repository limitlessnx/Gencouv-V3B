"use client";

import { useEffect, useState } from "react";

const links = [
  ["About", "/about"],
  ["Copy trading", "/copy-trading"],
  ["Marketplace", "/marketplace"],
  ["Testimonials", "/testimonials"],
  ["Contact support", "https://t.me/Gencou_bot?start=mobile_support"],
  ["Terms", "/terms"],
  ["Privacy Policy", "/privacy"],
  ["Risk Disclosure", "/risk-disclosure"],
  ["Get on board", "https://t.me/Gencou_bot?start=mobile_menu"],
] as const;

export default function MobileSidebarMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <button
        className="mobile-menu-button"
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`mobile-menu-layer ${open ? "open" : ""}`} aria-hidden={!open}>
        <button className="mobile-menu-backdrop" type="button" aria-label="Close menu" onClick={closeMenu} />
        <aside className="mobile-menu-drawer" aria-label="Site navigation">
          <div className="mobile-menu-head">
            <a className="mobile-menu-brand" href="/" onClick={closeMenu}>
              <span>G</span>
              <div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div>
            </a>
            <button type="button" onClick={closeMenu} aria-label="Close navigation menu">×</button>
          </div>

          <nav>
            {links.map(([label, href]) => {
              const external = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={label === "Get on board" ? "onboard" : undefined}
                >
                  <span>{label}</span><b>↗</b>
                </a>
              );
            })}
          </nav>

          <p>Supported brokers: HFM and Lirunex. Trading involves substantial risk.</p>
        </aside>
      </div>

      <style jsx>{`
        .mobile-menu-button{display:none;position:fixed;top:14px;right:14px;z-index:2147482500;width:46px;height:46px;padding:0;border:1px solid rgba(53,228,192,.3);border-radius:14px;background:rgba(5,12,13,.92);box-shadow:0 14px 35px rgba(0,0,0,.35);backdrop-filter:blur(14px);cursor:pointer}
        .mobile-menu-button span{display:block;width:20px;height:2px;margin:4px auto;border-radius:99px;background:#f3fffb}
        .mobile-menu-layer{position:fixed;inset:0;z-index:2147482600;visibility:hidden;pointer-events:none}
        .mobile-menu-layer.open{visibility:visible;pointer-events:auto}
        .mobile-menu-backdrop{position:absolute;inset:0;width:100%;height:100%;border:0;background:rgba(0,0,0,.66);opacity:0;transition:opacity .22s ease}
        .mobile-menu-layer.open .mobile-menu-backdrop{opacity:1}
        .mobile-menu-drawer{position:absolute;top:0;right:0;width:min(86vw,360px);height:100%;padding:20px 18px calc(24px + env(safe-area-inset-bottom));overflow-y:auto;border-left:1px solid rgba(53,228,192,.18);background:radial-gradient(circle at 85% 5%,rgba(53,228,192,.12),transparent 30%),#060b0d;transform:translateX(102%);transition:transform .24s ease;box-shadow:-25px 0 70px rgba(0,0,0,.5)}
        .mobile-menu-layer.open .mobile-menu-drawer{transform:translateX(0)}
        .mobile-menu-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-bottom:22px;border-bottom:1px solid rgba(255,255,255,.08)}
        .mobile-menu-brand{display:flex;align-items:center;gap:10px}.mobile-menu-brand>span{width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(53,228,192,.24);border-radius:12px;color:#35e4a6;font-weight:900}.mobile-menu-brand b,.mobile-menu-brand small{display:block}.mobile-menu-brand b{font-size:12px;letter-spacing:.18em}.mobile-menu-brand small{margin-top:3px;color:#7f8c98;font-size:7px;letter-spacing:.14em}.mobile-menu-head>button{width:38px;height:38px;border:1px solid rgba(255,255,255,.1);border-radius:50%;background:rgba(255,255,255,.04);color:white;font-size:22px}
        nav{display:grid;margin-top:18px}nav a{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:17px 3px;border-bottom:1px solid rgba(255,255,255,.08);color:#e7eeec;font-size:15px;font-weight:700}nav a b{color:#687680;font-size:13px}nav a.onboard{margin-top:18px;padding:15px 17px;border:0;border-radius:999px;background:#35e4a6;color:#03120d}nav a.onboard b{color:#03120d}.mobile-menu-drawer>p{margin:26px 2px 0;color:#6f7d88;font-size:10px;line-height:1.65}
        @media(max-width:960px){.mobile-menu-button{display:block}}
        @media(prefers-reduced-motion:reduce){.mobile-menu-backdrop,.mobile-menu-drawer{transition:none}}
      `}</style>
    </>
  );
}
