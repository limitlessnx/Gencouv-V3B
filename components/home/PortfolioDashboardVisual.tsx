const linePath = "M8 154 C42 151 58 138 82 143 S120 119 146 126 S183 106 214 112 S253 92 283 97 S325 72 356 78 S395 54 430 60 S468 40 512 34";

export default function PortfolioDashboardVisual() {
  return (
    <div className="portfolioVisual" aria-label="Illustrative Gencouv portfolio-management performance preview">
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
          <div className="dashSideNote">
            <small>ACCOUNT MODEL</small>
            <strong>Client-held funds</strong>
            <p>Gencouv does not accept or hold PM deposits.</p>
          </div>
        </aside>

        <section className="dashMain">
          <div className="dashHeader">
            <div><small>PORTFOLIO OVERVIEW</small><strong>Managed strategy</strong></div>
            <span className="dashLive"><i/> DEMO PREVIEW</span>
          </div>

          <div className="dashHeroStat">
            <div className="dashGrowth">
              <small>Illustrative performance</small>
              <strong>+$65,000</strong>
              <p>70% growth over the last 5 months</p>
            </div>
            <div className="dashBalances">
              <div><small>Starting Balance</small><b>$100,000</b></div>
              <div><small>Current Equity</small><b>$165,000</b></div>
            </div>
          </div>

          <div className="dashMetrics">
            <article><small>Status</small><strong className="green">Systematic</strong><span>Rules before impulse</span></article>
            <article><small>Account</small><strong>Client-held</strong><span>Broker account remains yours</span></article>
            <article><small>Execution</small><strong>Automated</strong><span>Structured portfolio framework</span></article>
          </div>

          <div className="dashChart">
            <div className="chartCaption">
              <div><small>DEMO PERFORMANCE VIEW</small><strong>5-month growth path</strong></div>
              <span>1M&nbsp;&nbsp; 3M&nbsp;&nbsp; 5M</span>
            </div>
            <div className="dashGrid"/>
            <svg viewBox="0 0 520 180" preserveAspectRatio="none" aria-hidden="true">
              <path className="dashArea" d={`${linePath} L512 180 L8 180 Z`} />
              <path className="dashLine" d={linePath} />
            </svg>
            <div className="chartFoot"><span>Illustrative demo</span><span>Not a guaranteed outcome</span><span>Risk applies</span></div>
          </div>
        </section>
      </div>

      <div className="phoneFrame">
        <div className="phoneSensor"/>
        <div className="phoneHeading"><small>GENCOUV PORTFOLIO</small><b>DEMO</b></div>

        <div className="phoneTitle">
          <span>Managed Strategy</span>
          <strong>+$65,000</strong>
          <p>70% growth over the last 5 months</p>
        </div>

        <div className="phoneMiniChart">
          <svg viewBox="0 0 240 110" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="phoneChartFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3de8b2" stopOpacity=".28"/>
                <stop offset="100%" stopColor="#3de8b2" stopOpacity=".02"/>
              </linearGradient>
            </defs>
            <path className="phoneChartArea" d="M0 88 C22 78 31 58 48 66 S73 81 91 51 S122 36 139 61 S170 69 188 42 S218 48 240 24 L240 110 L0 110 Z"/>
            <path className="phoneChartLine" d="M0 88 C22 78 31 58 48 66 S73 81 91 51 S122 36 139 61 S170 69 188 42 S218 48 240 24"/>
          </svg>
        </div>

        <div className="phonePerformanceGrid">
          <div><small>Starting Balance</small><b>$100,000</b></div>
          <div><small>Current Equity</small><b>$165,000</b></div>
        </div>

        <div className="phoneFacts">
          <span><small>Status</small><b>Systematic</b></span>
          <span><small>Account</small><b>Client-held</b></span>
        </div>

        <a href="https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670" target="_blank" rel="noreferrer">
          View record <span>↗</span>
        </a>
        <small className="phoneDisclaimer">Illustrative demo only. Trading involves risk.</small>
      </div>
    </div>
  );
}
