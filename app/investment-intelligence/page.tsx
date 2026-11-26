import type { Metadata } from "next";
import HomeNavigation from "@/components/home/HomeNavigation";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";
import ResearchFooter from "@/components/research/ResearchFooter";
import "../home-redesign.css";
import "../copy-hero.css";
import "./research.css";

export const metadata: Metadata = {
  title: "Investment Intelligence | Gencouv Capital",
  description: "Explore Gencouv's Prime Trade Calls Access, macro commentary and private multi-asset market discussions.",
  alternates: { canonical: "/investment-intelligence" },
};

const researchAreas = [
  ["01", "Equity research", "Company fundamentals, business models, valuations, earnings trends, and long-term investment themes."],
  ["02", "Digital asset intelligence", "Blockchain ecosystems, token economics, market structure, on-chain activity, and crypto risk analysis."],
  ["03", "Macro and market outlook", "Interest rates, liquidity, market cycles, sector rotation, and the economic developments influencing asset prices."],
  ["04", "Investment risk education", "Diversification, position sizing, volatility, drawdowns, and frameworks for evaluating uncertain outcomes."],
];

export default function InvestmentIntelligencePage() {
  return <main className="researchPage">
    <HomeNavigation />
    <section className="researchHero shell">
      <div className="researchEyebrow"><span /> GENCOUV CAPITAL / INVESTMENT INTELLIGENCE</div>
      <h1>Clarity for a world of <em>moving markets.</em></h1>
      <p>Independent financial market research, evidence-led analysis, and educational insights across global equities, cryptocurrencies, and macroeconomic trends. Built for curious investors who value the thinking behind an idea.</p>
      <div className="researchActions">
        <a className="researchPrimary" href="/checkout/inner-circle">Get Prime Access <span aria-hidden="true">↗</span></a>
        <a className="researchSecondary" href="/inner-circle">Explore Prime Access</a>
      </div>
      <div className="researchTrust"><span>Evidence before excitement</span><span>Risk alongside opportunity</span><span>No guaranteed returns</span></div>
    </section>

    <section className="researchSection shell" aria-labelledby="researchAreas">
      <div className="researchSectionIntro"><div><span className="researchKicker">WHAT WE STUDY</span><h2 id="researchAreas">Research with a wider lens.</h2></div><p>Market headlines tell you what happened. A robust research process asks why it matters, what assumptions could be wrong, and which risks deserve attention.</p></div>
      <div className="researchGrid">{researchAreas.map(([number, title, description]) => <article className="researchCard" key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section id="inner-circle" className="researchSection shell">
      <div className="researchSectionIntro"><div><span className="researchKicker">PREMIUM MULTI-ASSET MEMBERSHIP</span><h2>Gencouv Prime Trade Calls Access.</h2></div><p>Private market commentary and trade-setup discussions spanning equities, digital assets, forex, metals and CFDs. Members make their own trading decisions.</p></div>
      <div className="researchMemberCard"><div><span className="researchKicker">ANNUAL PRIVATE MEMBERSHIP</span><div className="researchPrice">$1,000 <small>/ year</small></div><p>Membership is designed for multi-asset market observations, macro briefings, setups and catalysts to watch, and access to the private Telegram community following paid-order and account verification.</p><div className="researchTagRow"><span>Macro commentary</span><span>Trade setups to watch</span><span>Risk scenarios</span><span>Private community</span></div></div><aside><strong>Payment verification and access</strong><p>Checkout handles annual membership invoicing where activated. A verified payment generates an access code; Telegram joining requires manual approval.</p><a className="researchSecondary" href="/checkout/inner-circle">Get Prime Access ↗</a></aside></div>
    </section>

    <section className="researchSection shell"><div className="researchSectionIntro"><div><span className="researchKicker">OUR STANDARD</span><h2>Show the reasoning, not just the conclusion.</h2></div><p>Our aim is to document the thesis, supporting evidence, what could invalidate it, and the outcome over time. Research is not a promise of performance.</p></div><div className="researchMethod"><article><b>01 / Thesis</b><p>Define what makes the asset or market theme worth studying.</p></article><article><b>02 / Evidence</b><p>Examine fundamentals, data quality, alternatives, and counterarguments.</p></article><article><b>03 / Risk</b><p>Describe uncertainties, key catalysts, and scenarios where the thesis fails.</p></article><article><b>04 / Review</b><p>Revisit assumptions as facts change, including unsuccessful ideas.</p></article></div></section>

    <section className="researchSection shell"><div className="researchSectionIntro"><div><span className="researchKicker">ORIGINAL GENCOUV RESEARCH</span><h2>Explore published analysis.</h2></div><p>As our research team begins publishing, approved public research notes and their dated evidence will be available in the research archive.</p></div><div className="researchActions"><a className="researchPrimary" href="/research">View the research archive ↗</a></div></section>
    <section className="researchDisclosureSection shell" aria-label="Important risk information">
      <details className="researchLegalDetails">
        <summary><span><strong>Important information and risk</strong><small>Research is educational and carries investment risk. Always consider your circumstances and the possibility of losses.</small></span><b aria-hidden="true">+</b></summary>
        <div className="researchLegalBody"><p>This page describes research and educational services. Nothing here is personalized financial advice, an offer to transact in financial instruments, or a guarantee of investment returns. Stocks, crypto and leveraged forex products can lose value. Paid trade calls or specific financial recommendations will only be offered after any required legal and regulatory approvals. Third-party proprietary research will not be redistributed without permission.</p><a href="/risk-disclosure">Read the full risk disclosure ↗</a></div>
      </details>
    </section>
    <ResearchFooter />
    <FloatingGencouvChat />
  </main>;
}
