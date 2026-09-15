import type { ValidationStatus } from "@/lib/marketplace/products";

export default function ValidationBadge({ status }: { status: ValidationStatus }) {
  const verified = status === "LIVE VERIFIED";
  return <span className={`validationBadge ${verified ? "verified" : ""}`}><i />{status}</span>;
}
