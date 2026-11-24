import HomeNavigation from "@/components/home/HomeNavigation";
import "../../home-redesign.css";
import "../../../investment-intelligence/research.css";
import "../../../inner-circle/inner-circle.css";
export default function InnerCircleCheckoutReturn(){
 return <main className="researchPage innerCirclePage"><HomeNavigation/>
  <section className="shell gcicReturn"><span className="researchKicker">NOWPAYMENTS / PAYMENT RETURN</span>
   <h1>Payment submitted.</h1>
   <p>Returning from checkout does not mean payment has been confirmed. Gencouv verifies payment notifications from NOWPayments before issuing any membership entitlement.</p>
   <p>After confirmation, check your email for sign-in instructions and your private member research page. Telegram access requires separate member verification.</p>
   <a className="researchPrimary" href="/inner-circle/member">Check member access ↗</a>
   <a className="researchSecondary" href="/inner-circle">Return to Inner Circle</a>
  </section></main>;
}
