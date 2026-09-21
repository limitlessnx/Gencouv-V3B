const linePath = "M8 154 C42 151 58 138 82 143 S120 119 146 126 S183 106 214 112 S253 92 283 97 S325 72 356 78 S395 54 430 60 S468 40 512 34";

export default function PortfolioDashboardVisual() {
  return (
    <div className="portfolioVisual" aria-label="Gencouv portfolio-management interface preview">
      <div className="dashboardFrame">
        <aside className="dashSide">
          <div className="dashMiniBrand"><span/><b>Gencouv</b></div>
          <nav>
            <span className="active">Dashboard</span>
            <span>Portfolio</span>
            <span>Strategy</span>
            <span>Trading</span>
            <span>Performance</span>
            <span>Reports</span>
          </nav>
          <div className="dashSideNote"><small>ACCOUNT MODEL</small><strong>Client-held funds</strong><p>Gencouv does not accept or hold PM deposits.</p></div>
        </aside>

        <section className="dashMain">
          <div className="dashHeader">
            <div><small>PORTFOLIO OVERVIEW</small><strong>Managed strategy</strong></div>
            <span className="dashLive"><i/> LIVE</span>
          </div>

          <div className="dashMetrics">
            <article><small>Account</small><strong>Client-held</strong><span>Broker account remains yours</span></article>
            <article><small>Strategy</small><strong>Systematic</strong><span>Defined execution framework</span></article>
            <article><small>Status</small><strong className="green">Active</strong><span>Subject to onboarding approval</span></article>
          </div>

          <div className="dashChart">
            <div className="chartCaption"><div><small>HISTORICAL RECORD</small><strong>Performance view</strong></div><span>1M&nbsp;&nbsp; 3M&nbsp;&nbsp; 1Y</span></div>
            <div className="dashGrid"/>
            <svg viewBox="0 0 520 180" preserveAspectRatio="none" aria-hidden="true">
              <path className="dashArea" d={`${linePath} L512 180 L8 180 Z`} />
              <path className="dashLine" d={linePath} />
            </svg>
            <div className="chartFoot"><span>Independent record</span><span>Historical performance</span><span>Risk visible</span></div>
          </div>
        </section>
      </div>

      <div className="phoneFrame">
        <div className="phoneSensor"/>
        <div className="phoneHeading"><small>GENCOUV PORTFOLIO</small><b>LIVE</b></div>
        <div className="phoneTitle"><span>Managed strategy</span><strong>Gencouv Portfolio</strong></div>
        <div className="phoneMiniChart">
          <svg viewBox="0 0 240 110" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 88 C22 78 31 58 48 66 S73 81 91 51 S122 36 139 61 S170 69 188 42 S218 48 240 24"/>
          </svg>
        </div>
        <div className="phoneFacts">
          <span><small>Status</small><b>Systematic</b></span>
          <span><small>Account</small><b>Client-held</b></span>
        </div>
        <a href="https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670" target="_blank" rel="noreferrer">View record <span>↗</span></a>
      </div>
    </div>
  );
}
