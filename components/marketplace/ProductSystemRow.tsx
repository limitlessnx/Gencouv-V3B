import type { MarketplaceProduct } from "@/lib/marketplace/products";
import ValidationBadge from "./ValidationBadge";

export default function ProductSystemRow({ product: p, index }: { product: MarketplaceProduct; index: number }) {
  return <article className="systemRow">
    <a className="systemArt" href={`/marketplace/${p.slug}`}>
      <span className="rowNumber">{String(index + 1).padStart(2, "0")}</span>
      <div className={`systemMark ${p.slug}`}>{p.mark}</div><div className="artGrid"/>
      <ValidationBadge status={p.validation} />
    </a>
    <div className="systemContent">
      <div className="identity"><small>{p.origin} / {p.type} / {p.platform}</small><h3>{p.name}<sup>{p.version}</sup></h3><p>{p.description}</p></div>
      <div className="systemData"><div><span>MARKET</span><b>{p.market}</b></div><div><span>STRATEGY</span><b>{p.strategy}</b></div><div><span>FREQUENCY</span><b>{p.frequency}</b></div></div>
      <div className="systemBottom"><div className="featureLine">{p.features.map(x=><span key={x}>{x}</span>)}</div><div className="purchase"><span>LICENSE</span><strong>{p.price}</strong></div><div className="rowActions"><a className="primary" href={`/marketplace/${p.slug}`}>Explore system</a><a className="iconAction" aria-label={`Purchase ${p.name}`} href={`/checkout/${p.slug}`}>↗</a></div></div>
    </div>
  </article>;
}
