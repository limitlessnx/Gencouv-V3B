export type ProductCategory = "Expert Advisor" | "Indicator" | "Utility";
export type ValidationStatus = "BACKTESTED" | "FORWARD TESTING" | "LIVE VERIFIED" | "LIVE MATERIAL";
export type ProductOrigin = "GENCOUV DEVELOPED" | "SELECTED SYSTEM";

export type MarketplaceProduct = {
  slug: string;
  name: string;
  version: string;
  type: ProductCategory;
  origin: ProductOrigin;
  platform: "MT5" | "TradingView" | "Multi-platform";
  market: string;
  strategy: string;
  frequency: string;
  price: string;
  validation: ValidationStatus;
  mark: string;
  description: string;
  features: string[];
};

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    slug: "sixtynine",
    name: "SixtyNine EA",
    version: "v1.30",
    type: "Expert Advisor",
    origin: "SELECTED SYSTEM",
    platform: "MT5",
    market: "XAUUSD",
    strategy: "Multi-strategy",
    frequency: "System driven",
    price: "$2,000",
    validation: "LIVE MATERIAL",
    mark: "69",
    description: "Gold-focused automated trading software with six integrated strategy layers, configurable risk profiles and structured trade management.",
    features: ["6 strategy layers", "ECN / RAW", "H1 / H4"],
  },
  {
    slug: "quantum-queen",
    name: "Quantum Queen",
    version: "v3.52",
    type: "Expert Advisor",
    origin: "SELECTED SYSTEM",
    platform: "MT5",
    market: "XAUUSD",
    strategy: "Automated Gold",
    frequency: "Selective",
    price: "$2,000",
    validation: "BACKTESTED",
    mark: "Q",
    description: "XAUUSD automated trading system presented with supplied configuration and MT5 Strategy Tester evidence.",
    features: ["208 test trades", "98% history quality", "MT5"],
  },
];

export const marketplaceCategories = ["All products", "Expert Advisors", "Indicators", "Utilities"] as const;
