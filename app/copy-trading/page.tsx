import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const telegram = "https://t.me/Gencou_bot";

const steps = [
  ["Start onboarding", "Open the Gencouv onboarding bot and answer a few questions about your broker, experience, objectives and risk tolerance."],
  ["Connect a supported broker", "Gencouv currently supports HFM and Lirunex. Your funds remain in your own broker account."],
  ["Review your profile", "We explain the available trading profiles, expected volatility and possible drawdown before activation."],
  ["Begin copy trading", "Eligible trades are copied automatically according to the profile and risk settings selected during onboarding."],
];

const profiles = [
  { name: "Gencouv Core", range: "Up to 15%–25% monthly", label: "Measured growth profile", text: "Designed for clients seeking a more controlled approach, with lower strategy intensity and drawdown settings selected around their risk tolerance.", points: ["Lower relative strategy intensity", "Risk settings reviewed during onboarding", "Suitable for clients prioritising a steadier approach"], start: "core_profile" },
  { name: "Gencouv Alpha", range: "Up to 30%–50% monthly", label: "Higher-growth profile", text: "Designed for clients who accept higher volatility and potentially deeper drawdowns in pursuit of a more aggressive return objective.", points: ["Higher strategy intensity", "Greater fluctuation and drawdown potential", "Requires stronger risk tolerance"], start: "alpha_profile" },
];

export default function CopyTradingPage() {
  return (
    <main>
      <nav className="nav shell"><a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a><div className="links"><a href="/">Home</a><a href="#how-it-works">How it works</a><a href="#profiles">Profiles</a><a href="/marketplace">Marketplace</a></div><a className="navCta" href={`${telegram}?start=copy_trading`} target="_blank" rel="noreferrer">Get started</a></nav>

      <section className="infoHero shell"><div className="eyebrow left">GENCOUV COPY TRADING</div><h1>Choose a strategy profile that fits your tolerance.</h1><p>Connect an HFM or Lirunex account, complete guided onboarding and copy eligible Gencouv strategy activity while keeping control of your broker account.</p><div className="heroActions"><a className="primary" href={`${telegram}?start=copy_trading`} target="_blank" rel="noreferrer">Check copy-trading eligibility ↗</a><a className="secondary" href="#support">Contact support</a></div></section>

      <section id="how-it-works" className="section shell"><div className="sectionHead"><div><div className="eyebrow left">GETTING STARTED</div><h2>A guided process from interest to activation.</h2></div><p>The onboarding process is designed to assess broker compatibility, experience and risk tolerance before any profile is selected.</p></div><div className="knowledgeGrid">{steps.map(([title, description], index) => <article className="knowledgeCard" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section id="profiles" className="section shell"><div className="sectionHead"><div><div className="eyebrow left">TRADING PROFILES</div><h2>Two return objectives, with different risk characteristics.</h2></div><p>Return ranges are objectives only, not promises or forecasts. Actual performance may be lower, negative or materially different because of market conditions, execution, fees, slippage and selected risk settings.</p></div><div className="profileGrid">{profiles.map((profile) => <article className="profile" key={profile.name}><small>{profile.label}</small><h3>{profile.name}</h3><strong className="returnRange">{profile.range}</strong><p>{profile.text}</p><div>{profile.points.map((point) => <span key={point}>✓ {point}</span>)}</div><a href={`${telegram}?start=${profile.start}`} target="_blank" rel="noreferrer">Discuss this profile <b>↗</b></a></article>)}</div></section>

      <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">IMPORTANT RISK NOTICE</div><h2>Higher return objectives generally involve higher risk.</h2></div><p>Foreign exchange, CFDs and leveraged products can produce rapid and substantial losses. Monthly return ranges are objectives only and must not be treated as fixed, expected or predictable income. Drawdown, exposure and execution may differ by account, broker conditions and selected risk settings. Past performance is not a reliable indicator of future results. Gencouv does not hold client funds or guarantee suitability, performance or capital protection. Read the full <a href="/risk-disclosure">Risk Disclosure</a> before onboarding.</p></div></section>

      <section className="finalCta shell"><div className="eyebrow">READY TO BEGIN?</div><h2>Start with the onboarding bot.</h2><p>Answer the suitability questions, confirm whether you use HFM or Lirunex and review the profile that best matches your risk tolerance.</p><a className="primary" href={`${telegram}?start=copy_trading`} target="_blank" rel="noreferrer">Get started <span>↗</span></a></section>

      <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Copy trading, automated systems and market intelligence tools.</p><div><a href="/about">About</a><a href="/copy-trading">Copy trading</a><a href="/marketplace">Marketplace</a><a href="#support">Contact support</a><a href="/terms">Terms</a><a href="/privacy">Privacy Policy</a><a href="/risk-disclosure">Risk Disclosure</a><a href={`${telegram}?start=copy_footer`} target="_blank" rel="noreferrer">Get on board</a></div><small>Supported brokers: HFM and Lirunex. Gencouv does not hold client funds. © 2026 Gencouv. Trading involves substantial risk. Results are not guaranteed.</small></footer>
      <FloatingGencouvChat />

      <style>{`.infoHero{padding:110px 0 70px;max-width:900px}.infoHero h1{font-size:clamp(48px,8vw,92px);line-height:.96;letter-spacing:-.06em;margin:18px 0}.infoHero>p{font-size:19px;line-height:1.7;color:#b8c7c4;max-width:760px}.heroActions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.returnRange{display:block;margin:14px 0;color:#35e4c0;font-size:24px}.profile{min-height:430px}.profile p{min-height:96px}@media(max-width:700px){.infoHero{padding:72px 0 45px}.infoHero h1{font-size:50px}.infoHero>p{font-size:16px}.heroActions a{width:100%;justify-content:center}}`}</style>
    </main>
  );
}