import type { MarketplaceProduct } from "@/lib/marketplace/products";
import ValidationBadge from "./ValidationBadge";

export default function ProductSystemRow({ product:p,index }:{ product:MarketplaceProduct; index:number }) {
 return <article className="systemRow">
  <a className={`systemArt ${p.image ? "hasProductImage" : ""}`} href={`/marketplace/${p.slug}`} style={p.image ? {backgroundImage:`linear-gradient(90deg,rgba(2,7,8,.18),rgba(2,7,8,.02)),url(${p.image})`,backgroundSize:"cover",backgroundPosition:"center"} : undefined}>
   <span className="rowNumber">{String(index+1).padStart(2,"0")}</span>
   {!p.image && <><div className={`systemMark ${p.slug}`}>{p.mark}</div><div className="artGrid"/></>}
   <ValidationBadge status={p.validation}/>
  </a>
  <div className="systemContent"><div className="identity"><small>{p.origin} / {p.type} / {p.platform}</small><h3>{p.name}{p.version && <sup>{p.version}</sup>}</h3><p>{p.description}</p></div>
   <div className="systemData"><div><span>MARKET</span><b>{p.market}</b></div><div><span>STRATEGY</span><b>{p.strategy}</b></div><div><span>FREQUENCY</span><b>{p.frequency}</b></div></div>
   <div className="systemBottom"><div className="featureLine">{p.features.map(x=><span key={x}>{x}</span>)}</div><div className="purchase"><span>{p.plans ? "LICENSES" : "LICENSE"}</span><strong>{p.pricePrefix && <small>{p.pricePrefix} </small>}{p.price}</strong></div><div className="rowActions"><a className="primary" href={`/marketplace/${p.slug}`}>Explore system</a><a className="iconAction" aria-label={`View ${p.name}`} href={`/marketplace/${p.slug}`}>↗</a></div></div>
  </div>
 </article>;
}
