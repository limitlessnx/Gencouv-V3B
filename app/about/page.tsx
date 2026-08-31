import "../copy-hero.css";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const telegram = "https://t.me/Gencou_bot";
const myfxbook = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";

const principles = [
  ["Systematic by design", "We turn defined market ideas into repeatable processes, combining structured analysis, automation and disciplined execution rather than relying on impulse."],
  ["Risk before return", "Every strategy operates inside defined risk parameters. We believe durability matters more than chasing a spectacular month."],
  ["Client-held capital", "Gencouv does not accept or hold client deposits. Eligible clients maintain their own brokerage relationship and account visibility."],
  ["Evidence over promises", "We make historical performance available for review and pair it with clear risk disclosure. Past performance is evidence of history, not a promise of what comes next."],
];

const institutionalIdeas = [
  ["Research-led", "Investment decisions begin with market observation, testing and a defined thesis."],
  ["Technology-enabled", "Automation and trading technology support analysis, execution, monitoring and operational consistency."],
  ["Risk-aware", "Exposure is governed by operating rules designed to keep risk visible throughout the investment process."],
  ["Client-centred", "Prospective clients are guided through eligibility, risk understanding and onboarding before participation."],
];

export default function About() {
  return <main>
    <nav className="nav shell">
      <a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a>
      <div className="links"><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/#education">Our Approach</a><a href="/marketplace">Marketplace</a><a href="/testimonials">Testimonials</a><a href="/terms">Terms</a></div>
      <a className="navCta" href={`${telegram}?start=about`} target="_blank" rel="noreferrer">Get on board</a>
    </nav>

    <section className="copyHero shell">
      <div className="copyHeroText">
        <div className="copyPill">ABOUT GENCOUV</div>
        <h1>Built for disciplined<br/><em>capital management.</em></h1>
        <p>Gencouv is a technology-led portfolio management company focused on systematic trading, disciplined risk management and transparent client participation. We build and operate structured market strategies for eligible clients through supported broker infrastructure.</p>
        <div className="copyHeroActions"><a className="copyPrimary" href="/portfolio-management">Explore portfolio management <span>↗</span></a><a className="secondary" href={myfxbook} target="_blank" rel="noreferrer">Review historical performance</a></div>
      </div>
      <div className="copyHeroVisual" aria-label="Gencouv systematic portfolio management">
        <div className="copyChart"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="copyPhone"><div className="phoneTop"><span>GENCOUV</span><b>SYSTEMATIC</b></div><div className="phoneAccount"><small>Investment philosophy</small><strong>Process over prediction</strong></div><div className="phoneGraph"><svg viewBox="0 0 320 130" preserveAspectRatio="none" aria-hidden="true"><path d="M0 106 C28 96 35 72 58 79 S92 103 116 61 S154 48 174 70 S207 72 226 42 S268 58 320 14"/></svg></div><div className="phoneStats"><span><small>Capital</small><b>Client-held</b></span><span><small>Execution</small><b>Rules-based</b></span></div></div>
      </div>
    </section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">WHO WE ARE</div><h2>Investment discipline, built around systems.</h2></div><p>Gencouv was built around a simple idea: investment decisions should be governed by process, evidence and risk controls. Our work combines market research, systematic execution and trading technology to operate a defined portfolio strategy for approved clients.</p></div><div className="knowledgeGrid">{principles.map(([title,description],i)=><article className="knowledgeCard" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="band"><div className="shell split"><div><div className="eyebrow left">OUR MISSION</div><h2>Make disciplined portfolio management more accessible without separating clients from control of their capital.</h2><p className="lead">Our mission is to build an investment-management platform where technology strengthens discipline, risk remains visible and clients can understand how they participate. We aim to grow through repeatable processes and long-term trust rather than promises of guaranteed returns.</p></div><div className="steps"><article><span>01</span><div><h3>Build repeatable strategies</h3><p>Translate research and market observations into defined, testable operating rules.</p></div></article><article><span>02</span><div><h3>Manage risk deliberately</h3><p>Evaluate exposure and operating conditions as part of the strategy, not as an afterthought.</p></div></article><article><span>03</span><div><h3>Earn trust through transparency</h3><p>Give clients access to historical evidence, clear onboarding and straightforward risk communication.</p></div></article></div></div></section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">INSTITUTIONAL MINDSET</div><h2>Inspired by the disciplines that define modern investment managers.</h2></div><p>Gencouv is not BlackRock, Bridgewater or Man Group, and we do not imply their scale, history or regulatory standing. What we adopt is the institutional mindset visible across leading investment firms: systematic thinking, technology, research, risk management and a client-first operating model.</p></div><div className="knowledgeGrid">{institutionalIdeas.map(([title,description],i)=><article className="knowledgeCard" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

    <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">WHAT CLIENTS SHOULD EXPECT</div><h2>Clarity before commitment.</h2></div><div><p>Clients should expect a structured onboarding process, straightforward explanations of how the managed strategy works, visibility into historical performance and clear communication about risk. We do not publish invented testimonials. Verified client feedback can be added here as it is collected and approved.</p><p style={{marginTop:"18px"}}>Participation is subject to eligibility. Gencouv does not accept or hold client deposits; clients maintain their own eligible brokerage account.</p></div></div></section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">OUR DIRECTION</div><h2>From trading technology to an investment platform built to endure.</h2></div><p>Our long-term direction is to deepen the infrastructure behind Gencouv: better research, stronger portfolio and risk systems, clearer reporting, more robust automation and a client experience that makes sophisticated investment processes easier to understand.</p></div></section>

    <section className="finalCta shell"><div className="eyebrow">GENCOUV PORTFOLIO MANAGEMENT</div><h2>Understand the strategy before you participate.</h2><p>Review how the portfolio works, examine the historical record and complete the eligibility process before making a decision.</p><div className="copyHeroActions"><a className="primary" href={`${telegram}?start=about_final`} target="_blank" rel="noreferrer">Begin onboarding <span>↗</span></a><a className="secondary" href={myfxbook} target="_blank" rel="noreferrer">View historical performance</a></div></section>

    <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Technology-led portfolio management, systematic trading strategies and market intelligence tools.</p><div><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/marketplace">Marketplace</a><a href="/terms">Terms</a><a href="/privacy">Privacy Policy</a><a href="/risk-disclosure">Risk Disclosure</a></div><small>Gencouv does not accept or hold client deposits. © 2026 Gencouv. Trading involves substantial risk. Results are not guaranteed and past performance does not guarantee future results.</small></footer>
    <FloatingGencouvChat />
  </main>;
}
