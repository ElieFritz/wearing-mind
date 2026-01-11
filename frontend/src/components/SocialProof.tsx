'use client';

import { motion } from 'framer-motion';

const REVIEWS = [
  '"The quality is unmatched." – Hypebeast',
  '"Streetwear redefined for 2026." – Vogue',
  '"Incredible fit and materials." – Alex M., Verified Buyer',
  '"Wearing Mind is a movement." – Highsnobiety',
  '"Fast shipping, amazing packaging." – Sarah K., Verified Buyer'
];

export function SocialProof() {
  return (
    <div className="w-full bg-[#1E2A5A] text-white py-4 overflow-hidden whitespace-nowrap border-y border-[#3B4D80]/30">
      <motion.div
        className="flex gap-16 font-light uppercase tracking-[0.2em] text-xs"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
          <span key={i} className="flex items-center gap-16">
             <span className="opacity-90">{review}</span>
             <span className="w-1.5 h-1.5 bg-[#3B4D80] rounded-full" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
