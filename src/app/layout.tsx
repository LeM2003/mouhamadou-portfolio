import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/identite";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
import { Loader } from "@/components/Loader";
import { CommandPalette } from "@/components/CommandPalette";

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
  metadataBase: new URL(SITE_URL),
  title: "Mouhamadou Diouf — Développeur full stack web, data & IA · Dakar",
  description:
    "Mouhamadou Diouf, développeur full stack à Dakar : sites web et applications, tableaux de bord et automatisations IA pour entrepreneurs et PME. AI Product Builder & Product Owner chez Auryntix.",
  openGraph: {
    title: "Mouhamadou Diouf — Développeur full stack web, data & IA · Dakar",
    description:
      "Sites web, applications, tableaux de bord et automatisations IA conçus depuis Dakar.",
    url: SITE_URL,
    siteName: "Mouhamadou Diouf",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mouhamadou Diouf — Développeur full stack web, data & IA · Dakar",
    description:
      "Sites web, applications, tableaux de bord et automatisations IA conçus depuis Dakar.",
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
      <body className="min-h-full flex flex-col">
        <Loader />
        <SmoothScroll />
        <CustomCursor />
        <CommandPalette />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
