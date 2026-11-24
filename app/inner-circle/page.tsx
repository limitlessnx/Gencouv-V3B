import type { Metadata } from "next";
import HomeNavigation from "@/components/home/HomeNavigation";
import ResearchFooter from "@/components/research/ResearchFooter";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";
import "../home-redesign.css";
import "../investment-intelligence/research.css";
import "./inner-circle.css";

export const metadata:Metadata={
 title:"Gencouv Inner Circle | Multi-Asset Research, Metals & CFDs",
 description:"Explore Gencouv's $1,000 annual Inner Circle offering: equities, digital assets, gold and industrial metals, CFD market intelligence, bi-weekly macro research and a 20-stock Robotics & Physical AI watchlist.",
 alternates:{canonical:"/inner-circle"},
};

const markets=[
 {id:"01",eyebrow:"EQUITIES",title:"Stocks",subtitle:"Long-term and swing research",description:"Research businesses and structural investment themes across robotics supply chains, AI infrastructure and cyclical industries. We examine earnings, valuations, catalysts and bear cases before publishing a thesis.",tags:["Equity intelligence","Company analysis","Sector positioning"],risk:"Equity prices can fall substantially."},
 {id:"02",eyebrow:"DIGITAL ASSETS",title:"Crypto",subtitle:"Spot markets and cycle research",description:"Follow liquidity cycles, Bitcoin and leading blockchain networks, token economics, adoption signals and invalidation scenarios. Analysis focuses on evidence, not unverified entry-price claims.",tags:["Bitcoin","Market cycles","On-chain research"],risk:"Digital assets are highly volatile and can become illiquid."},
 {id:"03",eyebrow:"REAL ASSETS",title:"Precious & industrial metals",subtitle:"Gold, silver, copper and strategic materials",description:"Study monetary demand, industrial supply chains, inventory trends and the role of copper and critical metals in electrification, automation and infrastructure.",tags:["Gold & silver","Copper","Supply constraints"],risk:"Commodity prices respond to macro, industrial and geopolitical factors."},
 {id:"04",eyebrow:"DERIVATIVES",title:"CFDs",subtitle:"Tactical two-way market exposure",description:"Explore technical and macro market scenarios involving indices, forex, commodities and high-beta equities. Illustrative setups emphasize invalidation, volatility and defined risk rather than promises of precision.",tags:["Indices & forex","Long / short scenarios","Risk-to-reward"],risk:"CFDs use leverage; losses can be rapid, substantial and may exceed deposited margin depending on terms."},
];

const pillars=[
 {name:"Humanoid & autonomous fleets",desc:"Automation in surgery, logistics, defense and mobile robots"},
 {name:"Compute & physical AI brains",desc:"The chips, inference infrastructure and software behind autonomy"},
 {name:"Machine vision & sensors",desc:"LiDAR, precision sensing and visual perception"},
 {name:"Motion & industrial automation",desc:"Actuators, servos, factory robots and controls"},
];

const faqs=[
 ["What does the $1,000 annual membership include?","The Robotics 20 educational research dossier is prepared in the member area. Bi-weekly macro briefings and private Telegram access are separate membership deliverables awaiting operational verification. The $1,000 annual checkout is held until membership terms, delivery and authorization are confirmed."],
 ["Will I receive real-time trade calls?","Members receive independent market commentary, watchlists, catalysts and educational scenario analysis. Gencouv does not use this membership to place trades for members, issue personalized orders, or tell them exactly when to buy or sell. Specific recommendations or signals are not a deliverable."],
 ["Can CFDs lose more than I deposit?","CFDs are leveraged products. Depending on the broker, jurisdiction and negative-balance-protection rules, losses may be rapid and can exceed margin. They are not suitable for every investor."],
 ["Is the Robotics 20 a buy list?","No. The welcome dossier is an educational research universe spanning four areas of the robotics value chain. It is not a personalized recommendation, and it does not promise entry levels or returns."],
 ["When will I enter the private Telegram room?","After NOWPayments confirms the membership fee, we send a unique verification code. The member creates an account using the checkout email, confirms that email, and submits the code. Gencouv reviews the payment and identity match before providing a private Telegram invite. The group link is never public."],
 ["Can I buy access today?","The annual membership is a fee for research-community access, not a deposit for Gencouv to trade or manage. NOWPayments is integrated. Billing remains unavailable until membership scope, terms and private-invite delivery have been validated."],
 ["Does Inner Circle include EA licenses or copy trading?","No. Automated trading systems, copy trading and research membership are separate products with different terms, eligibility and risks."],
];

export default function InnerCirclePage(){
 return <main className="researchPage innerCirclePage gcicLanding">
  <HomeNavigation/>
  <section className="shell gcicHero">
   <div className="gcicHeroEyebrow"><span className="gcicDot"/> EQUITIES · DIGITAL ASSETS · PRECIOUS &amp; INDUSTRIAL METALS · CFDs</div>
   <p className="gcicPrivate">GENCOUV CAPITAL / INNER CIRCLE · PRIVATE MEMBERSHIP</p>
   <h1>Capital Moves Before the Narrative.<br/><em>We Position Before Both.</em></h1>
   <p className="gcicHeroLead">Multi-asset research and market watchlists across stocks, crypto, metals and CFDs. Follow the themes, catalysts and risk factors worth watching, then make your own trading and investment decisions.</p>
   <div className="gcicHeroActions"><a className="gcicButton" href="/checkout/inner-circle">Secure Annual Access — $1,000/yr <span aria-hidden="true">↗</span></a><a className="gcicOutlineButton" href="#markets">Explore asset coverage</a></div>
   <p className="gcicHeroNote">Robotics 20 member research is built. After a verified membership payment, members receive a unique code and request private Telegram access for manual review. <strong>Checkout is currently unavailable while regulatory and fulfillment checks are outstanding.</strong></p>
   <div className="gcicHeroProof" aria-label="Membership overview">
    <div><strong>04</strong><span>Asset class desks</span></div>
    <div><strong>20</strong><span>Robotics equities in the welcome brief</span></div>
    <div><strong>2×</strong><span>Target macro briefings per month</span></div>
    <div><strong>$1k</strong><span>Annual membership price</span></div>
   </div>
  </section>

  <section id="markets" className="shell gcicSection">
   <div className="gcicSectionHead"><div><span className="researchKicker">INSIDE THE ANNUAL MEMBERSHIP</span><h2>Four Asset Classes.<br/><em>One Unified Liquidity Framework.</em></h2></div><p>Markets expand and contract under changing liquidity conditions. We approach each asset class with its own evidence, market structure and downside framework.</p></div>
   <div className="gcicMarkets">{markets.map(m=><article key={m.id} className="gcicMarketCard">
    <div className="gcicMarketTop"><span>{m.id} / {m.eyebrow}</span><span aria-hidden="true">↗</span></div>
    <h3>{m.title}</h3><p className="gcicMarketSubtitle">{m.subtitle}</p><p>{m.description}</p>
    <div className="gcicMarketTags">{m.tags.map(t=><span key={t}>{t}</span>)}</div>
    <div className="gcicMarketRisk">{m.risk}</div>
   </article>)}</div>
  </section>

  <section className="gcicApproach"><div className="shell gcicApproachGrid">
   <div><span className="researchKicker">HOW OUR DESK THINKS</span><h2>Research before the trade.<br/>Risk before the story.</h2><p>Our research framework connects macro conditions, asset-specific research and disciplined scenario analysis. No framework eliminates the possibility of losses.</p></div>
   <div className="gcicApproachList">
    <article><span>01</span><div><h3>Read liquidity</h3><p>Review interest rates, volatility, funding and macro conditions.</p></div></article>
    <article><span>02</span><div><h3>Study the thesis</h3><p>Evaluate sources, structural catalysts, counterarguments and material events.</p></div></article>
    <article><span>03</span><div><h3>Define the downside</h3><p>State invalidation points, assumptions and whether a market is too risky.</p></div></article>
    <article><span>04</span><div><h3>Review the record</h3><p>Keep dated research updates, including cases where the thesis fails.</p></div></article>
   </div>
  </div></section>

  <section className="shell gcicSection" id="bonus">
   <div className="gcicBonusCard">
    <div className="gcicBonusIntro"><span className="researchKicker">COMPLIMENTARY MEMBERSHIP DOSSIER</span><div className="gcicBonusMark">20</div><h2>The Robotics 20.</h2><p className="gcicBonusLead">A 20-company Robotics &amp; Physical AI research universe spanning the hardware, intelligence and industrial infrastructure behind autonomous systems.</p><div className="gcicBonusChips"><span>20 equities</span><span>4 investment themes</span><span>Risk considerations</span></div><p className="gcicBonusSmall">Included with an active annual membership, after payment verification. The initial member brief is an educational watchlist, not a high-conviction buy list or an independently verified track record.</p><a className="gcicOutlineButton" href="/checkout/inner-circle">See annual membership ↗</a></div>
    <div className="gcicBonusPillars"><div className="gcicBonusPillarsHead">THE FOUR RESEARCH PILLARS</div>{pillars.map((p,i)=><div className="gcicPillar" key={p.name}><span>0{i+1}</span><div><h3>{p.name}</h3><p>{p.desc}</p></div></div>)}</div>
   </div>
  </section>

  <section className="shell gcicSection" id="membership">
   <div className="gcicSectionHead"><div><span className="researchKicker">GENCOUV INNER CIRCLE</span><h2>Research that earns your attention.</h2></div><p>Designed as one annual relationship, with clear deliverables, explicit risk disclosures and separate access from our Expert Advisor and copy-trading products.</p></div>
   <div className="gcicMembership">
    <div><span className="researchKicker">PRIVATE ANNUAL ACCESS</span><div className="gcicPrice">$1,000 <small>/ year</small></div><p>Research-community membership designed for experienced market participants, with independent coverage of equities, digital assets, precious and industrial metals, and CFDs.</p><div className="gcicBenefits"><span>Multi-asset desk intelligence</span><span>Bi-weekly macro briefings</span><span>Robotics 20 welcome dossier</span><span>Research archive access</span><span>Risk-aware setup analysis</span><span>Private Telegram group after verification</span></div><a className="gcicButton" href="/checkout/inner-circle">Secure Annual Access — $1,000/yr ↗</a><small>NOWPayments checkout is integrated. Payments remain unavailable until authorization, eligibility and fulfillment checks are verified. No automatic renewal.</small></div>
    <aside><span className="researchKicker">THE RIGHT EXPECTATIONS</span><h3>Serious analysis. No invented certainty.</h3><p>We will not claim historical calls at specific Bitcoin or Solana lows, verified analyst credentials or institutional trading results without independently reviewable evidence.</p><p>The Inner Circle covers general market observations, independent research and assets to monitor. It does not include managed accounts, personalized trading orders or promises of profitable entries.</p><a href="/investment-intelligence#newsletter">Get free research and launch updates ↗</a></aside>
   </div>
  </section>

  <section className="shell gcicSection" id="faq">
   <div className="gcicSectionHead"><div><span className="researchKicker">COMMON QUESTIONS</span><h2>Clarity before membership.</h2></div><p>Review the actual member deliverables, unresolved access requirements and relevant market risks.</p></div>
   <div className="gcicFaq">{faqs.map(([q,a])=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div>
  </section>
  <section className="shell researchDisclosureSection"><details className="researchLegalDetails"><summary><span><strong>Important risk and regulatory information</strong><small>CFDs, cryptocurrencies and securities can lose value. Click for the full membership notice.</small></span><b aria-hidden="true">+</b></summary><div className="researchLegalBody"><p>Gencouv Inner Circle offers market commentary, educational research and watchlists. The annual fee buys content and community access, not custody or management of member investment capital. Members are responsible for their own decisions, and specific paid buy or sell instructions are not included. Specific paid securities advice, trade calls or CFD recommendations will not be offered without required regulatory authorization and eligibility controls. CFDs involve leverage and can cause rapid losses. Educational watchlists and research are not personalized investment advice. The Robotics 20 dossier is a research starting universe, not an independently audited return record. The membership does not accept or manage investor trading capital, and no performance is guaranteed.</p><a href="/risk-disclosure">Read full risk disclosure ↗</a></div></details></section>
  <ResearchFooter/>
  <FloatingGencouvChat/>
 </main>;
}
