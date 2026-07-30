import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const categories = [
  ["Expert Advisors", "Automated trading systems for compatible MetaTrader environments."],
  ["Indicators", "Market-analysis tools for structure, momentum and decision support."],
  ["Trading Utilities", "Tools for position sizing, journaling and workflow improvement."],
];

export default function MarketplacePage() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a>
        <div className="links"><a href="/">Home</a><a href="/copy-trading">Copy trading</a><a href="#catalog">Catalog</a><a href="#support">Support</a></div>
        <a className="navCta" href="/copy-trading">Learn about copy trading</a>
      </nav>

      <section className="marketHero shell">
        <div className="eyebrow left">GENCOUV MARKETPLACE</div>
        <h1>Trading tools are coming soon.</h1>
        <p>The Gencouv marketplace will serve as a catalog for Expert Advisors, indicators and trading utilities. Product pages, pricing and purchase options will be added when the marketplace goes live.</p>
        <div className="comingBadge">COMING SOON</div>
      </section>

      <section id="catalog" className="section shell">
        <div className="sectionHead"><div><div className="eyebrow left">PLANNED CATALOG</div><h2>Built for systematic traders.</h2></div><p>Each listing will include compatibility, intended use, risk information, documentation and support details before purchases are enabled.</p></div>
        <div className="serviceGrid">{categories.map(([title, text], index) => <article className="service pending" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><b>Coming soon</b></article>)}</div>
      </section>

      <section className="finalCta shell"><div className="eyebrow">NEED HELP NOW?</div><h2>Speak with Gencouv Support.</h2><p>For copy trading, broker compatibility or current services, open the website support chat.</p><a className="primary" href="#support">Contact support</a></section>

      <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Copy trading, automated systems and market intelligence tools.</p><div><a href="/copy-trading">Copy trading</a><a href="#support">Contact support</a><a href="/terms">Terms</a></div><small>© 2026 Gencouv. Trading involves substantial risk. Results are not guaranteed.</small></footer>
      <FloatingGencouvChat />

      <style>{`
        .marketHero{padding:120px 0 75px;max-width:900px}.marketHero h1{font-size:clamp(54px,9vw,100px);line-height:.94;letter-spacing:-.065em;margin:18px 0}.marketHero p{font-size:19px;line-height:1.7;color:#b8c7c4;max-width:760px}.comingBadge{display:inline-flex;margin-top:28px;padding:12px 18px;border:1px solid rgba(53,228,192,.35);border-radius:999px;color:#35e4c0;font-size:12px;font-weight:900;letter-spacing:.18em;background:rgba(53,228,192,.06)}.pending{cursor:default}.pending b{color:#35e4c0}@media(max-width:700px){.marketHero{padding:72px 0 45px}.marketHero h1{font-size:52px}.marketHero p{font-size:16px}}
      `}</style>
    </main>
  );
}
