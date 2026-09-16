"use client";

import { useState } from "react";
import type { MarketplaceProduct } from "@/lib/marketplace/products";
import { marketplaceCategories } from "@/lib/marketplace/products";
import ProductSystemRow from "./ProductSystemRow";

export default function ProductFilters({ products }: { products: MarketplaceProduct[] }) {
  const [active, setActive] = useState<(typeof marketplaceCategories)[number]>("All products");
  const visible = products.filter(product => active === "All products" || (active === "Expert Advisors" && product.type === "Expert Advisor") || (active === "Indicators" && product.type === "Indicator") || (active === "Utilities" && product.type === "Utility"));

  return <><div className="filterRail" role="tablist" aria-label="Marketplace product categories">{marketplaceCategories.map(category => <button key={category} type="button" className={active === category ? "active" : ""} onClick={() => setActive(category)} aria-pressed={active === category}>{category}</button>)}</div><div className="productStack">{visible.length ? visible.map((product,index)=><ProductSystemRow key={product.slug} product={product} index={index}/>) : <div className="emptyCatalog"><strong>Nothing here yet.</strong><p>Gencouv will publish products in this category after they are ready for the marketplace.</p></div>}</div></>;
}
