import type { Metadata } from "next";
import HomeNavigation from "@/components/home/HomeNavigation";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";
import "../home-redesign.css";
import "../investment-intelligence/research.css";
import "./inner-circle.css";

export const metadata: Metadata = {
  title: "Gencouv Inner Circle | Premium Investment Research Community",
  description: "Discover the proposed Gencouv Inner Circle annual research membership: in-depth stock and crypto research, weekly briefings, and thoughtful private discussions.",
  alternates: { canonical: "/inner-circle" },
};

const pillars = [
  ["01", "Equity intelligence", "Deep research on public companies, financial performance, valuations, business models, and emerging market themes."],
  ["02", "Digital asset analysis", "Structured coverage of blockchain markets, crypto fundamentals, token economics, and major developments."],
  ["03", "Market briefings", "Context on macroeconomic events, monetary policy, market structure, and shifting risk conditions."],
  ["04", "Research community", "A private Telegram discussion environment focused on evidence, productive questions, and thoughtful analysis."],
];

const cadence = [
  ["Weekly", "Research briefing", "A structured review of market themes, selected assets under observation, and relevant risks."],
  ["Monthly", "Deep-dive research", "A more detailed investment thesis with assumptions, counterarguments, and scenarios."],
  ["Monthly", "Member Q&A", "A moderated opportunity to discuss research methods, market developments, and portfolio risk education."],
  ["Ongoing", "Research archive", "A reference library for previous publications, updates, and thesis reviews."],
];

const faqs = [
  ["Is this a trading signals group?", "No. The intended service is independent research and investment education, not guaranteed buy/sell signals or promises of profits."],
  ["Does the membership include EA licenses or copy trading?", "No. Gencouv's automated trading systems and copy-trading services are separate products with their own terms and eligibility."],
  ["Can I join today?", "Not yet. The proposed Inner Circle is in pre-launch development and is not accepting payments. We will share further details once membership terms and applicable regulatory requirements are settled."],
  ["Will members receive personalized investment advice?", "Not under the proposed research-only membership. Personalized investment advisory services would require appropriate authorization and separate terms."],
  ["Will there be a private Telegram group?", "A moderated Telegram community is planned for eligible members after launch. Access is not currently being sold or issued."],
  ["What is the refund and renewal policy?", "The final cancellation, refund, renewal and billing terms will be published before any paid enrollment opens."],
];

export default function InnerCirclePage() {
  return <main className="researchPage innerCirclePage">
    <HomeNavigation />
    <section className="innerHero shell">
      <div className="researchEyebrow"><span/> GENCOUV CAPITAL / PRIVATE RESEARCH COMMUNITY</div>
      <p className="innerPrelaunch">MEMBERSHIP IN DEVELOPMENT</p>
      <h1>Better questions.<br/><em>Deeper intelligence.</em></h1>
      <p className="innerLead">For investors who want to study the reasoning behind market opportunities, the risks that could change a thesis, and the signals that matter more than the noise.</p>
      <div className="researchActions">
        <a className="researchPrimary" href="/investment-intelligence#newsletter">Join the free Research Brief <span aria-hidden="true">↗</span></a>
        <a className="researchSecondary" href="#membership">Explore membership</a>
      </div>
      <div className="innerHeroFoot"><span>Research-first</span><span>Risk-aware</span><span>Community-led</span></div>
    </section>

    <section className="researchSection shell" id="focus">
      <div className="researchSectionIntro"><div><span className="researchKicker">WHAT YOU CAN EXPECT</span><h2>Research beyond the headlines.</h2></div><p>The Inner Circle is being designed as a dedicated environment for independent market intelligence, structured analysis and informed discussion. Not a promise of extraordinary returns.</p></div>
      <div className="researchGrid">{pillars.map(([number,title,description])=><article className="researchCard" key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="innerCadence">
      <div className="shell">
        <div className="researchSectionIntro"><div><span className="researchKicker">PLANNED RESEARCH EXPERIENCE</span><h2>A consistent research rhythm.</h2></div><p>Members should know what they are paying for. The proposed publication schedule is clear, repeatable, and transparent about uncertainty.</p></div>
        <div className="innerCadenceGrid">{cadence.map(([when,name,description])=><article key={name}><span>{when}</span><h3>{name}</h3><p>{description}</p></article>)}</div>
      </div>
    </section>

    <section className="researchSection shell" id="membership">
      <div className="researchSectionIntro"><div><span className="researchKicker">THE PROPOSED MEMBERSHIP</span><h2>One focused research community.</h2></div><p>Transparent value, no speculative performance promises. All details remain subject to final terms and launch readiness.</p></div>
      <div className="innerOffer">
        <div className="innerOfferMain">
          <span className="researchKicker">GENCOUV INNER CIRCLE · ANNUAL</span>
          <div className="innerAmount">$500 <span>/ year</span></div>
          <p>Planned premium market briefings, company and crypto research, moderated private Telegram discussions, and research archives.</p>
          <div className="innerBenefits"><span>Original Gencouv research</span><span>Stocks and crypto coverage</span><span>Risk analysis</span><span>Monthly discussion sessions</span></div>
          <a className="researchPrimary" href="/investment-intelligence#newsletter">Follow launch updates <span aria-hidden="true">↗</span></a>
          <small>This link subscribes you to the free Research Brief only after email confirmation. It is not a paid membership registration or guaranteed place.</small>
        </div>
        <aside className="innerStatus">
          <span>PRE-LAUNCH STATUS</span>
          <h3>Not accepting payments</h3>
          <p>Membership enrollment, billing, automatic Telegram access and paid research distribution will only launch after operational, legal and regulatory review.</p>
          <a href="https://t.me/gencouv" target="_blank" rel="noreferrer">Discuss the research offering with Gencouv ↗</a>
        </aside>
      </div>
    </section>

    <section className="researchSection shell">
      <div className="researchSectionIntro"><div><span className="researchKicker">QUESTIONS & ANSWERS</span><h2>Know what you're joining.</h2></div><p>Research is most useful when its scope and limitations are explained as clearly as its opportunities.</p></div>
      <div className="innerFaq">{faqs.map(([question,answer])=><details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </section>

    <section className="researchDisclaimer shell">
      <h2>Important risk and service disclosures</h2>
      <p>The Inner Circle is a proposed future offering. This page does not offer investment advice, sell memberships, accept funds or solicit transactions in securities or digital assets. Stocks, cryptocurrency and leveraged instruments involve material risk, including loss of capital. Any future paid investment research or advisory services will be evaluated against applicable law before launch. Gencouv will not republish third-party paid research without the necessary rights.</p>
      <a href="/risk-disclosure">Read risk disclosure ↗</a>
    </section>
    <footer className="researchFooter shell"><a href="/investment-intelligence">← Investment Intelligence</a><span>© 2026 Gencouv Capital</span><a href="/privacy">Privacy</a><a href="/terms">Terms</a></footer>
    <FloatingGencouvChat />
  </main>;
}
