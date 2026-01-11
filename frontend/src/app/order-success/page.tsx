"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, ArrowRight, Loader } from 'lucide-react';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get('order');
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      fetchOrder();
    } else {
      router.push('/shop');
    }
  }, [orderNumber]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/orders/number/${orderNumber}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      }
    } catch (error) {
      console.error('Failed to fetch order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8FA] flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-[#1E2A5A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8FA] pt-20">
      <div className="max-w-3xl mx-auto px-6 py-16">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-4xl font-black uppercase tracking-tighter text-[#1E2A5A] mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your order
          </p>
          
          {order && (
            <div className="inline-block bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 mt-4">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Order Number</p>
              <p className="text-2xl font-bold text-[#1E2A5A]">{orderNumber}</p>
            </div>
          )}
        </motion.div>

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Details</h2>
            
            <div className="space-y-4 mb-6">
              {order.items && order.items.map((item: any, index: number) => (
                <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                    IMG
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      {item.size && `Size: ${item.size}`}
                      {item.color && ` - Color: ${item.color}`}
                    </p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      EUR {(item.unit_price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">EUR {order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">EUR {order.shipping_cost?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-[#1E2A5A]">EUR {order.total?.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Mail className="w-10 h-10 text-[#1E2A5A] mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Confirmation Email</h3>
            <p className="text-sm text-gray-600">
              We have sent a confirmation email to <strong>{order?.customer_email}</strong> with your order details.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Package className="w-10 h-10 text-[#1E2A5A] mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Shipping Updates</h3>
            <p className="text-sm text-gray-600">
              You will receive tracking information once your order ships. Estimated delivery: 3-5 business days.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 bg-[#1E2A5A] text-white font-bold py-4 px-6 uppercase tracking-wider hover:bg-[#3B4D80] transition-colors"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          {order && (
            <a
              href={`mailto:support@wearingmind.com?subject=Order ${orderNumber}`}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-[#1E2A5A] text-[#1E2A5A] font-bold py-4 px-6 uppercase tracking-wider hover:bg-[#1E2A5A] hover:text-white transition-colors"
            >
              Contact Support
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a href="mailto:support@wearingmind.com" className="text-[#1E2A5A] hover:underline">
              support@wearingmind.com
            </a>
          </p>
        </motion.div>

      </div>
    </div>
  );
}
