import type { Metadata } from "next";
import MobileSidebarMenu from "@/components/MobileSidebarMenu";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gencouv | AI Trading Automation, EAs & Indicators",
  description: "Explore automated trading systems, Expert Advisors, AI-assisted indicators and guided onboarding for systematic market participation.",
  metadataBase: new URL("https://gencouv.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <MobileSidebarMenu />
      </body>
    </html>
  );
}
