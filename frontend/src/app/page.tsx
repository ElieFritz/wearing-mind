import { HeroSection } from "@/components/HeroSection";
import { SocialProof } from "@/components/SocialProof";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { DropCountdown } from "@/components/DropCountdown";
import { BrandStory } from "@/components/BrandStory";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WEARING MIND | Sustainable Premium Streetwear Collection 2026",
  description: "Shop exclusive sustainable streetwear at WEARING MIND. Discover our premium collection of organic cotton hoodies, t-shirts & sweatshirts. Limited edition drops. Ethically made in Portugal. Free shipping worldwide.",
  keywords: [
    "sustainable streetwear 2026",
    "premium hoodies",
    "organic cotton clothing",
    "ethical fashion brand",
    "limited edition streetwear",
    "Portuguese made clothing",
    "conscious fashion",
    "exclusive drops"
  ],
  openGraph: {
    title: "WEARING MIND | Sustainable Premium Streetwear",
    description: "Exclusive sustainable streetwear collection. Premium organic cotton clothing.",
    url: "https://frontend-iota-flax-11.vercel.app",
    images: [
      {
        url: "/images/hero/hero-main.jpg",
        width: 1200,
        height: 630,
        alt: "WEARING MIND Streetwear Collection",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-light text-brand">
      <HeroSection />
      
      <SocialProof />
      
      <section id="featured" aria-label="Featured Collection">
        <FeaturedCollection />
      </section>
      
      <DropCountdown />
      
      <section aria-label="Brand Philosophy">
        <BrandStory />
      </section>

      <NewsletterPopup />
    </div>
  );
}
