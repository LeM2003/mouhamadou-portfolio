import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mouhamadou-portfolio.vercel.app"),
  title: "Mouhamadou Diouf — Tech-first Product Owner & AI Product Builder",
  description:
    "Mouhamadou Diouf construit des produits SaaS et web à Dakar, à l’intersection du produit, de la technologie et de l’intelligence artificielle.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mouhamadou Diouf — Tech-first Product Owner & AI Product Builder",
    description:
      "Produits SaaS, applications web et expériences IA conçus depuis Dakar.",
    url: "https://mouhamadou-portfolio.vercel.app",
    siteName: "Mouhamadou Diouf",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mouhamadou Diouf — Tech-first Product Owner & AI Product Builder",
    description:
      "Produits SaaS, applications web et expériences IA conçus depuis Dakar.",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
