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
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: markets.map((market) => [market.title, `${market.symbol}|1D`]),
      chartOnly: true,
      width: "100%",
      height: "100%",
      locale: "en",
      colorTheme: "dark",
      autosize: true,
      isTransparent: true,
      chartType: "area",
      lineWidth: 3,
      lineType: 0,
      dateRanges: ["1d|1", "5d|5", "1m|30"],
      hideDateRanges: true,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: "right",
      scaleMode: "Normal",
      valuesTracking: "1",
      changeMode: "price-and-percent",
      backgroundColor: "rgba(0,0,0,0)",
      gridLineColor: "rgba(255,255,255,0.045)",
      widgetFontColor: "#dce9e5",
      upColor: "#35e4c0",
      downColor: "#f15f74",
    });

    container.appendChild(widget);
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="live-market-shell" aria-label="Live market overview">
      <div className="live-market-head">
        <div>
          <span>LIVE MARKET INTELLIGENCE</span>
          <h2>Markets in motion.</h2>
        </div>
        <p>Real market prices supplied by TradingView. Some instruments may be delayed according to exchange data rules.</p>
      </div>

      <div className="live-market-chart">
        <div ref={containerRef} className="tradingview-widget-container" />
      </div>

      <div className="market-card-track">
        {markets.map((market, index) => (
          <a
            href={`https://www.tradingview.com/symbols/${market.symbol.replace(":", "-")}/`}
            target="_blank"
            rel="noreferrer"
            className="market-card"
            key={market.title}
          >
            <span className="market-icon">{index + 1}</span>
            <span>
              <b>{market.title}</b>
              <small>{market.subtitle}</small>
            </span>
          </a>
        ))}
      </div>

      <style jsx>{`
        .live-market-shell{width:min(1180px,calc(100% - 40px));margin:20px auto 0;padding:28px;border:1px solid rgba(255,255,255,.09);border-radius:30px;background:radial-gradient(circle at 50% 12%,rgba(35,235,200,.18),transparent 38%),linear-gradient(180deg,#073233 0%,#031817 100%);box-shadow:0 40px 100px rgba(0,0,0,.38);overflow:hidden}.live-market-head{display:flex;align-items:end;justify-content:space-between;gap:35px;margin-bottom:22px}.live-market-head span{font-size:10px;letter-spacing:.2em;color:#35e4c0}.live-market-head h2{font-size:clamp(34px,5vw,62px);line-height:1;margin:10px 0 0;letter-spacing:-.055em}.live-market-head p{max-width:430px;color:#93a5a2;line-height:1.6;font-size:13px}.live-market-chart{height:430px;border:1px solid rgba(255,255,255,.08);border-radius:22px;overflow:hidden;background:rgba(0,9,9,.45)}.tradingview-widget-container{height:100%;width:100%}.market-card-track{display:grid;grid-template-columns:repeat(5,minmax(220px,1fr));gap:14px;margin-top:18px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin}.market-card{min-width:220px;display:flex;align-items:center;gap:16px;padding:22px;border:1px solid rgba(255,255,255,.11);border-radius:19px;background:linear-gradient(145deg,rgba(13,42,40,.92),rgba(5,19,18,.9));transition:.25s}.market-card:hover{transform:translateY(-3px);border-color:rgba(53,228,192,.45)}.market-icon{width:50px;height:50px;border-radius:14px;display:grid;place-items:center;background:#0c3442;color:white;font-weight:800}.market-card b,.market-card small{display:block}.market-card b{font-size:18px;letter-spacing:.04em}.market-card small{margin-top:7px;color:#91a09e;font-size:12px}@media(max-width:760px){.live-market-shell{width:min(100% - 24px,1180px);padding:16px;border-radius:22px}.live-market-head{display:block}.live-market-head p{margin-top:14px}.live-market-chart{height:350px}.market-card-track{grid-template-columns:repeat(5,220px)}}
      `}</style>
    </section>
  );
}
