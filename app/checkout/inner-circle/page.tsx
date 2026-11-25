import type { Metadata } from "next";
import HomeNavigation from "@/components/home/HomeNavigation";
import ResearchFooter from "@/components/research/ResearchFooter";
import InnerCirclePaymentClient from "./InnerCirclePaymentClient";
import { innerCircleCheckoutEnabled } from "@/lib/inner-circle/config";
import "../../home-redesign.css";
import "../../investment-intelligence/research.css";
import "../../inner-circle/inner-circle.css";

export const metadata:Metadata={title:"Principal Access Annual Membership | Gencouv Capital",robots:{index:false,follow:false}};
export const dynamic="force-dynamic";

export default function InnerCircleCheckoutPage(){
 const enabled=innerCircleCheckoutEnabled();
 return <main className="researchPage innerCirclePage">
   <HomeNavigation/>
   <section className="shell gcicCheckout">
     <a href="/inner-circle">← Back to Principal Access</a>
     <div className="gcicCheckoutGrid">
      <div className="gcicCheckoutIntro">
       <span className="researchKicker">ANNUAL MEMBERSHIP / SECURE PAYMENT</span>
       <h1>Gencouv Principal Access.</h1>
       <p>Annual Inner Circle access covers an educational multi-asset research area, subject to verified regional eligibility. The Robotics 20 member research page is built; live calls are not included in the current deliverable.</p>
       <ul><li>Bi-weekly macro briefings (schedule pending operational verification)</li><li>20-company Robotics &amp; Physical AI educational watchlist</li><li>Member research access after payment verification</li><li>Private Telegram access after verification, once the invite system is operational</li></ul>
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
