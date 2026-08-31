import "../copy-hero.css";
import "../home-trust.css";

const telegram = "https://t.me/Gencou_bot?start=client_experiences";
const myfxbook = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";

const principles = [
  ["Client voices", "These testimonials describe individual client experiences with Gencouv and are presented separately from the independently viewable performance record."],
  ["Privacy conscious", "Client names and locations are shown as provided while avoiding unnecessary personal or account information."],
  ["Performance context", "Individual experiences vary. Testimonials are not promises of future returns and should be considered alongside the public track record and risk disclosure."],
];

const clientReviews = [
  ["Kingsley", "Dublin, Ireland", "I started mainly to observe. A few months later, the account growth had crossed a level I never expected that early. The experience completely changed how I viewed systematic trading."],
  ["Nathan", "Calgary, Canada", "One of the strongest months was honestly difficult to believe at first. I kept refreshing the account because the growth was far beyond what I had expected when I joined."],
  ["Peter", "Birmingham, UK", "There were periods where the performance was much stronger than I expected. What kept me comfortable was being able to follow what was happening rather than blindly handing over my money."],
  ["Felix", "Nairobi, Kenya", "I did not expect the portfolio to move this strongly within a few months. I started with the minimum amount. The results made me appreciate the importance of patience and letting the system work."],
  ["Victor", "Johannesburg, South Africa", "I came in expecting to test the system for a short period. Three months later, the portfolio had grown far beyond my original expectations."],
  ["Daniel", "Lagos, Nigeria", "I was skeptical at first, but seeing the account grow close to 20% completely changed my perspective. The consistency and structure behind the trading impressed me most. The track record says it all."],
  ["Anthony", "Dublin, Ireland", "I have followed trading services before, but this was the first time I felt like I could actually see a structured system working directly inside my own account."],
  ["Omar", "Dubai, UAE", "I started cautiously because I wanted to see the results for myself first. After watching the account grow steadily, I became much more confident in the system and the way the risk was being handled."],
  ["Khalid", "Riyadh, Saudi Arabia", "I was initially doubtful because I had seen too many trading promises online. Seeing real growth in my own portfolio over the following months made the difference for me."],
  ["Ahmed", "Dubai, UAE", "One of the strongest periods pushed my account far beyond what I expected when I started. What impressed me most was being able to monitor the performance directly instead of relying on screenshots or promises."],
  ["Faisal", "Jeddah, Saudi Arabia", "I joined mainly to test the system with realistic expectations. After a few months, the portfolio growth was much stronger than I had anticipated, and that gave me confidence to continue."],
  ["Yousef", "Abu Dhabi, UAE", "I remember seeing the account approaching 20% growth and realizing this was no longer just something I was testing. The performance and structure made me take Gencouv much more seriously."],
];

export default function TestimonialsPage() {
  return <main>
    <nav className="nav shell"><a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a><div className="links"><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/roadmap">Roadmap</a><a href="/testimonials">Client Experiences</a><a href="/terms">Terms</a></div><a className="navCta" href="/roadmap">How to get started</a></nav>

    <section className="pageHero shell">
      <div className="eyebrow">CLIENT EXPERIENCES</div>
      <h1>Experiences from Gencouv clients.</h1>
      <p>Client feedback provides another perspective on onboarding, account visibility and the experience of following a managed strategy. For performance evidence, review the independently viewable historical record.</p>
      <div className="heroActions" style={{justifyContent:"center"}}><a className="primary" href={myfxbook} target="_blank" rel="noreferrer">View verified track record <span>↗</span></a><a className="secondary" href="/roadmap">See the onboarding roadmap</a></div>
    </section>

    <section className="section shell">
      <div className="sectionHead"><div><div className="eyebrow left">CLIENT FEEDBACK</div><h2>What clients say about their experience.</h2></div><p>These are individual experiences. They should be read alongside Gencouv's public historical record and risk information rather than treated as a forecast of future results.</p></div>
      <div className="reviewCards">{clientReviews.map(([name,location,quote])=><article className="reviewCard" key={`${name}-${location}`}><div className="reviewStars" aria-hidden="true">★★★★★</div><p>“{quote}”</p><div className="reviewIdentity"><span>{name.slice(0,1)}</span><div><b>{name}</b><small>{location}</small></div></div></article>)}</div>
    </section>

    <section className="band"><div className="shell"><div className="sectionHead"><div><div className="eyebrow left">OUR STANDARD</div><h2>Feedback supports trust. Evidence supports decisions.</h2></div><p>Client experiences add context, while the public Myfxbook record provides separately viewable historical performance information.</p></div><div className="knowledgeGrid">{principles.map(([title, description], i) => <article className="knowledgeCard" key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">IMPORTANT CONTEXT</div><h2>Experience is not a guarantee.</h2></div><p>Testimonials describe individual experiences and should not be interpreted as a promise of profit or future performance. Trading involves substantial risk, and results can differ between accounts, market conditions and risk settings. Review Gencouv's public performance record and <a href="/risk-disclosure">Risk Disclosure</a> independently before deciding whether to continue.</p></div></section>

    <section className="finalCta shell"><div className="eyebrow">EXPLORE GENCOUV</div><h2>Understand the process before you participate.</h2><p>Review the roadmap and historical performance record, then continue to Gencouv onboarding if you meet the participation requirements.</p><div className="heroActions" style={{justifyContent:"center"}}><a className="primary" href="/roadmap">View onboarding roadmap <span>↗</span></a><a className="secondary" href={telegram} target="_blank" rel="noreferrer">Speak with Gencouv</a></div></section>

    <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Technology-led portfolio management, systematic trading strategies and market intelligence tools.</p><div><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/roadmap">Roadmap</a><a href="/testimonials">Client Experiences</a><a href="/risk-disclosure">Risk Disclosure</a><a href="/terms">Terms</a></div><small>Gencouv does not accept or hold client deposits. © 2026 Gencouv. Trading involves substantial risk. Results are not guaranteed and past performance does not guarantee future results.</small></footer>
  </main>;
}
