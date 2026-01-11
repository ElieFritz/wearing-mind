import { HeroSection } from "@/components/HeroSection";
import { SocialProof } from "@/components/SocialProof";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { DropCountdown } from "@/components/DropCountdown";
import { BrandStory } from "@/components/BrandStory";
import { NewsletterPopup } from "@/components/NewsletterPopup";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-light text-brand">
      <HeroSection />
      
      <SocialProof />
      
      <section id="featured">
        <FeaturedCollection />
      </section>
      
      <DropCountdown />
      
      <BrandStory />

      <NewsletterPopup />
    </div>
  );
}
