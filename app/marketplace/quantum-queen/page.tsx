import ProductDetailShell from "@/components/marketplace/ProductDetailShell";
import { productDetails } from "@/lib/marketplace/productDetails";

export default function QuantumQueenProductPage(){
  return <ProductDetailShell product={productDetails["quantum-queen"]} />;
}
