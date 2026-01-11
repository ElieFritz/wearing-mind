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
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                {/* Sustainable */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                   <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 relative">
                      <Image
                        src="/images/brand/sustainability.jpg"
                        alt="Sustainable Materials"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-[#1E2A5A]/20 group-hover:bg-[#1E2A5A]/40 transition-colors duration-500" />
                   </div>
                   <h3 className="font-bold text-2xl mb-2">Sustainable</h3>
                   <p className="text-sm text-neutral-600">
                     100% Organic Cotton from Portugal. Ethically sourced, mindfully crafted.
                   </p>
                </motion.div>

                {/* Limited */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative group"
                >
                   <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 relative">
                      <Image
                        src="/images/brand/craftsmanship.jpg"
                        alt="Limited Edition Craftsmanship"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-[#1E2A5A]/20 group-hover:bg-[#1E2A5A]/40 transition-colors duration-500" />
                   </div>
                   <h3 className="font-bold text-2xl mb-2">Limited</h3>
                   <p className="text-sm text-neutral-600">
                     Small batches to ensure exclusivity. Every piece tells a story.
                   </p>
                </motion.div>
             </div>
          </motion.div>
       </div>
    </section>
  );
}
