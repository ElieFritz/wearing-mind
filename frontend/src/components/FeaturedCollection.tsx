'use client';

import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { useEffect, useState } from 'react';
import { productsApi } from '@/lib/api';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FeaturedCollection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsApi.getFeatured(4);
        console.log('Featured products response:', response.data); // Debug
        setProducts(response.data || []);
      } catch (err: any) {
        console.error('Failed to fetch products:', err);
        setError(err.message);
        // Fallback to mock data if API fails
        setProducts([
          { id: '1', name: 'Mind Hoodie Black', price: 120, images: ['/images/products/hoodie-black.jpg'], category: 'Hoodie', is_new: true },
          { id: '2', name: 'Logo Tee White', price: 55, images: ['/images/products/tee-white.jpg'], category: 'T-Shirt', is_new: false },
          { id: '3', name: 'Oversized Sweat', price: 95, images: ['/images/products/sweat-oversized.jpg'], category: 'Sweatshirt', is_new: true },
          { id: '4', name: 'Mind Hoodie Grey', price: 120, images: ['/images/products/hoodie-grey.jpg'], category: 'Hoodie', is_new: false },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-6 bg-[#F8F8FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-[#1E2A5A]"
            >
              Featured Collection
            </motion.h2>
            <p className="text-lg text-[#64748B]">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-[#F8F8FA]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-[#1E2A5A]"
          >
            Featured Collection
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-[#64748B] max-w-2xl mx-auto"
          >
            Discover our most iconic pieces. Each garment is a statement of conscious design and uncompromising quality.
          </motion.p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {products.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.images?.[0] || '/images/products/hoodie-black.jpg'}
                  category={product.category}
                  isNew={product.is_new || false}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No featured products yet</p>
            <p className="text-sm text-gray-400">Add products and mark them as "Featured" in the admin panel</p>
          </div>
        )}

        {/* CTA Button - View All Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E2A5A] text-white font-bold uppercase tracking-widest hover:bg-[#3B4D80] transition-all duration-300 group"
          >
            View All Collection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {error && (
          <p className="text-center mt-4 text-sm text-amber-600">
            Connected to local data. Backend API: {error}
          </p>
        )}

        {/* Debug info */}
        {products.length > 0 && (
          <p className="text-center mt-4 text-xs text-gray-400">
            Showing {products.length} featured products
          </p>
        )}
      </div>
    </section>
  );
}
