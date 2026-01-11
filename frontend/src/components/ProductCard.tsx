'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SafeImage from './SafeImage';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

export function ProductCard({ id, name, price, image, category, isNew }: ProductCardProps) {
  return (
    <Link href={`/shop/${id}`} className="group block">
      <motion.div 
        className="relative overflow-hidden bg-white"
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <SafeImage
            src={image || '/images/products/hoodie-black.jpg'}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={false}
          />
          
          {/* New Badge */}
          {isNew && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#1E2A5A] text-white text-xs font-bold uppercase tracking-wider">
              New
            </div>
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span className="px-6 py-3 bg-white text-[#1E2A5A] font-bold uppercase tracking-widest text-sm">
                Quick View
              </span>
            </motion.div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <p className="text-xs uppercase tracking-wider text-[#64748B] font-medium">
            {category}
          </p>
          <h3 className="font-bold text-lg text-[#1E2A5A] group-hover:text-[#3B4D80] transition-colors">
            {name}
          </h3>
          <p className="text-xl font-black text-[#1E2A5A]">
            €{price.toFixed(2)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
