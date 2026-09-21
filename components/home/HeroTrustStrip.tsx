const items = [
  ["Managed Strategy", "Structured portfolio management"],
  ["Client-held Funds", "Your broker account remains yours"],
  ["Systematic Execution", "Rules before impulse"],
  ["Risk Transparency", "Review risk before participation"],
];

export default function HeroTrustStrip() {
  return (
    <div className="heroTrustStrip" aria-label="Gencouv service principles">
      {items.map(([title, detail], index) => (
        <div className="heroTrustItem" key={title}>
          <span className="trustIcon" aria-hidden="true">{index === 0 ? "▥" : index === 1 ? "◉" : index === 2 ? "⌁" : "◇"}</span>
          <span><b>{title}</b><small>{detail}</small></span>
        </div>
      ))}
    </div>
  );
}
