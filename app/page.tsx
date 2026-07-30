import "./copy-hero.css";
import TradingViewMarketHero from "@/components/TradingViewMarketHero";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const telegram = "https://t.me/Gencou_bot";

const benefits = [
  ["Rule-based participation", "Automated systems follow predefined conditions instead of reacting impulsively to every candle, headline or temporary market move."],
  ["Consistent execution", "An Expert Advisor can monitor eligible opportunities, apply configured position rules and execute without requiring the trader to remain in front of a screen."],
  ["Structured risk controls", "Trade size, stop-loss logic, exposure limits, trading hours and daily safeguards can be built into the strategy configuration."],
  ["Measurable decisions", "Automated trading creates records that can be reviewed, tested and improved instead of relying on memory, instinct or emotional interpretation."],
];

const copySteps = [
  ["Connect a supported broker", "Use an HFM or Lirunex trading account. Your funds remain with your broker throughout the process."],
  ["Complete guided onboarding", "Tell us about your experience, objectives and risk tolerance so we can assess suitability."],
  ["Select an eligible profile", "Review the available strategy profile, its operating approach and the risks involved before activation."],
  ["Mirror eligible trades", "Once connected, eligible strategy activity is copied automatically according to your selected profile."],
];

const profiles = [
  { name: "Gencouv Core", label: "Measured participation", description: "Designed for clients who prefer more controlled market exposure, lower strategy intensity and a steadier automation framework.", items: ["Systematic execution", "Defined risk parameters", "Broker-platform monitoring"], start: "core_profile" },
  { name: "Gencouv Alpha", label: "Higher-intensity participation", description: "Designed for experienced clients who understand that increased opportunity frequency can also produce larger fluctuations and drawdowns.", items: ["Automated execution", "Higher market activity", "Enhanced risk awareness required"], start: "alpha_profile" },
];

export default function Home() {
  return <main>
    <nav className="nav shell">
      <a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a>
      <div className="links"><a href="/about">About</a><a href="/copy-trading">Copy trading</a><a href="#education">Why automation</a><a href="/marketplace">Marketplace</a><a href="/testimonials">Testimonials</a><a href="/terms">Terms</a></div>
      <a className="navCta" href={`${telegram}?start=website`} target="_blank" rel="noreferrer">Get started</a>
    </nav>

    <section className="copyHero shell">
      <div className="copyHeroText">
        <div className="copyPill">AI-ASSISTED COPY TRADING</div>
        <h1>Follow the strategy.<br/><em>Keep control of your account.</em></h1>
        <p>Connect an HFM or Lirunex account and mirror eligible Gencouv strategies automatically. Your capital remains in your own broker account while trades are copied according to your selected risk profile.</p>
        <div className="copyHeroActions"><a className="copyPrimary" href={`${telegram}?start=copy_trading`} target="_blank" rel="noreferrer">Check copy-trading eligibility <span>↗</span></a><a className="secondary" href="/copy-trading">Learn more</a></div>
        <div className="copyProof"><span><b>HFM & Lirunex</b><small>Supported partner brokers</small></span><span><b>Your account</b><small>Funds remain with your broker</small></span><span><b>Guided setup</b><small>Suitability review before activation</small></span></div>
      </div>

      <div className="copyHeroVisual" aria-label="Illustration of copy trading between a lead strategy and connected client accounts">
        <div className="copyChart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="copyNetwork"><span className="copyNode lead">G</span><span className="copyNode n1">1</span><span className="copyNode n2">2</span><span className="copyNode n3">3</span><span className="copyNode n4">4</span><span className="copyLine l1"/><span className="copyLine l2"/><span className="copyLine l3"/><span className="copyLine l4"/></div>
        <div className="copyPhone"><div className="phoneTop"><span>GENCOUV COPY</span><b>LIVE</b></div><div className="phoneAccount"><small>Connected strategy</small><strong>Gencouv Core</strong></div><div className="phoneGraph"><svg viewBox="0 0 320 130" preserveAspectRatio="none" aria-hidden="true"><path d="M0 106 C28 96 35 72 58 79 S92 103 116 61 S154 48 174 70 S207 72 226 42 S268 58 320 14"/></svg></div><div className="phoneStats"><span><small>Status</small><b>Copying</b></span><span><small>Risk profile</small><b>Core</b></span></div><a href={`${telegram}?start=copy_trading`} target="_blank" rel="noreferrer">Start eligibility review</a></div>
        <div className="copyBadge green">COPY</div><div className="copyBadge blue">TRADE</div>
      </div>
    </section>

    <section id="copy-trading" className="section shell"><div className="sectionHead"><div><div className="eyebrow left">HOW COPY TRADING WORKS</div><h2>A guided route from broker account to strategy activation.</h2></div><p>Gencouv currently supports HFM and Lirunex. We guide each prospective client through broker compatibility, suitability and risk-profile review before any strategy is activated.</p></div><div className="knowledgeGrid">{copySteps.map(([title,description],i)=><article className="knowledgeCard" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><div className="copyHeroActions" style={{marginTop: "28px"}}><a className="copyPrimary" href={`${telegram}?start=get_started`} target="_blank" rel="noreferrer">Get started <span>↗</span></a><a className="secondary" href="/copy-trading">Learn more</a><a className="secondary" href="#support">Contact support</a></div></section>

    <TradingViewMarketHero />

    <section id="education" className="section shell"><div className="sectionHead"><div><div className="eyebrow left">WHY AUTOMATED TRADING</div><h2>Automation turns a trading plan into repeatable execution.</h2></div><p>It does not remove market risk or guarantee profit. Its value is discipline: monitoring conditions, applying rules and reducing avoidable decision errors caused by fear, greed, hesitation and overtrading.</p></div><div className="knowledgeGrid">{benefits.map(([title,description],i)=><article className="knowledgeCard" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="band"><div className="shell split"><div><div className="eyebrow left">HOW AN EA WORKS</div><h2>A strategy becomes executable software.</h2><p className="lead">An Expert Advisor, commonly called an EA, is software that operates within a compatible trading platform such as MetaTrader 5. It observes market data and responds when its programmed conditions are met.</p></div><div className="steps"><article><span>01</span><div><h3>Market observation</h3><p>The EA continuously checks price, time, volatility or indicator conditions defined by its strategy.</p></div></article><article><span>02</span><div><h3>Rule validation</h3><p>Before acting, it confirms that entry, exposure and risk conditions match the configured logic.</p></div></article><article><span>03</span><div><h3>Execution and management</h3><p>When conditions qualify, the system can place, manage or close trades according to its programmed rules.</p></div></article></div></div></section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">AUTOMATION PROFILES</div><h2>Choose an approach that matches your tolerance.</h2></div><p>Suitability matters more than excitement. Every client should understand expected fluctuations, strategy limits and the possibility of loss before activation.</p></div><div className="profileGrid">{profiles.map(p=><article className="profile" key={p.name}><small>{p.label}</small><h3>{p.name}</h3><p>{p.description}</p><div>{p.items.map(x=><span key={x}>✓ {x}</span>)}</div><a href="/copy-trading">Learn more <b>↗</b></a></article>)}</div></section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">GENCOUV MARKETPLACE</div><h2>Tools built for systematic participation.</h2></div><p>Browse Expert Advisors, market indicators and trading utilities with clear explanations of their role, configuration and intended user.</p></div><div className="serviceGrid"><a className="service" href="/marketplace"><span>01</span><h3>Expert Advisors</h3><p>Automated strategies for compatible MetaTrader environments, with defined execution and risk parameters.</p><b>View marketplace ↗</b></a><a className="service" href="/marketplace"><span>02</span><h3>AI-assisted indicators</h3><p>Decision-support tools that help identify structure, momentum, liquidity and changing market conditions.</p><b>View marketplace ↗</b></a><a className="service" href="/marketplace"><span>03</span><h3>Trading utilities</h3><p>Position-sizing, journaling and analysis tools that improve process quality and accountability.</p><b>View marketplace ↗</b></a></div></section>

    <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">RISK & RESPONSIBILITY</div><h2>Automation improves process, not certainty.</h2></div><p>Trading foreign exchange, CFDs and other leveraged products involves a high risk of loss and may not be suitable for everyone. Returns, target ranges and examples are not guaranteed. Past performance is not a reliable indicator of future results. Gencouv does not hold client funds or control withdrawals. Clients remain responsible for understanding the service, selecting appropriate risk settings and monitoring their broker account. Read the full <a href="/risk-disclosure">Risk Disclosure</a> before proceeding.</p></div></section>

    <section className="finalCta shell"><div className="eyebrow">GUIDED ONBOARDING</div><h2>Understand the system before activating it.</h2><p>The Gencouv Telegram assistant explains HFM and Lirunex compatibility, asks suitability questions and helps identify the route that fits your experience and objectives.</p><div className="copyHeroActions"><a className="primary" href={`${telegram}?start=website_final`} target="_blank" rel="noreferrer">Get started <span>↗</span></a><a className="secondary" href="#support">Contact support</a></div></section>

    <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Copy trading, automated trading systems, Expert Advisors and market intelligence tools.</p><div><a href="/about">About</a><a href="/copy-trading">Copy trading</a><a href="/marketplace">Marketplace</a><a href="/testimonials">Testimonials</a><a href="#support">Contact support</a><a href="/terms">Terms</a><a href="/privacy">Privacy Policy</a><a href="/risk-disclosure">Risk Disclosure</a><a href={`${telegram}?start=website_footer`} target="_blank" rel="noreferrer">Telegram</a></div><small>Supported brokers: HFM and Lirunex. Gencouv does not hold client funds. © 2026 Gencouv. Trading involves substantial risk. Results are not guaranteed and past performance does not guarantee future results.</small></footer>

    <FloatingGencouvChat />
  </main>;
}