import Link from "next/link";

export default function ResearchFooter() {
  return (
    <footer className="researchSiteFooter">
      <div className="shell researchFooterMain">
        <div className="researchFooterBrand">
          <Link href="/" className="researchFooterLogo" aria-label="Gencouv Capital homepage">
            <span className="researchFooterMark">G</span>
            <span><strong>GENCOUV</strong><small>CAPITAL · RESEARCH &amp; TRADING TECHNOLOGY</small></span>
          </Link>
          <p>Independent market intelligence, systematic trading technology and transparent research for informed market participants.</p>
        </div>
        <div className="researchFooterGroup">
          <h2>Explore</h2>
          <Link href="/investment-intelligence">Investment Intelligence</Link>
          <Link href="/research">Research Archive</Link>
          <Link href="/inner-circle">Inner Circle</Link>
          <Link href="/copy-trading">Copy Trading</Link>
        </div>
        <div className="researchFooterGroup">
          <h2>Gencouv</h2>
          <Link href="/marketplace">Trading Bots</Link>
          <Link href="/about">About</Link>
          <Link href="/roadmap">Resources</Link>
          <a href="https://t.me/gencouv" target="_blank" rel="noopener noreferrer">Contact support ↗</a>
        </div>
        <div className="researchFooterGroup">
          <h2>Legal</h2>
          <Link href="/risk-disclosure">Risk Disclosure</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
      <div className="shell researchFooterBottom">
        <p>© 2026 Gencouv Capital. All rights reserved.</p>
        <p>Investing and leveraged trading involve risk. No returns are guaranteed.</p>
        <Link href="/">Back to homepage ↑</Link>
      </div>
    </footer>
  );
}
