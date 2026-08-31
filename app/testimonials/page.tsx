const telegram = "https://t.me/Gencou_bot?start=client_experiences";

const principles = [
  ["Privacy first", "Client identities can be abbreviated when a client prefers not to publish their full name."],
  ["No invented reviews", "Only feedback attributable to an actual Gencouv client should appear as a testimonial."],
  ["No performance promises", "Client comments are personal experiences and must never be presented as evidence of future returns."],
];

export default function TestimonialsPage() {
  return <main>
    <section className="pageHero shell">
      <div className="eyebrow">CLIENT EXPERIENCES</div>
      <h1>Trust should be earned, not manufactured.</h1>
      <p>Gencouv publishes client feedback only when it can be attributed to a genuine client. Where privacy is requested, names may be abbreviated and identifying details limited.</p>
    </section>

    <section className="section shell">
      <div className="sectionHead"><div><div className="eyebrow left">OUR STANDARD</div><h2>What you will see here.</h2></div><p>We would rather show fewer credible experiences than fill this page with fictional people, generated portraits or unverifiable claims.</p></div>
      <div className="knowledgeGrid">{principles.map(([title, description], i) => <article className="knowledgeCard" key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="section shell">
      <div className="emptyState"><div className="eyebrow">VERIFIED FEEDBACK</div><h2>Client experiences are being verified for publication.</h2><p>Approved feedback will appear with privacy-conscious attribution such as “James A. · United Kingdom” or “M*** K. · UAE” only when those details are genuine and the client has approved publication.</p><a className="primary" href={telegram} target="_blank" rel="noreferrer">Speak with Gencouv <span>↗</span></a></div>
    </section>

    <section className="risk"><div className="shell riskGrid"><div><div className="eyebrow left">IMPORTANT CONTEXT</div><h2>Experience is not a guarantee.</h2></div><p>Testimonials describe individual experiences and should not be interpreted as a promise of profit or future performance. Trading involves substantial risk, and results can differ between accounts, market conditions and risk settings. Review Gencouv's risk disclosure and independently assess whether participation is appropriate.</p></div></section>
  </main>;
}
