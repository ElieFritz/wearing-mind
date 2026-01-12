import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us | Sustainable Fashion Philosophy",
  description: "Learn about WEARING MIND's commitment to sustainable fashion. Discover our philosophy of conscious clothing, ethical production in Portugal, and our mission to create premium streetwear with purpose.",
  keywords: [
    "sustainable fashion brand",
    "ethical clothing company",
    "Portuguese made fashion",
    "conscious streetwear",
    "organic cotton clothing brand",
    "about WEARING MIND",
    "fashion philosophy",
    "ethical streetwear"
  ],
  openGraph: {
    title: "About WEARING MIND | Our Sustainable Fashion Story",
    description: "Discover the story behind WEARING MIND and our commitment to sustainable, ethical fashion.",
    url: "https://frontend-iota-flax-11.vercel.app/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
