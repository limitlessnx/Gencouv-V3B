import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const telegram = "https://t.me/Gencou_bot";
const features = [
  "6 integrated strategy layers with distinct entry and trade-management parameters",
  "Public live-signal history showing growth and drawdown behavior",
  "Core strategy logic used personally for more than 3 years",
  "Custom set files for account size, risk level and trading preferences",
  "Conservative challenge-style risk profiles available",
  "Buy and sell Gold market logic without simultaneous opposite hedging",
  "Take Profit, Stop Loss and Trailing Stop protection",
  "No Grid, Martingale, Recovery system or position multiplication",
  "Optimized specifically for Gold (XAUUSD)",
  "Flexible trading schedule with configurable days and hours"
];

export default function MarketplacePage() {
  return <main>
    <nav className="nav shell"><a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a><div className="links"><a href="/">Home</a><a href="/portfolio-management">Portfolio Management</a><a href="#catalog">Catalog</a><a href="#support">Support</a></div><a className="navCta" href="/portfolio-management">Explore portfolio management</a></nav>
    <section className="marketHero shell"><div className="eyebrow left">GENCOUV MARKETPLACE</div><h1>Trading tools built for systematic participation.</h1><p>Explore Gencouv Expert Advisors, indicators and trading utilities. Marketplace products are separate from Gencouv portfolio-management services.</p></section>

    <section id="catalog" className="section shell">
      <div className="sectionHead"><div><div className="eyebrow left">EXPERT ADVISOR · MT5</div><h2>SixtyNine EA MT5 v1.30</h2></div><div className="price">$2,000</div></div>
      <article className="eaCard">
        <div className="eaIntro">
          <div><span className="productType">GOLD · XAUUSD · H1 / H4</span><h3>Live-tested Gold automation with six integrated strategy layers.</h3></div>
          <p>The public live signal is a central proof point presented for SixtyNine EA. The referenced account started with a $500 balance, used a fixed 0.02 lot size per trade and has been active for more than 20 weeks of live trading. The supplied material reports more than 500% total growth during that period, alongside approximately 20% drawdown.</p>
          <p>SixtyNine EA is designed specifically for Gold (XAUUSD) trading on MetaTrader 5. Six integrated strategy layers analyze market movement, manage entries and exits and execute trades through a structured rules-based approach. Every trade uses predefined Stop Loss protection, and the EA does not use Martingale, Recovery systems, Grid trading or position multiplication techniques.</p>
        </div>

        <div className="statsGrid">
          <div><span>Symbol</span><strong>XAUUSD</strong></div><div><span>Timeframe</span><strong>H1 / H4</strong></div><div><span>Minimum deposit</span><strong>$300</strong></div><div><span>Recommended</span><strong>$1,000+</strong></div><div><span>Strategy layers</span><strong>6</strong></div><div><span>Broker type</span><strong>ECN / RAW</strong></div>
        </div>

        <div className="detailGrid"><div><div className="eyebrow left">WHAT MAKES IT DIFFERENT</div><h3>Built around transparency and configurable risk.</h3><div className="featureList">{features.map(feature=><div key={feature}><b>✓</b><span>{feature}</span></div>)}</div></div><aside><div className="signalBox"><span>PUBLIC LIVE SIGNAL</span><strong>500%+</strong><p>Reported total growth from the supplied public-signal material, from a $500 starting balance using fixed 0.02 lots over 20+ weeks.</p></div><div className="signalBox"><span>VISIBLE RISK</span><strong>~20%</strong><p>Approximate drawdown shown in the supplied live-signal material. Lower lot settings and conservative set files may reduce exposure, but cannot eliminate trading risk.</p></div></aside></div>

        <div className="specBox"><h3>Recommended environment</h3><div><span><b>Platform</b> MetaTrader 5</span><span><b>Symbol</b> Gold (XAUUSD)</span><span><b>Timeframe</b> H1 or H4</span><span><b>Minimum deposit</b> $300 for very small-lot/testing profiles</span><span><b>Recommended deposit</b> $1,000 or higher for more balanced use</span><span><b>Broker</b> Reliable ECN/RAW spread broker recommended</span></div></div>

        <div className="productRisk"><b>Performance & risk notice</b><span>The figures above describe supplied historical/live-signal material and are not a promise of future performance. Trading results can vary materially because of market conditions, lot sizing, broker execution, spreads, slippage, connectivity and configuration. Trading leveraged products can result in substantial losses. Review the full <a href="/risk-disclosure">Risk Disclosure</a>.</span></div>
        <div className="productActions"><button className="primary" type="button" disabled>Purchase · $2,000</button><a className="secondary" href={`${telegram}?start=sixtynine_ea`} target="_blank" rel="noreferrer">Ask Gencouv Support ↗</a></div>
      </article>
    </section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">MORE TOOLS</div><h2>More products are coming.</h2></div><p>Indicators and trading utilities will be added as they pass product, documentation and delivery checks.</p></div></section>
    <section className="finalCta shell"><div className="eyebrow">NEED HELP?</div><h2>Speak with Gencouv Support.</h2><p>For compatibility, setup, risk-profile questions or current services, open the website support chat.</p><a className="primary" href="#support">Contact support</a></section>
    <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Portfolio management, automated trading systems and market intelligence tools.</p><div><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/marketplace">Marketplace</a><a href="#support">Contact support</a><a href="/terms">Terms</a><a href="/privacy">Privacy Policy</a><a href="/risk-disclosure">Risk Disclosure</a></div><small>Marketplace products are separate from portfolio management. © 2026 Gencouv. Trading products involve risk and do not guarantee profit.</small></footer><FloatingGencouvChat />
    <style>{`.marketHero{padding:120px 0 75px;max-width:980px}.marketHero h1{font-size:clamp(54px,9vw,100px);line-height:.94;letter-spacing:-.065em;margin:18px 0}.marketHero p{font-size:19px;line-height:1.7;color:#b8c7c4;max-width:780px}.price{font-size:clamp(38px,6vw,68px);font-weight:900;letter-spacing:-.05em}.eaCard{padding:clamp(24px,5vw,55px);border:1px solid rgba(53,228,192,.2);border-radius:28px;background:linear-gradient(135deg,rgba(10,42,40,.92),rgba(4,15,17,.96));box-shadow:0 25px 80px rgba(0,0,0,.24)}.eaIntro{max-width:900px}.productType{font-size:11px;font-weight:800;letter-spacing:.18em;color:#35e4c0}.eaIntro h3,.detailGrid h3,.specBox h3{font-size:clamp(28px,4vw,48px);line-height:1.05;margin:14px 0 22px}.eaIntro p{font-size:16px;line-height:1.8;color:#b8c7c4}.statsGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:38px 0}.statsGrid div{padding:18px;border:1px solid rgba(255,255,255,.08);border-radius:14px}.statsGrid span{display:block;color:#81908e;font-size:11px;text-transform:uppercase;letter-spacing:.12em}.statsGrid strong{display:block;font-size:19px;margin-top:7px}.detailGrid{display:grid;grid-template-columns:1.5fr .7fr;gap:40px;padding:45px 0;border-top:1px solid rgba(255,255,255,.08)}.featureList{display:grid;gap:10px}.featureList div{display:flex;gap:12px;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.06);color:#d7e1df;line-height:1.5}.featureList b{color:#35e4c0}.signalBox{padding:24px;border:1px solid rgba(53,228,192,.18);border-radius:18px;margin-bottom:14px;background:rgba(53,228,192,.04)}.signalBox span{font-size:10px;letter-spacing:.15em;color:#35e4c0;font-weight:800}.signalBox strong{display:block;font-size:48px;margin:8px 0}.signalBox p{color:#91a09e;line-height:1.6;font-size:13px}.specBox{padding:30px;border-radius:20px;background:rgba(255,255,255,.035)}.specBox h3{font-size:28px}.specBox>div{display:grid;grid-template-columns:1fr 1fr;gap:12px}.specBox span{color:#a9b8b5;padding:10px 0}.specBox b{color:#fff;display:block;font-size:11px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px}.productRisk{margin-top:28px;padding:18px;border-left:2px solid #35e4c0;background:rgba(53,228,192,.045);display:grid;gap:7px;font-size:12px;line-height:1.7;color:#8fa09d}.productRisk b{color:#35e4c0}.productRisk a{color:#35e4c0}.productActions{display:flex;gap:12px;margin-top:25px;flex-wrap:wrap}.productActions button{border:0;cursor:not-allowed;opacity:.55}@media(max-width:850px){.detailGrid{grid-template-columns:1fr}.statsGrid{grid-template-columns:1fr 1fr}.specBox>div{grid-template-columns:1fr}}@media(max-width:700px){.marketHero{padding:72px 0 45px}.marketHero h1{font-size:52px}.marketHero p{font-size:16px}.statsGrid{grid-template-columns:1fr}.sectionHead{align-items:flex-start}.price{font-size:42px}}`}</style>
  </main>;
}
