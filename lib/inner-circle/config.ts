import "server-only";

/** Default-deny: never accept regulated membership payments until reviewed. */
export function innerCircleCheckoutEnabled(): boolean {
  return process.env.INNER_CIRCLE_COMPLIANCE_APPROVED === "true"
    && process.env.INNER_CIRCLE_FULFILLMENT_READY === "true"
    && process.env.INNER_CIRCLE_CHECKOUT_ENABLED === "true";
}
