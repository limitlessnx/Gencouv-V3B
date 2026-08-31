import "./copy-hero.css";
import "./home-trust.css";
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
  ["Understand the service", "Start with Gencouv support and the roadmap so you understand the strategy, risks, account structure and onboarding requirements before making a decision."],
  ["Verify before onboarding", "Review client experiences and the public Myfxbook master-account record, then ask questions about anything that is unclear."],
  ["Complete guided evaluation", "We review your experience, objectives, risk tolerance, jurisdiction and eligibility before participation is considered."],
  ["Open your own broker account", "Approved clients create and verify their own eligible brokerage account. Funds remain with the broker, not Gencouv."],
];

const services = [
  { name: "Portfolio Management", label: "Primary service", description: "A single Gencouv managed strategy for eligible clients, supported by broker infrastructure and a verified master-account record." },
  { name: "Expert Advisors", label: "Marketplace", description: "Automated trading software and tools for clients who are looking for technology products rather than portfolio management." },
  { name: "Indicators & Utilities", label: "Marketplace", description: "Decision-support indicators, analysis tools and trading utilities. Marketplace availability is being expanded." },
];

const reviewCards = [
  ["Peter", "Birmingham, UK", "There were periods where the performance was much stronger than I expected. What kept me comfortable was being able to follow what was happening rather than blindly handing over my money."],
  ["Daniel", "Lagos, Nigeria", "I was skeptical at first, but seeing the account grow close to 20% completely changed my perspective. The consistency and structure behind the trading impressed me most. The track record says it all."],
  ["Ahmed", "Dubai, UAE", "One of the strongest periods pushed my account far beyond what I expected when I started. What impressed me most was being able to monitor the performance directly instead of relying on screenshots or promises."],
];

export default function Home() {
  return <main>
    <nav className="nav shell">
      <a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a>
      <div className="links"><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/roadmap">Roadmap</a><a href="#education">Our Approach</a><a href="/marketplace">Marketplace</a><a href="/testimonials">Client Experiences</a><a href="/terms">Terms</a></div>
      <a className="navCta" href="/roadmap">How to get started</a>
    </nav>

    <section className="copyHero shell">
      <div className="copyHeroText">
        <div className="copyPill">PORTFOLIO MANAGEMENT</div>
        <h1>Disciplined Strategies.<br/><em>Managed With Structure.</em></h1>
        <p>Gencouv provides a managed portfolio strategy for eligible clients through supported broker infrastructure. We do not accept or hold client deposits. You maintain your own brokerage account while Gencouv manages the strategy within the agreed framework.</p>
        <div className="copyHeroActions"><a className="copyPrimary" href="/roadmap">See how to get started <span>↗</span></a><a className="secondary" href={myfxbook} target="_blank" rel="noreferrer">View verified performance</a></div>
        <div className="copyProof"><span><b>Your Account</b><small>Open and fund your own eligible brokerage account</small></span><span><b>Gencouv Strategy</b><small>One managed portfolio strategy for approved clients</small></span><span><b>Verified Record</b><small>Review the Gencouv master-account record on Myfxbook</small></span></div>
      </div>
      <div className="copyHeroVisual" aria-label="Illustration of Gencouv portfolio management technology and connected market strategies"><div className="copyChart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="copyNetwork"><span className="copyNode lead">G</span><span className="copyNode n1">1</span><span className="copyNode n2">2</span><span className="copyNode n3">3</span><span className="copyNode n4">4</span><span className="copyLine l1"/><span className="copyLine l2"/><span className="copyLine l3"/><span className="copyLine l4"/></div><div className="copyPhone"><div className="phoneTop"><span>GENCOUV PORTFOLIO</span><b>LIVE</b></div><div className="phoneAccount"><small>Managed strategy</small><strong>Gencouv Portfolio</strong></div><div className="phoneGraph"><svg viewBox="0 0 320 130" preserveAspectRatio="none" aria-hidden="true"><path d="M0 106 C28 96 35 72 58 79 S92 103 116 61 S154 48 174 70 S207 72 226 42 S268 58 320 14"/></svg></div><div className="phoneStats"><span><small>Status</small><b>Systematic</b></span><span><small>Account</small><b>Client-held</b></span></div><a href={myfxbook} target="_blank" rel="noreferrer">View record</a></div><div className="copyBadge green">PORTFOLIO</div><div className="copyBadge blue">STRATEGY</div></div>
    </section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">HOW IT WORKS</div><h2>Understand first. Verify next. Participate only if approved.</h2></div><p>The Gencouv roadmap takes prospective clients from initial questions through independent performance review, eligibility evaluation, broker verification and account connection.</p></div><div className="knowledgeGrid">{managementSteps.map(([title,description],i)=><article className="knowledgeCard" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><div className="copyHeroActions" style={{marginTop: "28px"}}><a className="copyPrimary" href="/roadmap">View the full roadmap <span>↗</span></a><a className="secondary" href={myfxbook} target="_blank" rel="noreferrer">View verified performance</a></div></section>

    <TradingViewMarketHero />

    <section id="education" className="section shell"><div className="sectionHead"><div><div className="eyebrow left">OUR APPROACH</div><h2>Process before participation.</h2></div><p>Eligibility matters. We review experience, objectives, risk tolerance and other onboarding requirements before a client can participate. If a prospective client does not meet the required criteria, they are not onboarded.</p></div><div className="knowledgeGrid">{benefits.map(([title,description],i)=><article className="knowledgeCard" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="band"><div className="shell split"><div><div className="eyebrow left">PORTFOLIO STRATEGY</div><h2>One strategy. Defined rules. Continuous risk awareness.</h2><p className="lead">Gencouv's portfolio strategy uses systematic market analysis and execution within defined risk parameters. The objective is disciplined participation, not guaranteed returns.</p></div><div className="steps"><article><span>01</span><div><h3>Market observation</h3><p>The strategy monitors relevant market conditions, price behaviour, volatility and configured indicators.</p></div></article><article><span>02</span><div><h3>Risk validation</h3><p>Before execution, exposure and risk conditions are checked against the strategy's operating rules.</p></div></article><article><span>03</span><div><h3>Execution and management</h3><p>Qualified trades are executed and managed according to the strategy mandate and applicable broker infrastructure.</p></div></article></div></div></section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">GENCOUV SERVICES</div><h2>One managed portfolio. Additional tools through the marketplace.</h2></div><p>Portfolio management is our primary client service. Our marketplace can separately provide Expert Advisors, indicators and trading utilities as those products become available.</p></div><div className="serviceGrid">{services.map((service,i)=><a className="service" href={i === 0 ? "/portfolio-management" : "/marketplace"} key={service.name}><span>0{i+1}</span><small>{service.label}</small><h3>{service.name}</h3><p>{service.description}</p><b>{i === 0 ? "Learn about portfolio management ↗" : "View marketplace ↗"}</b></a>)}</div></section>

    <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">RISK & RESPONSIBILITY</div><h2>Transparency comes before activation.</h2></div><details className="riskDisclosure"><summary><span>Read risk summary</span><b aria-hidden="true">⌄</b></summary><div className="riskDisclosureBody"><p>Trading foreign exchange, CFDs and other leveraged products involves substantial risk and may not be suitable for everyone. Past performance is not a reliable indicator of future results. The Myfxbook record is historical evidence from the Gencouv master account and does not guarantee an individual client's future result. Gencouv does not accept or hold client deposits. Clients maintain their own brokerage relationship and remain responsible for understanding the risks.</p><a className="riskDisclosureLink" href="/risk-disclosure">View full Risk Disclosure <span>↗</span></a></div></details></div></section>

    <section className="reviewsPreview shell"><div className="reviewsPreviewHead"><div><div className="eyebrow left">CLIENT EXPERIENCES</div><h2>What clients say about Gencouv.</h2></div><a href="/testimonials">View all client experiences <span>↗</span></a></div><p className="reviewsPrototypeNote">Individual client experiences vary and do not guarantee future performance. Review the public historical record and risk disclosure before participating.</p><div className="reviewCards">{reviewCards.map(([name,location,quote])=><article className="reviewCard" key={`${name}-${location}`}><div className="reviewStars" aria-hidden="true">★★★★★</div><p>“{quote}”</p><div className="reviewIdentity"><span>{name.slice(0,1)}</span><div><b>{name}</b><small>{location}</small></div></div></article>)}</div></section>

    <section className="finalCta shell"><div className="eyebrow">GUIDED ONBOARDING</div><h2>Participation starts with understanding and eligibility.</h2><p>Read the roadmap, review the historical record and client experiences, then continue to the onboarding assistant when you are ready to complete the suitability process.</p><div className="copyHeroActions"><a className="primary" href="/roadmap">View onboarding roadmap <span>↗</span></a><a className="secondary" href={`${telegram}?start=website_final`} target="_blank" rel="noreferrer">Go to onboarding agent</a></div></section>

    <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Portfolio management, trading strategies, automated trading systems, Expert Advisors and market intelligence tools.</p><div><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/roadmap">Roadmap</a><a href="/marketplace">Marketplace</a><a href="/testimonials">Client Experiences</a><a href="#support">Contact support</a><a href="/terms">Terms</a><a href="/privacy">Privacy Policy</a><a href="/risk-disclosure">Risk Disclosure</a><a href={`${telegram}?start=website_footer`} target="_blank" rel="noreferrer">Onboarding agent</a></div><small>Gencouv does not accept or hold client deposits. © 2026 Gencouv. Trading involves substantial risk. Results are not guaranteed and past performance does not guarantee future results.</small></footer>
    <FloatingGencouvChat />
  </main>;
}
