import type { Metadata } from "next";
import HomeNavigation from "@/components/home/HomeNavigation";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";
import ResearchNewsletterForm from "@/components/research/ResearchNewsletterForm";
import "../home-redesign.css";
import "../copy-hero.css";
import "./research.css";

export const metadata: Metadata = {
  title: "Investment Intelligence | Gencouv Capital",
  description: "Explore Gencouv's investment research, stock and crypto market intelligence, educational briefings, and upcoming Inner Circle membership.",
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
        <a className="researchPrimary" href="#newsletter">Explore free research <span aria-hidden="true">↗</span></a>
        <a className="researchSecondary" href="/inner-circle">Discover Inner Circle</a>
      </div>
      <div className="researchTrust"><span>Evidence before excitement</span><span>Risk alongside opportunity</span><span>No guaranteed returns</span></div>
    </section>

    <section className="researchSection shell" aria-labelledby="researchAreas">
      <div className="researchSectionIntro"><div><span className="researchKicker">WHAT WE STUDY</span><h2 id="researchAreas">Research with a wider lens.</h2></div><p>Market headlines tell you what happened. A robust research process asks why it matters, what assumptions could be wrong, and which risks deserve attention.</p></div>
      <div className="researchGrid">{researchAreas.map(([number, title, description]) => <article className="researchCard" key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section id="newsletter" className="researchNewsletter">
      <div className="shell researchSplit"><div><span className="researchKicker">THE FREE BRIEF</span><h2>Follow the markets. Understand the context.</h2><p>Our planned market newsletter will bring together stock and crypto watchlists, major developments, and accessible explanations of the risks and evidence behind each research theme.</p><div className="researchTagRow"><span>Market commentary</span><span>Research watchlists</span><span>Investor education</span></div></div><div className="researchJoinCard"><span className="researchKicker">FREE RESEARCH NEWSLETTER</span><h3>Subscribe to the Gencouv Research Brief.</h3><p>Get independent market commentary and research updates in your inbox. Subscribe below, then confirm the email we send you.</p><ResearchNewsletterForm /></div></div>
    </section>

    <section id="inner-circle" className="researchSection shell">
      <div className="researchSectionIntro"><div><span className="researchKicker">PREMIUM RESEARCH MEMBERSHIP</span><h2>The Gencouv Inner Circle.</h2></div><p>A proposed private research community for members who want more context, more detailed analysis, and thoughtful discussions about markets.</p></div>
      <div className="researchMemberCard"><div><span className="researchKicker">PROPOSED ANNUAL MEMBERSHIP</span><div className="researchPrice">$500 <small>/ year</small></div><p>Planned features include weekly market briefings, in-depth stock and crypto research, research archives, and moderated Telegram discussions.</p><div className="researchTagRow"><span>Weekly briefings</span><span>Investment theses</span><span>Research Q&A</span><span>Private community</span></div></div><aside><strong>Launching after regulatory review</strong><p>Enrollment and payments are not yet open. Features, pricing, access rules, and eligibility will be confirmed before any paid launch.</p><a className="researchSecondary" href="/inner-circle">Explore Inner Circle ↗</a></aside></div>
    </section>

    <section className="researchSection shell"><div className="researchSectionIntro"><div><span className="researchKicker">OUR STANDARD</span><h2>Show the reasoning, not just the conclusion.</h2></div><p>Our aim is to document the thesis, supporting evidence, what could invalidate it, and the outcome over time. Research is not a promise of performance.</p></div><div className="researchMethod"><article><b>01 / Thesis</b><p>Define what makes the asset or market theme worth studying.</p></article><article><b>02 / Evidence</b><p>Examine fundamentals, data quality, alternatives, and counterarguments.</p></article><article><b>03 / Risk</b><p>Describe uncertainties, key catalysts, and scenarios where the thesis fails.</p></article><article><b>04 / Review</b><p>Revisit assumptions as facts change, including unsuccessful ideas.</p></article></div></section>

    <section className="researchDisclaimer shell"><h2>Important information</h2><p>This page describes planned research and educational services. Nothing here is personalized financial advice, a solicitation to purchase an asset, or a guarantee of investment returns. Stocks and digital assets involve risk, including possible loss of capital. Specific paid recommendations or advisory services will not be offered before applicable legal and regulatory requirements are addressed. Premium third-party research is not redistributed without permission.</p><a href="/risk-disclosure">Read Gencouv's risk disclosure ↗</a></section>
    <footer className="researchFooter shell"><a href="/">← Back to Gencouv Capital</a><span>© 2026 Gencouv Capital</span><a href="/privacy">Privacy</a><a href="/terms">Terms</a></footer>
    <FloatingGencouvChat />
  </main>;
}
