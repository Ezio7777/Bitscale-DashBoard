import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bitscale — GTM Intelligence Platform",
  description: "Find companies, enrich leads, and power your go-to-market workflows.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
