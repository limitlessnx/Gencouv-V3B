import "../copy-hero.css";

const telegram = "https://t.me/Gencou_bot?start=client_experiences";
const myfxbook = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";

const principles = [
  ["Privacy first", "Client identities can be abbreviated when a client prefers not to publish their full name."],
  ["Approved feedback only", "Published testimonials should be attributable to an actual Gencouv client and approved for publication."],
  ["No performance promises", "Client comments are personal experiences and must never be presented as evidence of future returns."],
];

const demoReviews = [
  ["James A. · United Kingdom", "The onboarding flow made it clear that my brokerage account stayed in my own name and that I could monitor the account directly.", "DEMO • NOT A VERIFIED CLIENT REVIEW"],
  ["M*** K. · UAE", "I liked being able to review the public track record first and understand the process before moving into the evaluation stage.", "DEMO • NOT A VERIFIED CLIENT REVIEW"],
  ["A. N. · South Africa", "The support journey explained the service, the risks and the next steps instead of pushing straight to a deposit.", "DEMO • NOT A VERIFIED CLIENT REVIEW"],
];

export default function TestimonialsPage() {
  return <main>
    <nav className="nav shell"><a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a><div className="links"><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/roadmap">Roadmap</a><a href="/testimonials">Client Experiences</a><a href="/terms">Terms</a></div><a className="navCta" href="/roadmap">How to get started</a></nav>

    <section className="pageHero shell">
      <div className="eyebrow">CLIENT EXPERIENCES</div>
      <h1>Trust should be supported by evidence.</h1>
      <p>Client feedback can help explain the onboarding experience, communication and account visibility. It sits alongside, not above, independently viewable historical performance and clear risk disclosure.</p>
      <div className="heroActions" style={{justifyContent:"center"}}><a className="primary" href={myfxbook} target="_blank" rel="noreferrer">View verified track record <span>↗</span></a><a className="secondary" href="/roadmap">See the onboarding roadmap</a></div>
    </section>

    <section className="section shell">
      <div className="sectionHead"><div><div className="eyebrow left">OUR STANDARD</div><h2>How client feedback is handled.</h2></div><p>Real published feedback should be attributable, privacy-conscious and separated from investment-performance claims.</p></div>
      <div className="knowledgeGrid">{principles.map(([title, description], i) => <article className="knowledgeCard" key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="band"><div className="shell"><div className="sectionHead"><div><div className="eyebrow left">DESIGN PROTOTYPE</div><h2>Review cards for the learning project.</h2></div><p>The cards below demonstrate the intended international review layout. They are deliberately marked as demo content and must be replaced with approved client feedback before being presented as testimonials.</p></div><div className="serviceGrid">{demoReviews.map(([name,quote,label])=><article className="service" key={name}><span>{label}</span><h3>{name}</h3><p>“{quote}”</p><b>Illustrative review layout</b></article>)}</div></div></section>

    <section className="section shell">
      <div className="emptyState"><div className="eyebrow">VERIFIED FEEDBACK</div><h2>Approved client experiences can replace the demo cards.</h2><p>When genuine feedback is collected and approved, the same layout can display privacy-conscious attribution such as “James A. · United Kingdom” or “M*** K. · UAE” without exposing unnecessary personal information.</p><a className="primary" href={telegram} target="_blank" rel="noreferrer">Speak with Gencouv <span>↗</span></a></div>
    </section>

    <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">IMPORTANT CONTEXT</div><h2>Experience is not a guarantee.</h2></div><p>Testimonials describe individual experiences and should not be interpreted as a promise of profit or future performance. Trading involves substantial risk, and results can differ between accounts, market conditions and risk settings. Review Gencouv's public performance record and risk disclosure independently before deciding whether to continue.</p></div></section>

    <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Technology-led portfolio management, systematic trading strategies and market intelligence tools.</p><div><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/roadmap">Roadmap</a><a href="/testimonials">Client Experiences</a><a href="/risk-disclosure">Risk Disclosure</a><a href="/terms">Terms</a></div><small>Gencouv does not accept or hold client deposits. © 2026 Gencouv. Trading involves substantial risk. Results are not guaranteed and past performance does not guarantee future results.</small></footer>
  </main>;
}
