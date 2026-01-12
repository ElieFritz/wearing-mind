import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://frontend-iota-flax-11.vercel.app'),
  title: {
    default: "WEARING MIND | Premium Streetwear & Sustainable Fashion",
    template: "%s | WEARING MIND"
  },
  description: "Discover WEARING MIND's exclusive collection of sustainable streetwear. Premium hoodies, t-shirts, and sweatshirts crafted with consciousness. Limited edition drops. Ethically made in Portugal.",
  keywords: [
    "streetwear",
    "sustainable fashion",
    "premium clothing",
    "organic cotton",
    "ethical fashion",
    "limited edition",
    "hoodies",
    "t-shirts",
    "sweatshirts",
    "conscious clothing",
    "Portugal made",
    "WEARING MIND"
  ],
  authors: [{ name: "WEARING MIND" }],
  creator: "WEARING MIND",
  publisher: "WEARING MIND",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://frontend-iota-flax-11.vercel.app",
    siteName: "WEARING MIND",
    title: "WEARING MIND | Premium Streetwear & Sustainable Fashion",
    description: "Exclusive sustainable streetwear collection. Premium hoodies, t-shirts & sweatshirts. Ethically made with organic cotton.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WEARING MIND - Premium Streetwear Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEARING MIND | Premium Streetwear",
    description: "Exclusive sustainable streetwear. Ethically made premium clothing.",
    images: ["/images/og-image.jpg"],
    creator: "@wearingmind",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://frontend-iota-flax-11.vercel.app" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1E2A5A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              "name": "WEARING MIND",
              "description": "Premium sustainable streetwear brand offering exclusive collections of hoodies, t-shirts, and sweatshirts.",
              "url": "https://frontend-iota-flax-11.vercel.app",
              "logo": "https://frontend-iota-flax-11.vercel.app/images/logo.png",
              "image": "https://frontend-iota-flax-11.vercel.app/images/og-image.jpg",
              "priceRange": "€€",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "PT"
              },
              "sameAs": [
                "https://instagram.com/wearingmind",
                "https://twitter.com/wearingmind"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-brand-light text-brand selection:bg-brand selection:text-white`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
