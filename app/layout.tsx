import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgentiqBridge | SAP, AI & Executive Recruitment",
  description:
    "AgentiqBridge connects elite companies with top-tier SAP consultants, AI specialists, and executive leaders. Precision recruitment at the intersection of technology and talent.",
  keywords: ["SAP Recruitment", "AI Recruitment", "Headhunting", "Tech Talent", "Executive Search"],
  openGraph: {
    title: "AgentiqBridge | SAP, AI & Executive Recruitment",
    description: "Precision recruitment at the intersection of technology and talent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${outfit.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
