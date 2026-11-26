import type { Metadata } from "next";
import HomeNavigation from "@/components/home/HomeNavigation";
import ResearchFooter from "@/components/research/ResearchFooter";
import InnerCirclePaymentClient from "./InnerCirclePaymentClient";
import { innerCircleCheckoutEnabled } from "@/lib/inner-circle/config";
import "../../home-redesign.css";
import "../../investment-intelligence/research.css";
import "../../inner-circle/inner-circle.css";

export const metadata:Metadata={title:"Prime Trade Calls Access | Gencouv Capital",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";

export default function InnerCircleCheckoutPage(){
 const enabled=innerCircleCheckoutEnabled();
 return <main className="researchPage innerCirclePage">
   <HomeNavigation/>
   <section className="shell gcicCheckout">
     <a href="/inner-circle">← Back to Prime Access</a>
     <div className="gcicCheckoutGrid">
      <div className="gcicCheckoutIntro">
       <span className="researchKicker">ANNUAL MEMBERSHIP / SECURE PAYMENT</span>
       <h1>Gencouv Prime Trade Calls Access.</h1>
       <p>Annual private market-intelligence membership covering stocks, crypto, forex, metals and CFDs. Members receive market commentary and setups to watch, not personalized orders or trades executed on their behalf.</p>
       <ul><li>Multi-asset trade-call discussions and market observations</li><li>Macro themes, catalysts and trade-setup analysis</li><li>Unique membership code after verified payment</li><li>Private Telegram invitation after account verification and manual approval</li></ul>
      </div>
      <aside className="gcicCheckoutBox">
       <span className="researchKicker">MEMBERSHIP TOTAL</span>
       <div className="gcicCheckoutAmount">$1,000 <small>/ year</small></div>
       <p>Same NOWPayments gateway used for Gencouv EA purchases. Trading-related content does not guarantee profit.</p>
       <InnerCirclePaymentClient enabled={enabled}/>
       <p className="gcicCheckoutRisk">Stocks, cryptocurrencies, metals and CFDs involve significant risk. Leverage increases potential losses. Please read the <a href="/risk-disclosure">risk disclosure</a> and <a href="/terms">membership terms</a>.</p>
      </aside>
     </div>
   </section>
   <ResearchFooter/>
  </main>;
}
