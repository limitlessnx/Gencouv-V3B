export type PerformanceMetric = { label:string; value:string; tone?:"risk"|"default" };
export type ProductDetail = {
 slug:string; name:string; version:string; eyebrow:string; tagline:string; description:string; price:string; mark:string;
 overview:string[]; specs:{label:string;value:string}[]; metrics:PerformanceMetric[]; performanceTitle:string; performanceNote:string; testContext:string;
 riskTitle:string; riskBody:string; requirements:string[]; updates:string[];
};

export const productDetails:Record<string,ProductDetail> = {
 "quantum-queen": {
  slug:"quantum-queen", name:"Quantum Queen", version:"v3.52", eyebrow:"EXPERT ADVISOR / MT5", tagline:"Gold automation, presented with the evidence attached.",
  description:"An XAUUSD automated trading system for MetaTrader 5, presented with supplied configuration and MT5 Strategy Tester evidence rather than invented performance claims.", price:"$2,000", mark:"Q",
  overview:["The supplied EA configuration identifies Quantum Queen MT5 v3.52 as an XAUUSD system and states that chart timeframe does not matter because the EA manages its timeframe internally.","The configuration includes automatic or fixed-lot controls, spread and slippage parameters, strategy-set selection and an on-chart control panel. Configuration facts and historical test results are deliberately kept separate."],
  specs:[{label:"Platform",value:"MetaTrader 5"},{label:"Market",value:"Gold / XAUUSD"},{label:"Version",value:"3.52"},{label:"Fixed lot in supplied test",value:"0.01"},{label:"Fixed balance reference",value:"$500"},{label:"Magic number",value:"1234"}],
  metrics:[{label:"Initial deposit",value:"$1,000"},{label:"Net profit",value:"$4,398.67"},{label:"Profit factor",value:"7.81"},{label:"Profitable trades",value:"80.29%"},{label:"Max balance DD",value:"3.75%"},{label:"Relative equity DD",value:"47.29%",tone:"risk"}],
  performanceTitle:"What the supplied MT5 report actually shows.", performanceNote:"Historical simulation, not a live account record and not a forecast. Profit and drawdown belong in the same conversation.", testContext:"MT5 Strategy Tester · XAUUSDz · M15 · 1 Jan 2026 to 20 Apr 2026 · Exness Technologies Ltd · USD account · 1:100 leverage · 98% history quality · 208 trades.",
  riskTitle:"The equity drawdown matters.", riskBody:"The supplied test recorded 47.29% relative equity drawdown despite a much smaller 3.75% maximal balance drawdown. Backtests can differ substantially from live execution because of spreads, slippage, latency, broker conditions, symbol specifications, market regime and configuration.",
  requirements:["MetaTrader 5","Gold / XAUUSD symbol compatibility","Review broker symbol specification before deployment","Understand lot and risk configuration before activation"],
  updates:["Current marketplace version: 3.52","Configuration evidence documented on product page","Future releases and compatibility notes will be recorded here"]
 }
};
