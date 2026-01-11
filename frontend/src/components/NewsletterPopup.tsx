
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    // Show after 10 seconds or on mouse leave (desktop)
    const timer = setTimeout(() => {
        if (!hasClosed) setIsVisible(true);
    }, 10000);

    const handleMouseLeave = (e: MouseEvent) => {
       if (e.clientY <= 0 && !hasClosed) {
           setIsVisible(true);
       }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        clearTimeout(timer);
        document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasClosed]);

  const handleClose = () => {
    setIsVisible(false);
    setHasClosed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
           {/* Backdrop */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={handleClose}
             className="absolute inset-0 bg-black/80 backdrop-blur-sm"
           />
           
           {/* Modal */}
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.9, opacity: 0 }}
             className="relative bg-neutral-900 border border-neutral-800 p-8 md:p-12 max-w-lg w-full text-center text-white"
           >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-neutral-500 hover:text-white"
              >
                  <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Don't Leave Yet</h2>
              <p className="text-neutral-400 mb-8">
                 Join the Mind Club and unlock <span className="text-white font-bold">10% OFF</span> your first order.
              </p>

              <form className="flex flex-col gap-4">
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   className="w-full bg-black border border-neutral-800 p-4 rounded focus:ring-1 focus:ring-white outline-none placeholder:text-neutral-600 text-white" 
                 />
                 <button className="w-full bg-white text-black font-bold h-12 uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                    Unlock Discount
                 </button>
              </form>
              
              <button 
                 onClick={handleClose}
                 className="mt-6 text-sm text-neutral-600 underline hover:text-neutral-400"
              >
                 No thanks, I prefer paying full price
              </button>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
