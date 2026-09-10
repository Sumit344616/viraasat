import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/data/brand";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viraasat-couture.com"),
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: `${BRAND.name} is an Indian luxury couture textile house dedicated to the preservation and architectural elevation of handloom silk sarees. Experience the 3D showcase.`,
  keywords: [
    "Luxury Indian Saree",
    "Banarasi Silk",
    "Kanjeevaram Handloom",
    "Indian Haute Couture",
    "Pure Zari Saree",
    "Handwoven Silk",
    "VIRAASAT",
  ],
  authors: [{ name: BRAND.name }],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero_model.jpg",
        width: 1200,
        height: 1600,
        alt: `${BRAND.name} Royal Banarasi Silk Saree`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
    images: ["/images/hero_model.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth selection:bg-vermillion selection:text-ivory`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-ivory text-dark font-sans relative antialiased selection:bg-vermillion selection:text-ivory"
      >
        {/* Film grain layer for cinematic texture */}
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
