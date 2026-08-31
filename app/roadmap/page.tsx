import "../copy-hero.css";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const telegram = "https://t.me/Gencou_bot";
const myfxbook = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";
const lirunexLegal = "https://lirunex.com/legal-documents/";

const roadmap = [
  ["Start with support", "Chat with Gencouv support to understand what we do, how the portfolio-management process works, the risks involved and what remains under your control before you consider onboarding."],
  ["Review client experiences", "Read approved client experiences to understand how people describe Gencouv's onboarding, communication and account visibility. Testimonials are supporting context, not proof of future investment performance."],
  ["Verify the track record", "Review Gencouv's public Myfxbook master-account record and ask for current performance information during due diligence. Historical performance can show what happened previously, but it cannot guarantee what happens next."],
  ["Complete the onboarding evaluation", "Continue with the Gencouv onboarding agent on Telegram. The evaluation checks suitability, eligibility and jurisdiction before participation is considered. Passing is not automatic."],
  ["Open and verify your broker account", "If approved, create your own eligible Lirunex brokerage account and complete the broker's KYC and verification process. The brokerage account is held in your name; Gencouv does not receive your deposit."],
  ["Fund and connect", "Once the broker confirms your account and qualifying deposit, follow the onboarding instructions to connect the eligible account to the Gencouv Lirunex portfolio-management arrangement. The current minimum qualifying allocation is $2,000, subject to eligibility and any broker requirements."],
  ["Monitor your account", "After activation, retain access to your brokerage account and MetaTrader 5 so you can personally monitor balances, positions and trade activity while the portfolio strategy operates."],
];

const controls = [
  ["Your brokerage account", "The account is opened with the broker in the client's name and remains visible to the client."],
  ["Your capital stays with the broker", "Gencouv does not accept or hold client deposits. Funding is made to the client's eligible brokerage account."],
  ["Your account remains visible", "Clients can use the broker platform and MetaTrader 5 to monitor account activity and positions."],
  ["Gencouv manages the strategy", "Gencouv's role is the portfolio strategy and its operating process within the supported broker arrangement, subject to onboarding and eligibility."],
];

export default function RoadmapPage() {
  return <main>
    <nav className="nav shell">
      <a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a>
      <div className="links"><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/roadmap">Roadmap</a><a href="/testimonials">Client Experiences</a><a href="/marketplace">Marketplace</a><a href="/terms">Terms</a></div>
      <a className="navCta" href={`${telegram}?start=roadmap`} target="_blank" rel="noreferrer">Begin evaluation</a>
    </nav>

    <section className="pageHero shell">
      <div className="eyebrow">YOUR ROADMAP TO GENCOUV</div>
      <h1>Understand first. Verify next. Join only if it fits.</h1>
      <p>Gencouv's onboarding path is designed to give prospective clients time to understand the service, review independent evidence, complete an eligibility assessment and keep control of their own brokerage account throughout the process.</p>
      <div className="heroActions" style={{justifyContent:"center"}}><a className="primary" href="#roadmap">View the roadmap <span>↓</span></a><a className="secondary" href={myfxbook} target="_blank" rel="noreferrer">View verified track record</a></div>
    </section>

    <section id="roadmap" className="section shell">
      <div className="sectionHead"><div><div className="eyebrow left">7 STAGES</div><h2>From first question to a connected account.</h2></div><p>Each stage answers a different trust question: what Gencouv does, what clients say, what the historical record shows, whether you are eligible, where your money sits and how you retain visibility after activation.</p></div>
      <div className="steps">{roadmap.map(([title,description],i)=><article key={title}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{description}</p>{i===1&&<p style={{marginTop:"10px"}}><a href="/testimonials">Review client experiences ↗</a></p>}{i===2&&<p style={{marginTop:"10px"}}><a href={myfxbook} target="_blank" rel="noreferrer">Open the verified Myfxbook record ↗</a></p>}{i===3&&<p style={{marginTop:"10px"}}><a href={`${telegram}?start=roadmap_evaluation`} target="_blank" rel="noreferrer">Continue to evaluation ↗</a></p>}</div></article>)}</div>
    </section>

    <section className="band"><div className="shell split"><div><div className="eyebrow left">ACCOUNT CONTROL</div><h2>Your account remains yours.</h2><p className="lead">The distinction matters: Gencouv manages a strategy through supported infrastructure. It does not operate as the place where clients send or store their deposits.</p></div><div className="steps">{controls.map(([title,description],i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>

    <section className="section shell"><div className="sectionHead"><div><div className="eyebrow left">BROKER & REGULATORY CONTEXT</div><h2>Know which entity holds your brokerage relationship.</h2></div><p>The applicable broker entity, legal documents and country availability depend on the client's jurisdiction and are presented during broker registration. Prospects should review those documents before opening or funding an account.</p></div><div className="knowledgeGrid"><article className="knowledgeCard"><span>01</span><h3>Lirunex Limited</h3><p>Lirunex Limited, registration 216574 GBC, states that it is regulated by the Financial Services Commission of Mauritius under licence GB24203882. Verify the current regulatory and legal information directly with Lirunex before onboarding.</p><p><a href={lirunexLegal} target="_blank" rel="noreferrer">Review Lirunex legal documents ↗</a></p></article><article className="knowledgeCard"><span>02</span><h3>Jurisdiction matters</h3><p>The broker entity and available services can vary by location. Gencouv onboarding should confirm country eligibility before directing a prospect to create a brokerage account.</p></article><article className="knowledgeCard"><span>03</span><h3>No borrowed licence claims</h3><p>Lirunex's regulatory permissions relate to the relevant Lirunex entity. They should not be interpreted as regulatory authorisation of Gencouv itself.</p></article><article className="knowledgeCard"><span>04</span><h3>Read before funding</h3><p>Review the broker's account terms, risk disclosures, funding rules and applicable legal documents before depositing capital or connecting to a managed arrangement.</p></article></div></section>

    <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">FEES & RISK</div><h2>Nothing important should arrive as a surprise.</h2></div><div><p>Trading foreign exchange, CFDs and other leveraged products involves substantial risk. Past performance is not a reliable indicator of future results, and the $2,000 qualifying minimum does not make an account risk-free.</p><p style={{marginTop:"18px"}}>Gencouv's onboarding materials should disclose the one-time service charge before activation, including the exact basis on which the 5% charge is calculated and how it is collected. Do not proceed until those terms are understood.</p></div></div></section>

    <section className="finalCta shell"><div className="eyebrow">READY FOR THE NEXT STEP?</div><h2>Start with questions, not a deposit.</h2><p>Use Gencouv support to understand the process first. When you are comfortable with the structure, evidence and risks, continue to the onboarding evaluation.</p><div className="copyHeroActions"><a className="primary" href={`${telegram}?start=roadmap_final`} target="_blank" rel="noreferrer">Begin onboarding evaluation <span>↗</span></a><a className="secondary" href={myfxbook} target="_blank" rel="noreferrer">Verify historical performance</a></div></section>

    <footer className="footer shell"><div className="brand"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></div><p>Technology-led portfolio management, systematic trading strategies and market intelligence tools.</p><div><a href="/about">About</a><a href="/portfolio-management">Portfolio Management</a><a href="/roadmap">Roadmap</a><a href="/testimonials">Client Experiences</a><a href="/risk-disclosure">Risk Disclosure</a><a href="/terms">Terms</a></div><small>Gencouv does not accept or hold client deposits. © 2026 Gencouv. Trading involves substantial risk. Results are not guaranteed and past performance does not guarantee future results.</small></footer>
    <FloatingGencouvChat />
  </main>;
}
