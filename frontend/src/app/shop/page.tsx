
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { productsApi } from '@/lib/api';

const FILTERS = ['All', 'Hoodie', 'T-Shirt', 'Sweatshirt'];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [activeFilter]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (activeFilter !== 'All') {
        params.category = activeFilter;
      }
      
      const response = await productsApi.getAll(params);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // Fallback data
      setProducts([
        { id: '1', name: 'Mind Hoodie Black', price: 120, category: 'Hoodie', isNew: true, images: ['/images/products/hoodie-black.jpg'] },
        { id: '2', name: 'Logo Tee White', price: 55, category: 'T-Shirt', isNew: false, images: ['/images/products/tee-white.jpg'] },
        { id: '3', name: 'Oversized Sweat', price: 95, category: 'Sweatshirt', isNew: true, images: ['/images/products/sweat-oversized.jpg'] },
        { id: '4', name: 'Mind Hoodie Grey', price: 120, category: 'Hoodie', isNew: false, images: ['/images/products/hoodie-grey.jpg'] },
      ].filter(p => activeFilter === 'All' || p.category === activeFilter));
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products;

  return (
    <div className="pt-24 min-h-screen px-6 pb-20 bg-[#F8F8FA]">
      
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#1E2A5A]/20 pb-8 gap-6">
        <div>
           <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 text-[#1E2A5A]">Catalogue</h1>
           <p className="text-[#64748B]">Latest collection 2026</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm uppercase font-bold tracking-widest border transition-all ${
                activeFilter === filter 
                ? 'bg-[#1E2A5A] text-white border-[#1E2A5A]' 
                : 'text-[#64748B] border-[#1E2A5A]/20 hover:border-[#3B4D80]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-[#64748B]">Loading products...</p>
        </div>
      )}

      {/* Grid */}
      {!loading && (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
        >
          {filteredProducts.map((product) => (
             <motion.div
               layout
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ duration: 0.3 }}
               key={product.id}
             >
               <ProductCard 
                 id={product.id}
                 name={product.name}
                 price={product.price}
                 image={product.images?.[0] || '/images/products/hoodie-black.jpg'}
                 category={product.category}
                 isNew={product.is_new || product.isNew}
               />
             </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#64748B]">No products found for this category.</p>
        </div>
      )}
    </div>
  );
}
