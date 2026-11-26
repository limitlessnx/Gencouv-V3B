export default function HomeNavigation() {
  return (
    <nav className="homeNav shell" aria-label="Primary navigation">
      <a className="homeBrand" href="/" aria-label="Gencouv home">
        <img className="gencouvLogoMark" src="/assets/gencouv-logo-white.png" alt="" width="40" height="40" />
        <span className="homeBrandText"><b>GENCOUV</b><small>TRADING · RESEARCH · TECHNOLOGY</small></span>
      </a>

      <div className="homeNavLinks">
        <a className="active" href="/">Home</a>
        <a href="/copy-trading">Copy Trading</a>
        <a href="https://www.myfxbook.com/portfolio/gencouv-lirunex-pm/12165670" target="_blank" rel="noreferrer">Performance</a>
        <a href="/marketplace">Trading Bots</a>
        <a href="/investment-intelligence">Investment Intelligence</a>
        <a href="/roadmap">Resources</a>
        <a href="/about">About</a>
      </div>

      <div className="homeNavAuth">
        <a className="homeLogin" href="/login">Log in</a>
        <a className="homeCreate" href="/signup">Create account</a>
      </div>
    </nav>
  );
}
