import "../copy-hero.css";
import "../home-redesign.css";
import "./copy-trading.css";
import HomeNavigation from "@/components/home/HomeNavigation";
import FloatingGencouvChat from "@/components/FloatingGencouvChat";

const signup="https://client.lirunex.com/auth/signup?partnerId=330505&affiliateId=37122";
const telegram="https://t.me/gencouv";

const steps=[
  ["01","Choose your profile","Compare the risk limits and return objectives. Pick the profile that matches the level of drawdown you can realistically tolerate."],
  ["02","Open your Lirunex account","Use the Gencouv registration link to create your brokerage account. Your trading capital stays in your own broker account."],
  ["03","Verify and fund","Complete Lirunex verification, then fund your account. Gencouv Copy Trading starts from $1,000."],
  ["04","Complete onboarding","Once verified and funded, continue to the Gencouv Telegram onboarding agent. The agent confirms verification, deposit amount and required onboarding details."],
  ["05","Connect to the strategy","After the checks pass, the eligible account is connected to the Gencouv master strategy. Only human confirmation means activation is complete."]
];

export default function CopyTradingPage(){
 return <main className="ctPage">
  <HomeNavigation/>
  <section className="ctHero shell">
   <div className="eyebrow left">GENCOUV COPY TRADING</div>
   <h1>Your account. Our strategy.<br/><em>Execution copied automatically.</em></h1>
   <p>Copy Trading lets eligible trading activity from a Gencouv master strategy be replicated to your own Lirunex account according to the configured copy setup. You retain your brokerage account and account visibility.</p>
   <div className="ctActions"><a className="primary" href={signup} target="_blank" rel="noreferrer">Create Lirunex account <span>↗</span></a><a className="secondary" href="#profiles">Compare profiles</a></div>
   <div className="ctFacts"><span><b>$1,000</b> minimum funding</span><span><b>Your account</b> stays with Lirunex</span><span><b>Human verified</b> before activation</span></div>
  </section>

  <section className="ctBand"><div className="shell ctExplain"><div><div className="eyebrow left">HOW IT WORKS</div><h2>Follow a strategy without handing over custody of your funds.</h2></div><div><p>After onboarding and connection, eligible trades from the selected Gencouv strategy can be copied to your brokerage account. Copying does not remove market risk. Execution, pricing and individual results can differ from the master strategy.</p><p>Gencouv does not accept or hold your trading deposit. Broker verification, funding and final Gencouv onboarding are separate steps.</p></div></div></section>

  <section id="profiles" className="section shell"><div className="sectionHead"><div><div className="eyebrow left">STRATEGY PROFILES</div><h2>Two profiles. Different risk boundaries.</h2></div><p>Return figures below are strategy objectives, not promises. Maximum drawdown is a risk limit, not a guarantee that losses will stop at an exact percentage under every market condition.</p></div>
   <div className="ctProfiles">
    <article className="ctProfile"><div className="ctProfileTop"><span>01</span><small>HIGHER RISK</small></div><h3>High Yield</h3><p>For clients who accept materially higher drawdown in pursuit of a more aggressive return objective.</p><div className="ctMetrics"><div><small>Return objective</small><strong>Up to 50%</strong></div><div><small>Max drawdown parameter</small><strong>30%</strong></div></div><a href={signup} target="_blank" rel="noreferrer">Start with High Yield <span>↗</span></a></article>
    <article className="ctProfile featured"><div className="ctProfileTop"><span>02</span><small>MODERATE RISK</small></div><h3>Balanced Yield</h3><p>For clients who prefer a lower drawdown parameter with a more measured return objective.</p><div className="ctMetrics"><div><small>Return objective</small><strong>15–30%</strong></div><div><small>Max drawdown parameter</small><strong>15%</strong></div></div><a href={signup} target="_blank" rel="noreferrer">Start with Balanced Yield <span>↗</span></a></article>
   </div>
  </section>

  <section className="ctJourney shell"><div className="sectionHead"><div><div className="eyebrow left">GETTING STARTED</div><h2>From interested to connected.</h2></div><p>No mystery tunnel. Five visible stages, with human verification before the account is connected.</p></div><div className="ctSteps">{steps.map(([n,t,d])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></article>)}</div></section>

  <section className="ctRouting shell"><div><div className="eyebrow left">ACCOUNT ROUTING</div><h2>Funding determines the Gencouv account route.</h2></div><div className="ctRouteCards"><article><small>$1,000–$9,999.99</small><strong>MT5 Standard Cent</strong><p>Gencouv onboarding route for Copy Trading deposits below $10,000.</p></article><article><small>$10,000+</small><strong>MT5 Standard</strong><p>Gencouv onboarding route for Copy Trading deposits from $10,000 upward.</p></article></div><p className="ctFine">These thresholds are Gencouv onboarding rules and should not be interpreted as universal Lirunex broker minimums or account requirements.</p></section>

  <section className="ctFinal shell"><div className="eyebrow">READY TO BEGIN?</div><h2>Create the account first.<br/>Onboard when funded.</h2><p>Register through the Gencouv Lirunex link, complete broker verification and fund your own account. Once that is done, the Telegram onboarding agent completes the final checks and connection process.</p><div className="ctActions"><a className="primary" href={signup} target="_blank" rel="noreferrer">Create Lirunex account <span>↗</span></a><a className="secondary" href={telegram} target="_blank" rel="noreferrer">Already verified & funded?</a></div><small>Trading foreign exchange and leveraged products involves substantial risk. Strategy objectives and historical results do not guarantee future performance. Individual results may vary.</small></section>
  <FloatingGencouvChat/>
 </main>
}