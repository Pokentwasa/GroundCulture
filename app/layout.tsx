import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import MobileUtilityBar from "@/components/MobileUtilityBar";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/jsonld";

// Self-hosted (vendored in app/fonts) so the build has no external font
// dependency. Anton = display/poster, Archivo = body, Space Mono = meta.
const display = localFont({
  src: "./fonts/anton-400.woff2",
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: "./fonts/archivo-var.woff2",
  weight: "100 900",
  variable: "--font-body",
  display: "swap",
});

const meta = localFont({
  src: [
    { path: "./fonts/space-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-meta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ground Culture | Cape Town Food, Comedy & Culture",
    template: "%s | Ground Culture",
  },
  description:
    "Cape Town's fastest-growing comedy club in Observatory. Coffee by day, culture by night. Comedy, live music, quiz nights, smash burgers and food trucks across the city.",
  keywords: [
    "Cape Town comedy club",
    "comedy Observatory",
    "Observatory cafe",
    "smash burgers Cape Town",
    "food truck Cape Town",
    "venue hire Observatory",
    "Cape Town events",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Ground Culture | Cape Town Food, Comedy & Culture",
    description: site.tagline,
    url: site.url,
    locale: "en_ZA",
    images: [{ url: site.defaultOgImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ground Culture | Cape Town Food, Comedy & Culture",
    description: site.tagline,
    images: [site.defaultOgImage],
  },
  alternates: { canonical: site.url },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-ZA"
      className={`no-js ${display.variable} ${body.variable} ${meta.variable}`}
    >
      <body>
        <JsonLd data={localBusinessSchema()} />
        <Cursor />
        <SmoothScroll>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <MobileUtilityBar />
      </body>
    </html>
  );
}
