import { Suspense } from "react";
import ResearchConfirmAction from "@/components/research/ResearchConfirmAction";
import HomeNavigation from "@/components/home/HomeNavigation";
import "../research.css";
import "../../home-redesign.css";

export default function ResearchConfirmPage() {
  return <main className="researchPage"><HomeNavigation />
    <Suspense fallback={<div className="shell researchHero">Loading...</div>}>
      <ResearchConfirmAction />
    </Suspense>
  </main>;
}
