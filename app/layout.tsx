import type { Metadata } from "next";
import { Spectral, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s — The Global Ledger",
    default: "The Global Ledger — How the world taxes money, decoded every week",
  },
  description:
    "Plain-English deep dives on how the world taxes money — for founders, students, and curious professionals. Free weekly issues, backed by data.",
  metadataBase: new URL("https://thegloballedger.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spectral.variable} ${ibmPlexMono.variable}`}>
      <body className="font-spectral text-ink bg-paper text-[18px] leading-[1.6]">
        {children}
      </body>
    </html>
  );
}
