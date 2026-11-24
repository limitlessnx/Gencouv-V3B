import "server-only";
import { createHmac,timingSafeEqual } from "node:crypto";

const prefix="GCIC-";

/** A secret-derived, non-guessable code for a verified NOWPayments order.
 * Do not expose the payment-signature secret, which is used as the HMAC key. */
export function memberAccessCode(orderId:string):string{
  const secret=process.env.NOWPAYMENTS_IPN_SECRET;
  if(!secret)throw new Error("NOWPayments verification secret is not configured");
  const digest=createHmac("sha256",secret).update("gencouv-inner-circle-member-code:v1:"+orderId).digest("hex").slice(0,20).toUpperCase();
  return prefix+digest.match(/.{1,5}/g)?.join("-")!;
}
export function compareMemberCode(orderId:string,submitted:string):boolean{
 const expected=memberAccessCode(orderId);
 const a=Buffer.from(expected,"utf8"),b=Buffer.from(submitted.trim().toUpperCase(),"utf8");
 return a.length===b.length && timingSafeEqual(a,b);
}
