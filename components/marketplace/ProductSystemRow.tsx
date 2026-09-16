import type { MarketplaceProduct } from "@/lib/marketplace/products";
import ValidationBadge from "./ValidationBadge";

export default function ProductSystemRow({ product:p }:{ product:MarketplaceProduct; index:number }) {
 const checkout = `/checkout/${p.slug}`;
 return <article className="productCard">
  <a className={`productImage ${p.image ? "hasProductImage" : ""}`} href={`/marketplace/${p.slug}`} style={p.image ? {backgroundImage:`url(${p.image})`} : undefined}>
   {!p.image && <div className={`productArtwork ${p.slug}`}><span>{p.mark}</span><small>{p.name}</small></div>}
   <div className="cardBadge"><ValidationBadge status={p.validation}/></div>
  </a>
  <div className="productBody">
   <div className="productMeta"><span>{p.type}</span><span>{p.platform}</span></div>
   <h3><a href={`/marketplace/${p.slug}`}>{p.name}</a>{p.version && <sup>{p.version}</sup>}</h3>
   <p>{p.description}</p>
   <div className="productSpecs"><span>{p.market}</span><span>{p.strategy}</span><span>{p.frequency}</span></div>
   <div className="productBuy"><div><small>{p.plans ? "STARTING FROM" : "LICENSE"}</small><strong>{p.price}</strong></div><div className="productActions"><a className="secondaryBuy" href={`/marketplace/${p.slug}`}>View Product</a><a className="primaryBuy" href={checkout}>Buy Now</a></div></div>
  </div>
 </article>;
}
