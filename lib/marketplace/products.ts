export type ProductCategory = "Expert Advisor" | "Indicator" | "Utility";
export type ValidationStatus = "BACKTESTED" | "FORWARD TESTING" | "LIVE VERIFIED" | "LIVE MATERIAL";
export type ProductOrigin = "GENCOUV DEVELOPED" | "SELECTED SYSTEM";
export type LicensePlan = { name:string; price:string; cadence?:string; summary:string; features:string[]; featured?:boolean };

export type MarketplaceProduct = {
  slug:string; name:string; version:string; type:ProductCategory; origin:ProductOrigin;
  platform:"MT5"|"TradingView"|"Multi-platform"; market:string; strategy:string; frequency:string;
  price:string; pricePrefix?:string; validation:ValidationStatus; mark:string; image?:string;
  description:string; features:string[]; plans?:LicensePlan[];
};

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    slug:"lorc-gold-miner", name:"L.O.R.C Gold Miner", version:"", type:"Expert Advisor", origin:"GENCOUV DEVELOPED", platform:"MT5", market:"XAUUSD", strategy:"Selective + recovery", frequency:"Selective", price:"$1,000", pricePrefix:"From", validation:"FORWARD TESTING", mark:"L", image:"https://d2ol7oe51mr4n9.cloudfront.net/user_3GTV38w6zCm0fb6vRYkPEmmsNnH/6d2bb3de-a380-4e1c-ac0e-6c0b832d85bc.jpg",
    description:"Gencouv-developed XAUUSD automation built around selective execution, structured risk control and adaptive recovery logic.",
    features:["XAUUSD", "Adaptive recovery", "Set-file ecosystem"],
    plans:[
      {name:"L.O.R.C Gold",price:"$1,000",cadence:"/ year",summary:"Focused access for traders deploying L.O.R.C on Gold.",features:["1-year L.O.R.C EA access","Gold / XAUUSD configuration files","Gold set-file updates during license","EA updates during license","Standard support"]},
      {name:"L.O.R.C Full Access",price:"$5,000",summary:"Long-term access to the complete Gencouv L.O.R.C research and configuration ecosystem.",features:["Lifetime L.O.R.C EA access","Gencouv-tested configurations for supported instruments","Continuous configuration releases as market conditions evolve","Lifetime EA updates","Dedicated priority support","Future optimization releases"],featured:true}
    ]
  },
  {slug:"sixtynine",name:"SixtyNine EA",version:"v1.30",type:"Expert Advisor",origin:"SELECTED SYSTEM",platform:"MT5",market:"XAUUSD",strategy:"Multi-strategy",frequency:"System driven",price:"$2,000",validation:"LIVE MATERIAL",mark:"69",image:"https://d8j0ntlcm91z4.cloudfront.net/user_3GTV38w6zCm0fb6vRYkPEmmsNnH/hf_20260920_090653_3ac79ed1-e989-4665-907c-cdc25a7135b4.png",description:"Gold-focused automated trading software with six integrated strategy layers, configurable risk profiles and structured trade management.",features:["6 strategy layers","ECN / RAW","H1 / H4"]},
  {slug:"quantum-queen",name:"Quantum Queen",version:"v3.52",type:"Expert Advisor",origin:"SELECTED SYSTEM",platform:"MT5",market:"XAUUSD",strategy:"Automated Gold",frequency:"Selective",price:"$2,000",validation:"BACKTESTED",mark:"Q",image:"https://d8j0ntlcm91z4.cloudfront.net/user_3GTV38w6zCm0fb6vRYkPEmmsNnH/hf_20260920_090653_58d0cec8-938b-4aec-bdda-be1708c30364.png",description:"XAUUSD automated trading system presented with supplied configuration and MT5 Strategy Tester evidence.",features:["208 test trades","98% history quality","MT5"]},
];

export const marketplaceCategories = ["All products","Expert Advisors","Indicators","Utilities"] as const;
