'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <article className="max-w-4xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-[#1E2A5A]">
            About WEARING MIND
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe clothing is an extension of consciousness. Every thread woven with intention, every cut designed for freedom.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden mb-16"
        >
          <Image
            src="/images/brand/craftsmanship.jpg"
            alt="WEARING MIND sustainable craftsmanship"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#1E2A5A]">Our Philosophy</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                WEARING MIND is not just a brand, it's a state of being. We create premium streetwear that embodies consciousness, sustainability, and timeless style.
              </p>
              <p>
                Born from a vision to revolutionize fashion, we craft each piece with meticulous attention to detail, ensuring that every garment tells a story of ethical production and environmental responsibility.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#1E2A5A]">Sustainable Materials</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                We use only <strong>100% organic cotton</strong> sourced from Portugal, ensuring the highest quality while maintaining our commitment to sustainability.
              </p>
              <p>
                Our fabrics are GOTS certified (Global Organic Textile Standard), guaranteeing ethical and ecological production from raw material to final product.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#1E2A5A]">Limited Production</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                We believe in quality over quantity. Each collection is produced in <strong>small, limited batches</strong> to minimize waste and ensure exclusivity.
              </p>
              <p>
                This approach allows us to maintain the highest standards of craftsmanship while reducing our environmental footprint.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#1E2A5A]">Made in Portugal</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>
                All our garments are <strong>ethically manufactured in Portugal</strong>, supporting local artisans and ensuring fair working conditions.
              </p>
              <p>
                Portugal's rich textile heritage combined with modern sustainable practices creates the perfect foundation for our collections.
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="border-t border-gray-200 pt-12 mt-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-[#1E2A5A] text-center">Our Collections</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3 text-[#1E2A5A]">Hoodies</h3>
                <p className="text-gray-600">Premium comfort meets style. Perfect for every season.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3 text-[#1E2A5A]">T-Shirts</h3>
                <p className="text-gray-600">Essential basics reimagined. Soft, breathable, timeless.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3 text-[#1E2A5A]">Sweatshirts</h3>
                <p className="text-gray-600">Elevated loungewear. Crafted for comfort and conscious living.</p>
              </div>
            </div>
          </motion.section>
        </div>
      </article>
    </main>
  );
}
