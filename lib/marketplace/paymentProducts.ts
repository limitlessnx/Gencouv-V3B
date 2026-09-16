export const PAYMENT_PRODUCTS = {
  "sixtynine-ea-mt5-v1-30": { sku:"sixtynine-ea-mt5-v1-30", name:"SixtyNine EA MT5 v1.30", price:2000, currency:"usd", slug:"sixtynine", licenseTier:"standard", durationDays:null },
  "quantum-queen-mt5-v3-52": { sku:"quantum-queen-mt5-v3-52", name:"Quantum Queen MT5 EA v3.52", price:2000, currency:"usd", slug:"quantum-queen", licenseTier:"standard", durationDays:null },
  "lorc-gold-annual": { sku:"lorc-gold-annual", name:"L.O.R.C Gold — 1 Year License", price:1000, currency:"usd", slug:"lorc-gold-miner", licenseTier:"gold", durationDays:365 },
  "lorc-full-lifetime": { sku:"lorc-full-lifetime", name:"L.O.R.C Full Access — Lifetime", price:5000, currency:"usd", slug:"lorc-gold-miner", licenseTier:"full", durationDays:null },
} as const;

export type PaymentProductId = keyof typeof PAYMENT_PRODUCTS;

export function paymentProduct(id: string) {
  return PAYMENT_PRODUCTS[id as PaymentProductId];
}
