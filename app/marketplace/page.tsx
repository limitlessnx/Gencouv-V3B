import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const telegram = "https://t.me/GENCOUV";

const products = [
  {
    slug: "sixtynine",
    name: "SixtyNine EA MT5 v1.30",
    label: "GOLD AUTOMATION · MT5",
    price: "$2,000",
    description: "Gold-focused automated trading software with six integrated strategy layers, configurable risk profiles and structured trade management.",
    tags: ["XAUUSD", "H1 / H4", "6 strategies", "ECN / RAW"],
    proof: "Live-signal material supplied",
  },
  {
    slug: "quantum-queen",
    name: "Quantum Queen MT5 EA v3.52",
    label: "EXPERT ADVISOR · MT5",
    price: "$2,000",
    description: "XAUUSD Expert Advisor with internal timeframe management. The supplied MT5 Strategy Tester report records 208 trades over the tested 2026 period.",
    tags: ["XAUUSD", "MT5", "208 test trades", "98% history quality"],
    proof: "MT5 backtest report supplied",
  },
];

export default function MarketplacePage() {
  return <main>
    <nav className="nav shell"><a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a><div className="links"><a href="/">Home</a><a href="/portfolio-management">Portfolio Management</a><a href="#products">Products</a><a href="/risk-disclosure">Risk</a></div><a className="navCta" href={telegram} target="_blank" rel="noreferrer">Gencouv Support</a></nav>

    <section className="marketHero shell"><div className="eyebrow left">GENCOUV MARKETPLACE</div><h1>Trading systems.<br/>Real product pages.</h1><p>Browse Gencouv Marketplace software, inspect the supplied evidence and technical requirements, then purchase through the product's dedicated checkout. Marketplace software is separate from Gencouv portfolio management.</p></section>

    <section id="products" className="section shell">
      <div className="sectionHead"><div><div className="eyebrow left">PRODUCT CATALOG</div><h2>Expert Advisors</h2></div><p>Each product now has its own detail page instead of forcing humans to decipher one enormous marketplace wall of text. Civilization advances.</p></div>
      <div className="productGrid">
        {products.map((product, index)=><article className="productCard" key={product.slug}>
          <a className="productVisual" href={`/marketplace/${product.slug}`}>
            <span className="productIndex">0{index+1}</span>
            <div className={`productMark ${product.slug}`}><span>{product.slug==="sixtynine"?"69":"Q"}</span></div>
            <small>{product.label}</small>
          </a>
          <div className="productBody"><div className="productTop"><div><span className="status">AVAILABLE</span><h3>{product.name}</h3></div><strong>{product.price}</strong></div><p>{product.description}</p><div className="tags">{product.tags.map(tag=><span key={tag}>{tag}</span>)}</div><div className="proof">✓ {product.proof}</div><div className="actions"><a className="primary" href={`/marketplace/${product.slug}`}>View Product</a><a className="secondary" href={`/checkout/${product.slug}`}>Buy Now · {product.price}</a></div></div>
        </article>)}
      </div>
    </section>

    <section className="marketInfo shell"><div><span>01</span><h3>Review before purchase</h3><p>Product pages separate verified technical information, supplied historical material and risk disclosures from marketing claims.</p></div><div><span>02</span><h3>Secure checkout</h3><p>Purchases use Gencouv's server-side checkout flow. Product price is determined by the server, not by browser input.</p></div><div><span>03</span><h3>Trading risk remains</h3><p>Backtests and historical signals describe past test or trading conditions. They cannot guarantee future profitability.</p></div></section>

    <section className="finalCta shell"><div className="eyebrow">PRODUCT SUPPORT</div><h2>Need compatibility or setup help?</h2><p>Speak directly with Gencouv before purchasing if you are unsure about platform, broker or account requirements.</p><a className="primary" href={telegram} target="_blank" rel="noreferrer">Contact Gencouv ↗</a></section>
    <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Portfolio management, automated trading systems and market intelligence tools.</p><div><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/marketplace">Marketplace</a><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/risk-disclosure">Risk Disclosure</a></div><small>Marketplace products are separate from portfolio management. © 2026 Gencouv. Trading products involve substantial risk and do not guarantee profit.</small></footer><FloatingGencouvChat />

    <style>{`.marketHero{padding:120px 0 75px;max-width:1050px}.marketHero h1{font-size:clamp(58px,9vw,108px);line-height:.9;letter-spacing:-.065em;margin:18px 0}.marketHero p{font-size:19px;line-height:1.7;color:#b8c7c4;max-width:760px}.productGrid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.productCard{overflow:hidden;border:1px solid rgba(53,228,192,.16);border-radius:28px;background:linear-gradient(145deg,rgba(7,31,31,.9),rgba(3,12,14,.98))}.productVisual{position:relative;min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;background:radial-gradient(circle at 50% 35%,rgba(53,228,192,.15),transparent 42%),#02090b;border-bottom:1px solid rgba(255,255,255,.07)}.productVisual small{color:#718a85;letter-spacing:.2em;font-size:10px}.productIndex{position:absolute;top:24px;left:26px;color:#54706a;font-size:12px;letter-spacing:.14em}.productMark{width:150px;height:150px;border:1px solid rgba(53,228,192,.3);border-radius:50%;display:grid;place-items:center;box-shadow:0 0 60px rgba(53,228,192,.12),inset 0 0 30px rgba(53,228,192,.06)}.productMark span{font-size:68px;font-weight:950;letter-spacing:-.08em;color:#e9fffa}.productMark.quantum-queen{border-radius:34px;transform:rotate(45deg)}.productMark.quantum-queen span{transform:rotate(-45deg);font-size:82px;color:#35e4c0}.productBody{padding:30px}.productTop{display:flex;justify-content:space-between;gap:20px;align-items:start}.productTop h3{font-size:29px;line-height:1.05;margin:8px 0 0;letter-spacing:-.035em}.productTop>strong{font-size:28px}.status{font-size:9px;letter-spacing:.16em;color:#35e4c0;font-weight:900}.productBody>p{color:#9fb0ad;line-height:1.7;min-height:84px}.tags{display:flex;flex-wrap:wrap;gap:7px;margin:22px 0}.tags span{padding:8px 10px;border:1px solid rgba(255,255,255,.08);border-radius:100px;color:#9fb0ad;font-size:10px}.proof{padding:13px 0;border-top:1px solid rgba(255,255,255,.07);color:#35e4c0;font-size:12px}.actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:18px}.marketInfo{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding-bottom:100px}.marketInfo>div{padding:28px;border:1px solid rgba(255,255,255,.07);border-radius:20px}.marketInfo span{color:#35e4c0;font-size:11px}.marketInfo h3{margin:14px 0 8px}.marketInfo p{color:#849693;font-size:13px;line-height:1.65}@media(max-width:850px){.productGrid,.marketInfo{grid-template-columns:1fr}.productBody>p{min-height:0}}@media(max-width:700px){.marketHero{padding:72px 0 45px}.marketHero h1{font-size:52px}.marketHero p{font-size:16px}.productVisual{min-height:290px}.productTop{display:block}.productTop>strong{display:block;margin-top:15px}}`}</style>
  </main>;
}
