import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const telegram = "https://t.me/Gencou_bot";
const myfxbook = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";

const steps = [
  ["Open your own broker account", "Choose a supported broker and open an account in your own name. Gencouv does not accept or hold client deposits."],
  ["Complete guided onboarding", "We review your experience, objectives, risk tolerance, eligibility and required onboarding information."],
  ["Review the strategy and record", "Understand the managed portfolio, its risks and historical master-account performance before deciding whether to proceed."],
  ["Join if approved", "Clients who meet the onboarding requirements can participate through the supported broker portfolio-management infrastructure."],
];

export default function PortfolioManagementPage() {
  return (
    <main>
      <nav className="nav shell"><a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a><div className="links"><a href="/">Home</a><a href="#how-it-works">How it works</a><a href="#performance">Performance</a><a href="/marketplace">Marketplace</a></div><a className="navCta" href={`${telegram}?start=portfolio_management`} target="_blank" rel="noreferrer">Get on board</a></nav>

      <section className="infoHero shell"><div className="eyebrow left">GENCOUV PORTFOLIO MANAGEMENT</div><h1>One managed strategy. Your own brokerage account.</h1><p>Gencouv provides a managed portfolio strategy for eligible clients through supported broker infrastructure. We do not accept or hold client deposits. You open and fund your own brokerage account, complete onboarding and, if approved, participate in the managed strategy.</p><div className="heroActions"><a className="primary" href={`${telegram}?start=portfolio_management`} target="_blank" rel="noreferrer">Begin onboarding ↗</a><a className="secondary" href={myfxbook} target="_blank" rel="noreferrer">View verified performance</a></div></section>

      <section id="how-it-works" className="section shell"><div className="sectionHead"><div><div className="eyebrow left">YOUR FUNDS. YOUR ACCOUNT.</div><h2>Gencouv does not accept client deposits.</h2></div><p>You maintain your own relationship with the supported broker. Gencouv's role is to provide and manage the strategy through the approved portfolio-management infrastructure, subject to eligibility and applicable requirements.</p></div><div className="knowledgeGrid">{steps.map(([title,description],index)=><article className="knowledgeCard" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section id="performance" className="section shell"><div className="sectionHead"><div><div className="eyebrow left">VERIFIED PERFORMANCE</div><h2>Review the Gencouv master-account record.</h2></div><p>The Myfxbook record is the primary performance reference for the Gencouv managed strategy. It shows historical master-account information for review before onboarding.</p></div><div className="serviceGrid"><a className="service" href={myfxbook} target="_blank" rel="noreferrer"><span>01</span><small>PRIMARY RECORD</small><h3>Gencouv Lirunex PM</h3><p>Review the live Myfxbook record, historical performance and available risk statistics directly from the tracked master account.</p><b>Open Myfxbook ↗</b></a><article className="service"><span>02</span><small>IMPORTANT</small><h3>Historical performance is not a promise</h3><p>Master-account results do not guarantee future performance or an identical result for every client's account. Markets, execution, fees, risk settings and account conditions can differ.</p></article><article className="service"><span>03</span><small>ELIGIBILITY</small><h3>Not everyone is onboarded</h3><p>Gencouv uses a guided onboarding and suitability process. If a prospective client does not meet the required criteria, they will not be onboarded.</p></article></div></section>

      <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">RISK & RESPONSIBILITY</div><h2>Understand the service before participating.</h2></div><p>Trading foreign exchange, CFDs and other leveraged products involves substantial risk and may not be suitable for everyone. You can lose money. Past performance is not a reliable indicator of future results. Gencouv does not accept or hold client deposits, guarantee returns or guarantee capital protection. Participation is subject to eligibility, broker requirements, applicable laws and completion of onboarding. Read the full <a href="/risk-disclosure">Risk Disclosure</a> before proceeding.</p></div></section>

      <section className="finalCta shell"><div className="eyebrow">ELIGIBILITY FIRST</div><h2>Start with the onboarding process.</h2><p>Answer the required suitability questions and provide the requested information. Approval is required before participation in the Gencouv managed portfolio.</p><a className="primary" href={`${telegram}?start=portfolio_management`} target="_blank" rel="noreferrer">Begin onboarding <span>↗</span></a></section>

      <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Portfolio management, trading strategies, automated trading systems, Expert Advisors and market intelligence tools.</p><div><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/marketplace">Marketplace</a><a href="/testimonials">Testimonials</a><a href="/terms">Terms</a><a href="/privacy">Privacy Policy</a><a href="/risk-disclosure">Risk Disclosure</a><a href={`${telegram}?start=portfolio_footer`} target="_blank" rel="noreferrer">Get on board</a></div><small>Gencouv does not accept or hold client deposits. © 2026 Gencouv. Trading involves substantial risk. Results are not guaranteed.</small></footer>
      <FloatingGencouvChat />

      <style>{`.infoHero{padding:110px 0 70px;max-width:950px}.infoHero h1{font-size:clamp(48px,8vw,92px);line-height:.96;letter-spacing:-.06em;margin:18px 0}.infoHero>p{font-size:19px;line-height:1.7;color:#b8c7c4;max-width:800px}.heroActions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}@media(max-width:700px){.infoHero{padding:72px 0 45px}.infoHero h1{font-size:50px}.infoHero>p{font-size:16px}.heroActions a{width:100%;justify-content:center}}`}</style>
    </main>
  );
}
