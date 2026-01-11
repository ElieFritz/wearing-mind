'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Images captivantes pour la diapositive
const HERO_SLIDES = [
  {
    image: '/images/hero-1.jpg',
    gradient: 'from-[#1E2A5A] via-[#2D3A6A] to-[#3B4D80]',
    title: 'Wear Your',
    subtitle: 'Mind',
  },
  {
    image: '/images/hero-2.jpg',
    gradient: 'from-[#3B4D80] via-[#2D3A6A] to-[#1E2A5A]',
    title: 'Conscious',
    subtitle: 'Style',
  },
  {
    image: '/images/hero-3.jpg',
    gradient: 'from-[#2D3A6A] via-[#1E2A5A] to-[#3B4D80]',
    title: 'Premium',
    subtitle: 'Streetwear',
  },
  {
    image: '/images/hero-4.jpg',
    gradient: 'from-[#1E2A5A] via-[#3B4D80] to-[#2D3A6A]',
    title: 'Collection',
    subtitle: '2026',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Automatic slideshow avec transition douce toutes les 6 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1E2A5A]">
      {/* Background Image Slideshow avec parallax */}
      <motion.div 
        style={{ y: y1, scale }}
        className="absolute inset-0 z-0"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Real Images */}
            <Image
              src={HERO_SLIDES[currentSlide].image}
              alt={`${HERO_SLIDES[currentSlide].title} ${HERO_SLIDES[currentSlide].subtitle}`}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              quality={90}
            />
            
            {/* Gradient overlay for better text readability */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${HERO_SLIDES[currentSlide].gradient} opacity-40`}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradient elegant pour lisibilite */}
        <div className="w-full h-full bg-gradient-to-b from-black/40 via-black/20 to-[#F8F8FA]/90 absolute inset-0 z-10" />
      </motion.div>

      {/* Content dynamique base sur le slide */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
              {HERO_SLIDES[currentSlide].title}
              <span className="block text-white/90 mt-2">{HERO_SLIDES[currentSlide].subtitle}</span>
            </h1>
          </motion.div>
        </AnimatePresence>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-8 text-base md:text-lg lg:text-xl font-light tracking-[0.2em] text-white/90 max-w-2xl uppercase drop-shadow-lg"
        >
          Clothing designed for conscious style
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
           className="mt-12 md:mt-16"
        >
          <a 
            href="#featured"
            className="group relative inline-block px-10 py-4 bg-white text-[#1E2A5A] font-medium text-sm uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">
              Explore the Drop
            </span>
            <motion.div
              className="absolute inset-0 bg-[#1E2A5A]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </a>
        </motion.div>
      </div>

      {/* Slideshow indicators elegants */}
      <div className="absolute bottom-28 md:bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div 
              className={`h-0.5 transition-all duration-700 ${
                index === currentSlide 
                  ? 'w-16 bg-white shadow-lg shadow-white/50' 
                  : 'w-8 bg-white/30 group-hover:bg-white/60 group-hover:w-10'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll indicator minimaliste */}
      <motion.div 
         style={{ opacity }}
         className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-[10px] uppercase tracking-[0.25em] flex flex-col items-center gap-3 drop-shadow-lg"
      >
        <span className="font-light">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-14 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
