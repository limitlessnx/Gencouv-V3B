import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const telegram = "https://t.me/Gencou_bot";

const categories = [
  ["Expert Advisors", "Automated trading systems for compatible MetaTrader environments."],
  ["Indicators", "Market-analysis tools for structure, momentum and decision support."],
  ["Trading Utilities", "Tools for position sizing, journaling and workflow improvement."],
];

export default function MarketplacePage() {
  return (
    <main>
      <nav className="nav shell"><a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a><div className="links"><a href="/">Home</a><a href="/copy-trading">Copy trading</a><a href="#catalog">Catalog</a><a href="#support">Support</a></div><a className="navCta" href="/copy-trading">Learn about copy trading</a></nav>

      <section className="marketHero shell"><div className="eyebrow left">GENCOUV MARKETPLACE</div><h1>Trading tools are coming soon.</h1><p>The Gencouv marketplace will serve as a catalog for Expert Advisors, indicators and trading utilities. Product pages, pricing and purchase options will be added when the marketplace goes live.</p><div className="comingBadge">COMING SOON</div></section>

      <section id="catalog" className="section shell"><div className="sectionHead"><div><div className="eyebrow left">PLANNED CATALOG</div><h2>Built for systematic traders.</h2></div><p>Each listing will include platform compatibility, intended use, limitations, risk information, documentation and support details before purchases are enabled.</p></div><div className="serviceGrid">{categories.map(([title, text], index) => <article className="service pending" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><b>Coming soon</b></article>)}</div></section>

      <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">PRODUCT RISK NOTICE</div><h2>Tools support decisions. They do not remove risk.</h2></div><p>Expert Advisors, indicators and trading utilities cannot guarantee profitable outcomes. Software may behave differently because of market conditions, broker execution, spreads, slippage, connectivity, configuration or platform changes. Clients must understand and test each product before live use. Read the full <a href="/risk-disclosure">Risk Disclosure</a>.</p></div></section>

      <section className="finalCta shell"><div className="eyebrow">NEED HELP NOW?</div><h2>Speak with Gencouv Support.</h2><p>For copy trading, broker compatibility or current services, open the website support chat.</p><a className="primary" href="#support">Contact support</a></section>

      <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Copy trading, automated systems and market intelligence tools.</p><div><a href="/about">About</a><a href="/copy-trading">Copy trading</a><a href="/marketplace">Marketplace</a><a href="#support">Contact support</a><a href="/terms">Terms</a><a href="/privacy">Privacy Policy</a><a href="/risk-disclosure">Risk Disclosure</a><a href={`${telegram}?start=marketplace_footer`} target="_blank" rel="noreferrer">Get on board</a></div><small>Supported brokers: HFM and Lirunex. © 2026 Gencouv. Trading products involve risk and do not guarantee profit.</small></footer>
      <FloatingGencouvChat />

      <style>{`.marketHero{padding:120px 0 75px;max-width:900px}.marketHero h1{font-size:clamp(54px,9vw,100px);line-height:.94;letter-spacing:-.065em;margin:18px 0}.marketHero p{font-size:19px;line-height:1.7;color:#b8c7c4;max-width:760px}.comingBadge{display:inline-flex;margin-top:28px;padding:12px 18px;border:1px solid rgba(53,228,192,.35);border-radius:999px;color:#35e4c0;font-size:12px;font-weight:900;letter-spacing:.18em;background:rgba(53,228,192,.06)}.pending{cursor:default}.pending b{color:#35e4c0}@media(max-width:700px){.marketHero{padding:72px 0 45px}.marketHero h1{font-size:52px}.marketHero p{font-size:16px}}`}</style>
    </main>
  );
}