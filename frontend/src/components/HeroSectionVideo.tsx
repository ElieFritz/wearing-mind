'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * VERSION ALTERNATIVE : Hero Section avec vidéo en background
 * 
 * Pour utiliser cette version :
 * 1. Renommez HeroSection.tsx en HeroSectionSlideshow.tsx
 * 2. Renommez ce fichier en HeroSection.tsx
 * 3. Ajoutez votre vidéo dans /public/videos/hero-video.mp4
 */

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.05]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1E2A5A]">
      {/* Background Video avec parallax subtil */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          <source src="/videos/hero-video.webm" type="video/webm" />
          {/* Fallback gradient si la vidéo ne charge pas */}
        </video>

        {/* Overlay pour garantir lisibilité du texte */}
        <div className="w-full h-full bg-gradient-to-b from-[#1E2A5A]/60 via-black/30 to-[#F8F8FA]/80 absolute inset-0 z-10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white"
        >
          Wear Your
          <span className="block text-white/90 mt-2">Mind</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 text-lg md:text-xl lg:text-2xl font-light tracking-[0.15em] text-white/90 max-w-2xl uppercase"
        >
          Clothing designed for conscious style
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
           className="mt-12 md:mt-16"
        >
          <button className="group relative px-10 py-4 bg-white text-[#1E2A5A] font-medium text-sm uppercase tracking-[0.2em] hover:bg-[#1E2A5A] hover:text-white transition-all duration-500 overflow-hidden">
            <span className="relative z-10">Explore the Drop</span>
            <motion.div
              className="absolute inset-0 bg-[#1E2A5A]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </button>
        </motion.div>

        {/* Video controls (optionnel - peut être retiré pour plus de minimalisme) */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          onClick={() => {
            if (videoRef.current) {
              if (videoRef.current.paused) {
                videoRef.current.play();
              } else {
                videoRef.current.pause();
              }
            }
          }}
          className="absolute bottom-24 right-8 text-white/70 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors"
        >
          Pause / Play
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div 
         style={{ opacity }}
         className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-xs uppercase tracking-[0.2em] flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-white/40"
        />
      </motion.div>
    </section>
  );
}
