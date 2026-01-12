'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';

export function Header() {
  const cartCount = useCartStore((state) => state.getCartCount());
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering count after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 bg-white/95 backdrop-blur-sm border-b border-[#1E2A5A]/10 shadow-sm"
      role="banner"
    >
      <nav className="flex items-center gap-4" aria-label="Main navigation">
        <button 
          className="p-2 hover:bg-[#F8F8FA] rounded-full transition-colors text-[#1E2A5A]"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Logo central - Taille encore plus grande */}
      <Link 
        href="/" 
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="WEARING MIND Home"
      >
        <Image
          src="/images/logo.png"
          alt="WEARING MIND - Premium Sustainable Streetwear Logo"
          width={240}
          height={80}
          priority
          className="h-16 w-auto"
        />
      </Link>

      <div className="flex items-center gap-4">
        <button 
          className="p-2 hover:bg-[#F8F8FA] rounded-full transition-colors text-[#1E2A5A]"
          aria-label="Search products"
        >
          <Search className="w-6 h-6" />
        </button>
        <Link 
          href="/cart" 
          className="p-2 relative block hover:bg-[#F8F8FA] rounded-full transition-colors text-[#1E2A5A]"
          aria-label={`Shopping cart${mounted && cartCount > 0 ? ` with ${cartCount} items` : ''}`}
        >
          <ShoppingBag className="w-6 h-6" />
          <AnimatePresence>
            {mounted && cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-0 right-0 w-5 h-5 bg-[#1E2A5A] text-white rounded-full text-[10px] flex items-center justify-center font-bold"
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </motion.header>
  );
}
