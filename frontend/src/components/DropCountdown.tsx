'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function DropCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set a date 3 days from now for demo
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 border-t border-b border-neutral-800 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/collections/chaos-theory.jpg"
          alt="Chaos Theory Collection"
          fill
          className="object-cover"
          quality={85}
          priority
        />
        {/* Multiple overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E2A5A]/30 to-transparent" />
      </div>

      {/* Animated blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
         <motion.div 
           animate={{ 
             scale: [1, 1.2, 1],
             x: [-20, 20, -20],
             y: [-20, 20, -20]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
           className="w-[500px] h-[500px] bg-[#3B4D80] rounded-full blur-[120px] absolute -top-20 -left-20"
         />
         <motion.div 
           animate={{ 
             scale: [1, 1.3, 1],
             x: [20, -20, 20],
             y: [20, -20, 20]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
           className="w-[500px] h-[500px] bg-[#1E2A5A] rounded-full blur-[120px] absolute bottom-0 right-0"
         />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#3B4D80] font-bold tracking-widest uppercase mb-4 text-sm md:text-base"
        >
          Next Drop Incoming
        </motion.h2>
        
        <motion.h3 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-4 drop-shadow-2xl"
        >
          "Chaos Theory"
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-white/80 text-lg md:text-xl mb-12 font-light tracking-wide"
        >
          Limited Collection € Only 100 pieces
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4 md:gap-12 text-white mb-12"
        >
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="flex flex-col items-center backdrop-blur-sm bg-white/5 p-4 md:p-6 rounded-sm border border-white/10">
              <motion.div 
                key={value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-3xl md:text-6xl font-black tabular-nums"
              >
                {String(value).padStart(2, '0')}
              </motion.div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-white/60 mt-2">{label}</div>
            </div>
          ))}
        </motion.div>

        <motion.button 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.6 }}
           whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(30, 42, 90, 0.3)" }}
           whileTap={{ scale: 0.95 }}
           className="px-10 py-4 bg-white text-[#1E2A5A] font-bold uppercase tracking-widest text-sm hover:bg-[#F8F8FA] transition-colors shadow-xl"
        >
          Get Notified
        </motion.button>
      </div>
    </section>
  );
}
