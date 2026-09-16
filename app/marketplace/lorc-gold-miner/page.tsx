import ProductDetailShell from "@/components/marketplace/ProductDetailShell";
import { productDetails } from "@/lib/marketplace/productDetails";

export default function LorcGoldMinerPage(){
  return <ProductDetailShell product={productDetails["lorc-gold-miner"]} />;
}
