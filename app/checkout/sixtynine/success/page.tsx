export default function SixtyNineCheckoutSuccessPage() {
  return (
    <main>
      <nav className="nav shell"><a className="brand" href="/"><span>G</span><div><b>GENCOUV</b><small>AI TRADING TECHNOLOGY</small></div></a><div className="links"><a href="/marketplace">Marketplace</a><a href="#support">Support</a></div></nav>
      <section className="shell successWrap">
        <div className="successCard">
          <div className="statusMark">✓</div>
          <div className="eyebrow">PAYMENT RETURNED</div>
          <h1>Payment submitted.</h1>
          <p>NOWPayments has returned you to Gencouv. Your order is not treated as paid solely because this page was reached. Gencouv must receive and verify the payment confirmation from the payment gateway before product access is released.</p>
          <div className="notice"><b>What happens next</b><span>Keep your NOWPayments payment or order reference. Once the transaction reaches the required confirmed status, Gencouv can proceed with digital-product delivery.</span></div>
          <div className="actions"><a className="primary" href="/marketplace">Return to Marketplace</a><a className="secondary" href="/#support">Contact support</a></div>
        </div>
      </section>
      <style>{`.successWrap{padding:110px 0;display:grid;place-items:center}.successCard{width:min(760px,100%);padding:clamp(28px,6vw,62px);border:1px solid rgba(53,228,192,.22);border-radius:28px;background:linear-gradient(145deg,rgba(7,31,31,.9),rgba(3,12,14,.97));text-align:center}.statusMark{width:72px;height:72px;margin:0 auto 22px;display:grid;place-items:center;border-radius:50%;border:2px solid #35e4c0;color:#35e4c0;font-size:34px}.successCard h1{font-size:clamp(46px,8vw,82px);line-height:.95;letter-spacing:-.055em;margin:16px 0 24px}.successCard>p{color:#a9b8b5;line-height:1.75;font-size:16px}.notice{display:grid;gap:8px;margin:28px 0;padding:18px;border:1px solid rgba(255,255,255,.08);border-radius:16px;text-align:left;background:rgba(255,255,255,.025)}.notice b{color:#35e4c0}.notice span{color:#8d9c99;line-height:1.6;font-size:13px}.actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:28px}`}</style>
    </main>
  );
}
