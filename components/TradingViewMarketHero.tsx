"use client";

import { useEffect, useRef } from "react";

const markets = [
  { title: "FOREX", subtitle: "EUR/USD • GBP/JPY", symbol: "OANDA:EURUSD" },
  { title: "METALS", subtitle: "Gold • Silver", symbol: "OANDA:XAUUSD" },
  { title: "ENERGIES", subtitle: "US Oil • UK Oil", symbol: "TVC:USOIL" },
  { title: "INDICES", subtitle: "S&P 500 • Nasdaq 100", symbol: "NASDAQ:NDX" },
  { title: "CRYPTO", subtitle: "Bitcoin • Ethereum", symbol: "COINBASE:BTCUSD" },
];

export default function TradingViewMarketHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.text = JSON.stringify({
      autosize: true,
      symbol: "OANDA:XAUUSD",
      interval: "15",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      calendar: false,
      details: false,
      hotlist: false,
      news: false,
      profile: false,
      hide_legend: false,
      hide_side_toolbar: true,
      save_image: false,
      withdateranges: false,
      support_host: "https://www.tradingview.com",
      backgroundColor: "rgba(0, 16, 15, 1)",
      gridColor: "rgba(255, 255, 255, 0.045)",
      studies: [],
    });

    container.appendChild(widget);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  const movingMarkets = [...markets, ...markets];

  return (
    <section className="live-market-shell" aria-label="Live XAUUSD market chart">
      <div className="live-market-head">
        <div>
          <span>LIVE MARKET INTELLIGENCE</span>
          <h2>Gold never clocks out.</h2>
        </div>
        <p>You might be sleeping. The market does not. And guess what? Our EAs do not sleep either.</p>
      </div>

      <div className="gold-label">
        <div><i /> XAU/USD</div>
        <span>Gold / U.S. Dollar</span>
      </div>

      <div className="live-market-chart">
        <div ref={containerRef} className="tradingview-widget-container" />
      </div>

      <div className="market-strip" aria-label="Other markets">
        <div className="market-strip-track">
          {movingMarkets.map((market, index) => (
            <a
              href={`https://www.tradingview.com/symbols/${market.symbol.replace(":", "-")}/`}
              target="_blank"
              rel="noreferrer"
              className="market-pill"
              key={`${market.title}-${index}`}
            >
              <span>{market.title}</span>
              <small>{market.subtitle}</small>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .live-market-shell{width:min(1120px,calc(100% - 40px));margin:20px auto 0;padding:24px;border:1px solid rgba(255,255,255,.09);border-radius:28px;background:radial-gradient(circle at 50% 5%,rgba(35,235,200,.16),transparent 35%),linear-gradient(180deg,#073233 0%,#031817 100%);box-shadow:0 35px 90px rgba(0,0,0,.35);overflow:hidden}.live-market-head{display:flex;align-items:end;justify-content:space-between;gap:35px;margin-bottom:16px}.live-market-head span{font-size:10px;letter-spacing:.2em;color:#35e4c0}.live-market-head h2{font-size:clamp(32px,4.7vw,56px);line-height:1;margin:9px 0 0;letter-spacing:-.05em}.live-market-head p{max-width:420px;color:#b3c2bf;line-height:1.55;font-size:15px;font-weight:600}.gold-label{display:flex;align-items:center;justify-content:space-between;margin:8px 2px 12px;color:#dbe8e5;font-size:12px}.gold-label div{display:flex;align-items:center;gap:8px;font-weight:800;letter-spacing:.08em}.gold-label i{width:7px;height:7px;border-radius:50%;background:#35e4c0;box-shadow:0 0 14px #35e4c0}.gold-label span{color:#7f9691}.live-market-chart{height:320px;border:1px solid rgba(255,255,255,.08);border-radius:20px;overflow:hidden;background:#00100f}.tradingview-widget-container,.tradingview-widget-container__widget{height:100%;width:100%}.market-strip{margin-top:14px;overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)}.market-strip-track{display:flex;width:max-content;gap:10px;animation:marketFlow 28s linear infinite}.market-strip:hover .market-strip-track{animation-play-state:paused}.market-pill{display:flex;align-items:center;gap:11px;white-space:nowrap;padding:10px 14px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(6,27,25,.82)}.market-pill span{font-size:11px;font-weight:850;letter-spacing:.08em}.market-pill small{font-size:10px;color:#839692}@keyframes marketFlow{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media(max-width:760px){.live-market-shell{width:min(100% - 24px,1120px);padding:15px;border-radius:22px}.live-market-head{display:block}.live-market-head p{margin:13px 0 0;font-size:14px}.live-market-head h2{font-size:38px}.gold-label{margin-top:18px}.live-market-chart{height:280px}.market-strip-track{animation-duration:22s}.market-pill{padding:9px 12px}.market-pill small{font-size:9px}}
      `}</style>
    </section>
  );
}
