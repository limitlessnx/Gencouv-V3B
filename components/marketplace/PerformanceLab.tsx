import type { ProductDetail } from "@/lib/marketplace/productDetails";

export default function PerformanceLab({ product }: { product: ProductDetail }) {
 return <section id="performance" className="performanceLab"><div className="shell"><div className="labHead"><div><p className="kicker">PERFORMANCE LAB</p><h2>{product.performanceTitle}</h2></div><p>{product.performanceNote}</p></div><div className="labMetrics">{product.metrics.map(metric=><div key={metric.label} className={metric.tone === "risk" ? "riskMetric" : ""}><span>{metric.label}</span><strong>{metric.value}</strong></div>)}</div><div className="testContext"><span>TEST CONTEXT</span><p>{product.testContext}</p></div></div></section>;
}
