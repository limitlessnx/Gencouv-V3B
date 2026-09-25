import PortfolioDashboardVisual from "./PortfolioDashboardVisual";
import HeroTrustStrip from "./HeroTrustStrip";

const myfxbook = "https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670";

export default function GencouvHero() {
  return (
    <section className="gencouvHero">
      <div className="heroGlow heroGlowOne"/>
      <div className="heroGlow heroGlowTwo"/>
      <div className="heroArc heroArcOne"/>
      <div className="heroArc heroArcTwo"/>
      <div className="heroBars" aria-hidden="true">{Array.from({ length: 12 }).map((_, i) => <i key={i}/>)}</div>

      <div className="heroInner shell">
        <div className="heroKicker">AUTOMATED TRADING. DISCIPLINED EXECUTION.</div>
        <h1>A Smarter Way to<br/><em>Build With Structure.</em></h1>
        <p>Gencouv Copy Trading connects eligible clients to structured master strategies while their trading capital remains in their own brokerage account, with transparent risk profiles and human-verified onboarding.</p>

        <div className="heroCtas">
          <a className="heroPrimary" href="/copy-trading">Explore Copy Trading <span>↗</span></a>
          <a className="heroSecondary" href={myfxbook} target="_blank" rel="noreferrer">View performance</a>
        </div>

        <div className="heroPrinciples">
          <span><i>▥</i><b>Two risk profiles</b><small>High Yield or Balanced Yield</small></span>
          <span><i>⌁</i><b>Copy Trading</b><small>Master-strategy execution</small></span>
          <span><i>◇</i><b>Client-held funds</b><small>Your own broker account</small></span>
        </div>

        <PortfolioDashboardVisual />
        <HeroTrustStrip />
      </div>
    </section>
  );
}
