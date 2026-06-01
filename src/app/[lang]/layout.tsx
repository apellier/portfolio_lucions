import type { Metadata, Viewport } from "next";
import { syne, outfit } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lucions — Photography Portfolio",
    template: "%s | Lucions",
  },
  description:
    "A curated collection of photography by Lucions — from bold black & white contrasts to vibrant, energetic color work.",
  metadataBase: new URL("https://lucions.com"),
  openGraph: {
    title: "Lucions — Photography Portfolio",
    description:
      "A curated collection of photography by Lucions — from bold black & white contrasts to vibrant, energetic color work.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};


interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<LayoutProps>) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${syne.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
