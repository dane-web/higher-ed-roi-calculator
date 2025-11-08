import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Education ROI Calculator',
  description: 'Calculate AI automation ROI for higher education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
