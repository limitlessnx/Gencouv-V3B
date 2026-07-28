import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gencouv | Automated Trading Technology',
  description: 'Broker-connected copy trading, expert advisors and professional indicators engineered for systematic execution.',
  metadataBase: new URL('https://gencouv.com'),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
