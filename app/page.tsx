import "./copy-hero.css";
import TradingViewMarketHero from "@/components/TradingViewMarketHero";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const telegram = "https://t.me/Gencou_bot";
const myfxbook = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";

const benefits = [
  ["Structured portfolio management", "Gencouv operates a defined trading strategy through supported broker infrastructure, with participation subject to eligibility and onboarding."],
  ["You keep your own broker account", "Gencouv does not accept or hold client deposits. Clients open and fund their own eligible brokerage account and retain account visibility."],
  ["Disciplined execution", "The portfolio strategy follows defined rules, risk controls and systematic execution rather than relying on impulsive market decisions."],
  ["Verified performance record", "Review the Gencouv Lirunex master-account record on Myfxbook to examine historical performance and risk information before proceeding."],
];

const managementSteps = [
  ["Open your own broker account", "Use a supported broker and maintain the account in your own name. Your funds remain with the broker, not Gencouv."],
  ["Complete guided onboarding", "We review your experience, objectives, risk tolerance and eligibility before participation is considered."],
  ["Review the managed strategy", "Understand the strategy, historical record, risks, drawdown and operating conditions before making a decision."],
  ["Join if approved", "Eligible clients can participate through the supported broker portfolio-management infrastructure after completing the required onboarding."],
];

const services = [
  { name: "Portfolio Management", label: "Primary service", description: "A single Gencouv managed strategy for eligible clients, supported by broker infrastructure and a verified master-account record." },
  { name: "Expert Advisors", label: "Marketplace", description: "Automated trading software and tools for clients who are looking for technology products rather than portfolio management." },
  { name: "Indicators & Utilities", label: "Marketplace", description: "Decision-support indicators, analysis tools and trading utilities. Marketplace availability is being expanded." },
];

export default function Home() {
  return <main>
    <nav className="nav shell">
      <a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a>
      <div className="links"><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="#education">Our Approach</a><a href="/marketplace">Marketplace</a><a href="/testimonials">Testimonials</a><a href="/terms">Terms</a></div>
      <a className="navCta" href={`${telegram}?start=website`} target="_blank" rel="noreferrer">Get on board</a>
    </nav>

    <section className="copyHero shell">
      <div className="copyHeroText">
        <div className="copyPill">PORTFOLIO MANAGEMENT</div>
        <h1>Disciplined Strategies.<br/><em>Managed With Structure.</em></h1>
        <p>Gencouv provides a managed portfolio strategy for eligible clients through supported broker infrastructure. We do not accept or hold client deposits. You maintain your own brokerage account while Gencouv manages the strategy within the agreed framework.</p>
        <div className="copyHeroActions"><a className="copyPrimary" href="/portfolio-management">How portfolio management works <span>↗</span></a><a className="secondary" href={myfxbook} target="_blank" rel="noreferrer">View verified performance</a></div>
        <div className="copyProof"><span><b>Your Account</b><small>Open and fund your own eligible brokerage account</small></span><span><b>Gencouv Strategy</b><small>One managed portfolio strategy for approved clients</small></span><span><b>Verified Record</b><small>Review the Gencouv master-account record on Myfxbook</small></span></div>
      </div>

      <div className="copyHeroVisual" aria-label="Illustration of Gencouv portfolio management technology and connected market strategies">
        <div className="copyChart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="copyNetwork"><span className="copyNode lead">G</span><span className="copyNode n1">1</span><span className="copyNode n2">2</span><span className="copyNode n3">3</span><span className="copyNode n4">4</span><span className="copyLine l1"/><span className="copyLine l2"/><span className="copyLine l3"/><span className="copyLine l4"/></div>
        <div className="copyPhone"><div className="phoneTop"><span>GENCOUV PORTFOLIO</span><b>LIVE</b></div><div className="phoneAccount"><small>Managed strategy</small><strong>Gencouv Portfolio</strong></div><div className="phoneGraph"><svg viewBox="0 0 320 130" preserveAspectRatio="none" aria-hidden="true"><path d="M0 106 C28 96 35 72 58 79 S92 103 116 61 S154 48 174 70 S207 72 226 42 S268 58 320 14"/></svg></div><div className="phoneStats"><span><small>Status</small><b>Systematic</b></span><span><small>Account</small><b>Client-held</b></span></div><a href={myfxbook} target="_blank" rel="noreferrer">View record</a></div>
        <div className="copyBadge green">PORTFOLIO</div><div className="copyBadge blue">STRATEGY</div>
      </div>
    </section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">HOW IT WORKS</div><h2>Your funds stay with your broker. We manage the strategy.</h2></div><p>Gencouv does not accept client deposits. Clients open and fund their own eligible brokerage account, complete our onboarding process and, if approved, join the managed portfolio through the supported broker infrastructure.</p></div><div className="knowledgeGrid">{managementSteps.map(([title,description],i)=><article className="knowledgeCard" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><div className="copyHeroActions" style={{marginTop: "28px"}}><a className="copyPrimary" href={`${telegram}?start=get_started`} target="_blank" rel="noreferrer">Begin onboarding <span>↗</span></a><a className="secondary" href={myfxbook} target="_blank" rel="noreferrer">View verified performance</a></div></section>

    <TradingViewMarketHero />

    <section id="education" className="section shell"><div className="sectionHead"><div><div className="eyebrow left">OUR APPROACH</div><h2>Process before participation.</h2></div><p>Eligibility matters. We review experience, objectives, risk tolerance and other onboarding requirements before a client can participate. If a prospective client does not meet the required criteria, they are not onboarded.</p></div><div className="knowledgeGrid">{benefits.map(([title,description],i)=><article className="knowledgeCard" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="band"><div className="shell split"><div><div className="eyebrow left">PORTFOLIO STRATEGY</div><h2>One strategy. Defined rules. Continuous risk awareness.</h2><p className="lead">Gencouv's portfolio strategy uses systematic market analysis and execution within defined risk parameters. The objective is disciplined participation, not guaranteed returns.</p></div><div className="steps"><article><span>01</span><div><h3>Market observation</h3><p>The strategy monitors relevant market conditions, price behaviour, volatility and configured indicators.</p></div></article><article><span>02</span><div><h3>Risk validation</h3><p>Before execution, exposure and risk conditions are checked against the strategy's operating rules.</p></div></article><article><span>03</span><div><h3>Execution and management</h3><p>Qualified trades are executed and managed according to the strategy mandate and applicable broker infrastructure.</p></div></article></div></div></section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">GENCOUV SERVICES</div><h2>One managed portfolio. Additional tools through the marketplace.</h2></div><p>Portfolio management is our primary client service. Our marketplace can separately provide Expert Advisors, indicators and trading utilities as those products become available.</p></div><div className="serviceGrid">{services.map((service,i)=><a className="service" href={i === 0 ? "/portfolio-management" : "/marketplace"} key={service.name}><span>0{i+1}</span><small>{service.label}</small><h3>{service.name}</h3><p>{service.description}</p><b>{i === 0 ? "Learn about portfolio management ↗" : "View marketplace ↗"}</b></a>)}</div></section>

    <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">RISK & RESPONSIBILITY</div><h2>Transparency comes before activation.</h2></div><p>Trading foreign exchange, CFDs and other leveraged products involves substantial risk and may not be suitable for everyone. Past performance is not a reliable indicator of future results. The Myfxbook record is historical evidence from the Gencouv master account and does not guarantee an individual client's future result. Gencouv does not accept or hold client deposits. Clients maintain their own brokerage relationship and remain responsible for understanding the risks. Read the full <a href="/risk-disclosure">Risk Disclosure</a> before proceeding.</p></div></section>

    <section className="finalCta shell"><div className="eyebrow">GUIDED ONBOARDING</div><h2>Participation starts with eligibility.</h2><p>Our onboarding assistant explains the managed portfolio service, asks suitability questions and determines whether you meet the requirements to proceed. Clients who do not meet the onboarding criteria are not onboarded.</p><div className="copyHeroActions"><a className="primary" href={`${telegram}?start=website_final`} target="_blank" rel="noreferrer">Begin onboarding <span>↗</span></a><a className="secondary" href={myfxbook} target="_blank" rel="noreferrer">Review performance</a></div></section>

    <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Portfolio management, trading strategies, automated trading systems, Expert Advisors and market intelligence tools.</p><div><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/marketplace">Marketplace</a><a href="/testimonials">Testimonials</a><a href="#support">Contact support</a><a href="/terms">Terms</a><a href="/privacy">Privacy Policy</a><a href="/risk-disclosure">Risk Disclosure</a><a href={`${telegram}?start=website_footer`} target="_blank" rel="noreferrer">Get on board</a></div><small>Gencouv does not accept or hold client deposits. © 2026 Gencouv. Trading involves substantial risk. Results are not guaranteed and past performance does not guarantee future results.</small></footer>

    <FloatingGencouvChat />
  </main>;
}
