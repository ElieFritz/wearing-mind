import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#1E2A5A] text-white py-12 px-6 border-t border-[#3B4D80]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4">
          {/* Logo - Taille encore plus grande */}
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo.png"
              alt="WEARING MIND Logo"
              width={260}
              height={86}
              className="h-20 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-white/70 text-sm max-w-xs">
            Premium Streetwear designed for the modern mind.
            <br />Paris, France.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-bold uppercase tracking-wider text-sm text-white/90">Shop</h4>
          <nav className="flex flex-col gap-2 text-sm text-white/70">
            <Link href="/shop" className="hover:text-white transition-colors">All Products</Link>
            <Link href="/shop?col=new" className="hover:text-white transition-colors">New Drop</Link>
            <Link href="/shop?col=limited" className="hover:text-white transition-colors">Limited</Link>
            <Link href="/shop?col=essentials" className="hover:text-white transition-colors">Essentials</Link>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-bold uppercase tracking-wider text-sm text-white/90">Legal</h4>
          <nav className="flex flex-col gap-2 text-sm text-white/70">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
           <h4 className="font-bold uppercase tracking-wider text-sm text-white/90">Follow Us</h4>
           <div className="flex gap-4">
             <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
               <Instagram className="w-5 h-5" />
             </a>
             <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
               <Twitter className="w-5 h-5" />
             </a>
             <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
               <Facebook className="w-5 h-5" />
             </a>
           </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center md:text-left text-white/50 text-xs">
        &copy; 2026 WEARING MIND. All rights reserved.
      </div>
    </footer>
  );
}
