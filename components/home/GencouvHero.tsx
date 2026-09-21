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
        <p>Gencouv combines managed portfolio strategies and automated trading technology with disciplined execution, client-held brokerage accounts and transparent risk information.</p>

        <div className="heroCtas">
          <a className="heroPrimary" href="/portfolio-management">Start with Gencouv <span>↗</span></a>
          <a className="heroSecondary" href={myfxbook} target="_blank" rel="noreferrer">View performance</a>
        </div>

        <div className="heroPrinciples">
          <span><i>▥</i><b>Managed strategies</b><small>Defined portfolio framework</small></span>
          <span><i>⌁</i><b>Automated trading</b><small>Systematic execution</small></span>
          <span><i>◇</i><b>Disciplined approach</b><small>Risk before returns</small></span>
        </div>

        <PortfolioDashboardVisual />
        <HeroTrustStrip />
      </div>
    </section>
  );
}
