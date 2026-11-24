import type { Metadata } from "next";
import HomeNavigation from "@/components/home/HomeNavigation";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";
import ResearchFooter from "@/components/research/ResearchFooter";
import "../home-redesign.css";
import "../investment-intelligence/research.css";
import "./inner-circle.css";

export const metadata: Metadata = {
  title: "Gencouv Inner Circle | Stock & Crypto Investment Intelligence",
  description: "Explore the planned Gencouv Inner Circle: analyst-led stock and crypto research, structured market theses, transparent risk analysis and a private research community.",
  alternates: { canonical: "/inner-circle" },
};

const offer = [
  ["Stock intelligence", "Company quality, earnings, valuation, sector outlooks and business catalysts, with a clear thesis and downside analysis."],
  ["Crypto intelligence", "Blockchain adoption, token economics, on-chain signals, liquidity, market cycles, catalyst tracking and critical risk factors."],
  ["Market updates", "Actionable context when material new information changes a published research thesis, rather than constant alerts for their own sake."],
  ["Private research room", "A planned moderated Telegram space for research discussions, follow-up questions and analyst-led education."],
];

const steps = [
  ["01", "Discover", "Identify assets and themes worth deeper investigation, including the case against them."],
  ["02", "Investigate", "Review primary sources, financial or on-chain data, liquidity, catalysts, valuation and conflicts of interest."],
  ["03", "Publish", "Share the thesis, supporting data, scenario analysis, key risks and the conditions that would invalidate the view."],
  ["04", "Reassess", "Update the research when material facts change, and track the complete record rather than only successful ideas."],
];

const schedule = [
  ["Weekly", "Market intelligence brief", "A structured stock-and-crypto briefing covering developments, assets under review, key levels and material risks."],
  ["Monthly", "In-depth research dossier", "A deeper company or digital-asset investigation with sources, scenarios and a documented thesis."],
  ["Event-led", "Thesis update", "Follow-ups when earnings, regulation, token supply, market conditions or other material events change the underlying case."],
  ["Monthly", "Research discussion", "A proposed analyst Q&A focused on understanding research, methodology and risk rather than individual trading instructions."],
];

const questions = [
  ["What am I paying $500 for?", "The proposed annual membership covers original research reports, structured market briefings, material thesis updates, a research archive and an analyst-led discussion community. The final launch deliverables and service terms will be published before payment is enabled."],
  ["Will Gencouv tell me exactly what stocks or coins to buy?", "The proposed pre-launch product is general research and education, not personal financial advice or guaranteed trading calls. Whether more specific regulated recommendations can be offered depends on appropriate authorization and jurisdictional review."],
  ["Who produces the research?", "Gencouv is assembling a research team with separate stock-market and cryptocurrency specialisms. Named biographies, verified qualifications, duties and approved disclosures will appear when those appointments are finalized."],
  ["Can I verify a research idea?", "The planned research log will record the original thesis date, relevant supporting sources, material updates, risks and eventual outcomes. Illustrative examples are clearly labeled and never presented as historical performance."],
  ["Is the Telegram group live?", "The private member research room is planned, not yet open to paying members. Telegram access will be controlled through the formal membership process after launch."],
  ["Does this include copy trading or Expert Advisors?", "No. EA licensing, brokerage-based copy trading and research membership are separate Gencouv offerings with separate eligibility, fees, terms and risks."],
  ["When can I join and what happens after the year?", "Paid enrollment is not open. Before launch, Gencouv will publish billing, renewal, cancellation, refund, membership access and regulatory information. There is no automatic charge from this page."],
];

export default function InnerCirclePage() {
  return <main className="researchPage innerCirclePage">
    <HomeNavigation />

    <section className="innerHero shell">
      <div className="researchEyebrow"><span/> GENCOUV CAPITAL / INVESTMENT INTELLIGENCE</div>
      <span className="innerPrelaunch">PRIVATE RESEARCH MEMBERSHIP · PRE-LAUNCH</span>
      <h1>See beyond the market.<br/><em>Understand the opportunity.</em></h1>
      <p className="innerLead">Premium stock and crypto investment intelligence for people who value independent analysis, experienced perspectives and knowing the risks before making a decision.</p>
      <div className="researchActions">
        <a className="researchPrimary" href="/investment-intelligence#newsletter">Get research launch updates <span aria-hidden="true">↗</span></a>
        <a className="researchSecondary" href="#membership">Explore the membership</a>
      </div>
      <p className="innerHeroNote">Membership is not yet open. No payment is collected. Research is not a promise of returns.</p>
      <div className="innerProofStrip">
        <div><b>02</b><span>Specialist research areas<br/>Stocks &amp; crypto</span></div>
        <div><b>04</b><span>Proposed research formats<br/>Briefs, dossiers, updates, Q&amp;A</span></div>
        <div><b>$500</b><span>Proposed annual membership<br/>Terms to be finalized</span></div>
      </div>
    </section>

    <section className="researchSection shell">
      <div className="researchSectionIntro"><div><span className="researchKicker">THE VALUE OF GOOD RESEARCH</span><h2>Not another flood of coin tickers.</h2></div><p>Anyone can post a chart. The harder work is identifying the assumptions, analyzing downside, explaining the catalysts and revisiting the thesis when conditions change.</p></div>
      <div className="innerValueGrid">{offer.map(([name,description],i)=><article key={name} className="innerValueCard"><span>0{i+1} / RESEARCH DESK</span><h3>{name}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="innerSampleBand" id="sample">
      <div className="shell innerSampleLayout">
        <div>
          <span className="researchKicker">PREVIEW THE RESEARCH FORMAT</span>
          <h2>Know what an investment thesis actually contains.</h2>
          <p>Every published idea should explain the logic, evidence, potential upside, downside and what would change our assessment. This is the standard we're building the Gencouv research process around.</p>
          <p className="innerSampleDisclosure">The adjacent card is an <strong>illustrative template</strong>, not a live investment recommendation, published report, performance result or forecast.</p>
          <a className="researchSecondary" href="#method">See our research method ↗</a>
        </div>
        <article className="innerResearchNote" aria-label="Illustrative research note preview">
          <div className="innerNoteTop"><span>GENCOUV RESEARCH / NOTE FORMAT</span><b>ILLUSTRATIVE ONLY</b></div>
          <div className="innerNoteBadge">ASSET UNDER REVIEW</div>
          <h3>Research dossier structure</h3>
          <p>Stocks and digital assets are evaluated using evidence suited to each market, not a one-size-fits-all signal.</p>
          <div className="innerNoteRows">
            <div><span>Investment thesis</span><strong>What could create or destroy value?</strong></div>
            <div><span>Evidence</span><strong>Fundamentals, data, sources and context</strong></div>
            <div><span>Potential catalysts</span><strong>Events that could change the outlook</strong></div>
            <div><span>Risk scenarios</span><strong>Bear case, invalidation and uncertainty</strong></div>
            <div><span>Review status</span><strong>Original thesis and subsequent updates</strong></div>
          </div>
          <footer>Example report layout only · No security or token recommendation</footer>
        </article>
      </div>
    </section>

    <section className="researchSection shell" id="analysts">
      <div className="researchSectionIntro"><div><span className="researchKicker">THE PEOPLE BEHIND THE ANALYSIS</span><h2>Two specialist desks. One research standard.</h2></div><p>We are building a collaborative team that combines cryptocurrency market experience and public-equity analysis. Credentials and appointments will be published once independently verified and agreed.</p></div>
      <div className="innerAnalystGrid">
        <article className="innerAnalystCard"><div className="innerAnalystEmblem">₿</div><span>CRYPTOCURRENCY RESEARCH / PLANNED</span><h3>Digital Assets Analyst</h3><p>A proposed specialist contributor focused on crypto markets, trading structure, tokenomics, adoption signals, liquidity and risk.</p><div className="innerAnalystSkills"><span>Market cycles</span><span>Tokenomics</span><span>Crypto research</span></div><small>Appointment, name, credentials and financial claims pending verification</small></article>
        <article className="innerAnalystCard"><div className="innerAnalystEmblem">↗</div><span>EQUITY RESEARCH / PLANNED</span><h3>Stock Market Analyst</h3><p>A proposed specialist contributor focused on global equities, valuation, earnings, business quality, sector trends and long-term investment themes.</p><div className="innerAnalystSkills"><span>Equity analysis</span><span>Earnings</span><span>Valuation</span></div><small>Appointment, name, credentials and financial claims pending verification</small></article>
      </div>
      <p className="innerAnalystNote">Our editorial commitment: sourced research, reviewed conflicts of interest, clearly dated analysis and accountability for updates. Individual trading profits are not evidence that future research ideas will be profitable.</p>
    </section>

    <section className="innerCadence" id="experience">
      <div className="shell">
        <div className="researchSectionIntro"><div><span className="researchKicker">PLANNED MEMBER EXPERIENCE</span><h2>Clarity on what members receive.</h2></div><p>At this price point, the product must be defined and consistent. These are the proposed deliverables; final publication commitments will be confirmed before launch.</p></div>
        <div className="innerCadenceGrid">{schedule.map(([when,name,description])=><article key={name}><span>{when}</span><h3>{name}</h3><p>{description}</p></article>)}</div>
      </div>
    </section>

    <section className="researchSection shell" id="method">
      <div className="researchSectionIntro"><div><span className="researchKicker">GENCOUV RESEARCH STANDARD</span><h2>Evidence in. Clear reasoning out.</h2></div><p>Trust is earned by showing how an idea was evaluated and being equally visible when a thesis turns out to be wrong.</p></div>
      <div className="innerProcessGrid">{steps.map(([number,name,description])=><article key={number}><span>{number}</span><h3>{name}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="researchSection shell" id="membership">
      <div className="researchSectionIntro"><div><span className="researchKicker">ANNUAL MEMBERSHIP</span><h2>Research worth your attention.</h2></div><p>One clearly defined research product, separate from Gencouv's EA licensing and copy-trading services.</p></div>
      <div className="innerOffer">
        <div className="innerOfferMain">
          <span className="researchKicker">GENCOUV INNER CIRCLE / PLANNED ANNUAL ACCESS</span>
          <div className="innerAmount">$500 <span>/ year</span></div>
          <p>Proposed access to analyst-led stock and crypto market briefings, original research dossiers, material research updates, archives and moderated private discussions.</p>
          <div className="innerBenefits"><span>Equity &amp; crypto intelligence</span><span>Weekly proposed briefings</span><span>Monthly proposed deep dives</span><span>Material thesis updates</span><span>Research methodology &amp; archives</span><span>Private Telegram room (planned)</span></div>
          <a className="researchPrimary" href="/investment-intelligence#newsletter">Get pre-launch research updates ↗</a>
          <small>Join the free newsletter and verify your email. This does not reserve, activate or charge for Inner Circle membership. No automatic payments.</small>
        </div>
        <aside className="innerStatus"><span>PRE-LAUNCH</span><h3>Built for serious research. Not selling access yet.</h3><p>The final analyst roster, research samples, terms, regulatory scope, billing, Telegram provisioning and launch schedule must be confirmed before paid enrollment.</p><a href="https://t.me/gencouv" target="_blank" rel="noreferrer">Discuss Inner Circle with Gencouv ↗</a></aside>
      </div>
    </section>

    <section className="researchSection shell" id="faq">
      <div className="researchSectionIntro"><div><span className="researchKicker">COMMON QUESTIONS</span><h2>Understand the service before joining.</h2></div><p>Clear boundaries and published expectations matter as much as the quality of the research itself.</p></div>
      <div className="innerFaq">{questions.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </section>

    <section className="researchSection shell"><div className="researchSectionIntro"><div><span className="researchKicker">TRANSPARENCY</span><h2>Review published research before you subscribe.</h2></div><p>Read real Gencouv publications as they are independently reviewed and made public. We will not substitute fictional performance histories for actual reporting.</p></div><a className="researchPrimary" href="/research">Browse research archive ↗</a></section>
    <section className="researchDisclosureSection shell" aria-label="Important risk information">
      <details className="researchLegalDetails">
        <summary><span><strong>Important information and risk</strong><small>Inner Circle is a proposed membership. Research and market commentary do not guarantee returns.</small></span><b aria-hidden="true">+</b></summary>
        <div className="researchLegalBody"><p>Gencouv Inner Circle is a proposed future research membership. This page does not sell membership, give personalized financial advice, guarantee profits or solicit trades. Stock, crypto and forex trading can result in losses. Paid trading calls, investment recommendations or advisory activities will only be offered where the necessary authorizations and jurisdictional requirements are satisfied. Analyst claims and performance records must be independently verified.</p><a href="/risk-disclosure">Read the full risk disclosure ↗</a></div>
      </details>
    </section>
    <ResearchFooter />
    <FloatingGencouvChat />
  </main>;
}