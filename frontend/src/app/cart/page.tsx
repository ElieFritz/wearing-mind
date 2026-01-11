'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal, getCartCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="pt-32 min-h-screen max-w-4xl mx-auto px-6 pb-24 text-center">Loading cart...</div>;

  if (items.length === 0) {
    return (
        <div className="pt-32 min-h-screen max-w-4xl mx-auto px-6 pb-24 text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Cart Empty</h1>
            <p className="text-neutral-500 mb-8">Your mind is clear, but your cart is empty.</p>
            <Link href="/shop" className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200">
                Start Shopping
            </Link>
        </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen max-w-4xl mx-auto px-6 pb-24">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Your Cart ({getCartCount()})</h1>

      <div className="flex flex-col gap-8">
         {/* Cart Items */}
         <div className="space-y-6">
           <AnimatePresence>
           {items.map((item) => (
             <motion.div 
               layout
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -100 }}
               key={item.variantId}
               className="flex gap-4 p-4 border border-neutral-800 bg-neutral-900/50 rounded-lg items-center"
             >
                <div className="w-20 h-20 bg-neutral-800 rounded-md shrink-0 flex items-center justify-center text-xs text-neutral-600 font-bold uppercase">
                    {/* Placeholder */}
                    IMG
                </div>
                
                <div className="flex-grow">
                   <div className="flex justify-between items-start mb-1">
                     <h3 className="font-bold uppercase tracking-wide">{item.name}</h3>
                     <span className="font-medium">€{item.price * item.quantity}</span>
                   </div>
                   <p className="text-sm text-neutral-500 mb-2">{item.color} / {item.size}</p>
                   
                   <div className="flex justify-between items-end">
                      <div className="flex items-center gap-3 border border-neutral-700 rounded px-2 py-1">
                         <button 
                            className="text-neutral-400 hover:text-white disabled:opacity-50"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                         >-</button>
                         <span className="text-sm w-4 text-center">{item.quantity}</span>
                         <button 
                            className="text-neutral-400 hover:text-white"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                         >+</button>
                      </div>
                      <button 
                        className="text-neutral-500 hover:text-red-500 transition-colors"
                        onClick={() => removeItem(item.variantId)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                   </div>
                </div>
             </motion.div>
           ))}
           </AnimatePresence>
         </div>

         {/* Summary */}
         <div className="border-t border-neutral-800 pt-8 mt-4 space-y-4">
            <div className="flex justify-between text-lg">
               <span className="text-neutral-400">Subtotal</span>
               <span>€{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-neutral-500">
               <span>Shipping</span>
               <span>Calculated at checkout</span>
            </div>
            
            <div className="flex justify-between text-2xl font-bold pt-4">
               <span>Total</span>
               <span>€{getCartTotal().toFixed(2)}</span>
            </div>

            <Link 
              href="/checkout"
              className="mt-8 w-full bg-white text-black font-bold h-14 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors rounded-sm"
            >
              Checkout <ArrowRight className="w-5 h-5" />
            </Link>
         </div>
      </div>
    </div>
  );
}
