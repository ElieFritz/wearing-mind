import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Premium Streetwear | Hoodies, T-Shirts & Sweatshirts",
  description: "Browse our complete collection of sustainable streetwear. Premium hoodies, organic cotton t-shirts, and exclusive sweatshirts. Filter by category. Ethically made. Limited quantities available.",
  keywords: [
    "buy streetwear online",
    "premium hoodies shop",
    "organic t-shirts",
    "sustainable sweatshirts",
    "ethical clothing store",
    "limited edition fashion",
    "shop hoodies",
    "buy t-shirts",
    "sweatshirts online"
  ],
  openGraph: {
    title: "Shop WEARING MIND Collection",
    description: "Explore our sustainable streetwear collection. Premium quality, ethically made.",
    url: "https://frontend-iota-flax-11.vercel.app/shop",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
