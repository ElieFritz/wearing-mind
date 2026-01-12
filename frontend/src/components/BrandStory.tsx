'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export function BrandStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={ref} className="py-32 min-h-screen bg-white text-black flex items-center justify-center relative overflow-hidden">
       {/* Background Text */}
       <div className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none select-none opacity-5">
          <span className="text-[20vw] font-black leading-none uppercase">Wear</span>
          <span className="text-[20vw] font-black leading-none uppercase">Your</span>
          <span className="text-[20vw] font-black leading-none uppercase">Mind</span>
       </div>

       <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div style={{ y, opacity }}>
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-sm font-bold uppercase tracking-widest mb-8 text-neutral-500"
             >
               The Philosophy
             </motion.h2>
             
             <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-3xl md:text-5xl font-bold leading-tight mb-12"
             >
               We believe clothing is an extension of consciousness. 
               <br/><br/>
               Every thread is woven with intention. Every cut is designed for freedom. 
               WEARING MIND is not just a brand, it is a state of being.
             </motion.p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {/* Hoodies */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative group"
                >
                   <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 relative">
                      <Image
                        src="/images/brand/hoodies.jpg"
                        alt="Hoodies Collection"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-[#1E2A5A]/20 group-hover:bg-[#1E2A5A]/40 transition-colors duration-500" />
                   </div>
                   <h3 className="font-bold text-2xl mb-2">Hoodies</h3>
                   <p className="text-sm text-neutral-600">
                     Comfort meets style. Premium cotton hoodies for every season.
                   </p>
                </motion.div>

                {/* T-Shirts */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                   <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 relative">
                      <Image
                        src="/images/brand/tshirts.jpg"
                        alt="T-Shirts Collection"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-[#1E2A5A]/20 group-hover:bg-[#1E2A5A]/40 transition-colors duration-500" />
                   </div>
                   <h3 className="font-bold text-2xl mb-2">T-Shirts</h3>
                   <p className="text-sm text-neutral-600">
                     Essential basics reimagined. Soft, breathable, timeless.
                   </p>
                </motion.div>

                {/* Sweatshirts */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="relative group"
                >
                   <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 relative">
                      <Image
                        src="/images/brand/sweatshirts.jpg"
                        alt="Sweatshirts Collection"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-[#1E2A5A]/20 group-hover:bg-[#1E2A5A]/40 transition-colors duration-500" />
                   </div>
                   <h3 className="font-bold text-2xl mb-2">Sweatshirts</h3>
                   <p className="text-sm text-neutral-600">
                     Elevated loungewear. Crafted for comfort and conscious living.
                   </p>
                </motion.div>
             </div>
          </motion.div>
       </div>
    </section>
  );
}
