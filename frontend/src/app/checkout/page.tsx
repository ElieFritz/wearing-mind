"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Loader, AlertCircle } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  postalCode: string;
  newsletter: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');

  const shippingCost = 5.00;

  const [formData, setFormData] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    country: 'France',
    postalCode: '',
    newsletter: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your full name');
      return false;
    }
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone) {
      setError('Please enter your phone number');
      return false;
    }
    if (!formData.address || !formData.city || !formData.country || !formData.postalCode) {
      setError('Please complete all shipping address fields');
      return false;
    }
    if (items.length === 0) {
      setError('Your cart is empty');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customer_email: formData.email,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        items: items.map(item => ({
          product_id: item.id,
          product_name: item.name,
          product_sku: item.variantId,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
        })),
        subtotal: getCartTotal(),
        shipping_cost: shippingCost,
        total: getCartTotal() + shippingCost,
        shipping_address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          country: formData.country,
          postalCode: formData.postalCode,
          phone: formData.phone,
        },
        payment_method: 'credit_card',
        payment_status: 'completed',
        status: 'pending',
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();
      setOrderNumber(result.order_number);
      setOrderSuccess(true);
      
      clearCart();

      setTimeout(() => {
        router.push(`/order-success?order=${result.order_number}`);
      }, 2000);

    } catch (err: any) {
      console.error('Order creation failed:', err);
      setError('Failed to process your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-black uppercase mb-4">Order Confirmed!</h1>
          <p className="text-neutral-400 mb-2">Order Number: <span className="text-white font-bold">{orderNumber}</span></p>
          <p className="text-neutral-500 mb-6">
            We've sent a confirmation email to {formData.email}
          </p>
          <div className="space-y-3">
            <Link 
              href="/shop" 
              className="block w-full bg-white text-black font-bold py-3 px-6 uppercase tracking-wider hover:bg-neutral-200 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left: Order Summary */}
        <div className="bg-neutral-900 p-8 lg:p-20 order-2 lg:order-1 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-8 text-neutral-400">
              Order Summary
            </h3>
            
            <div className="space-y-4 mb-8">
              {items.length === 0 ? (
                <p className="text-neutral-500">Your cart is empty.</p>
              ) : (
                items.map(item => (
                  <div key={item.variantId} className="flex gap-4">
                    <div className="w-16 h-16 bg-neutral-800 rounded relative overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-600">
                          IMG
                        </div>
                      )}
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-neutral-700 rounded-full flex items-center justify-center text-xs text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-white">{item.name}</p>
                      <p className="text-xs text-neutral-500">{item.color} / {item.size}</p>
                    </div>
                    <div className="font-medium">€{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))
              )}
            </div>
            
            <div className="border-t border-neutral-800 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Subtotal</span>
                <span>€{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Shipping</span>
                <span>€{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t border-neutral-800 mt-4">
                <span>Total</span>
                <span>€{(getCartTotal() + shippingCost).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Checkout Form */}
        <div className="p-8 lg:p-20 lg:pt-32 order-1 lg:order-2 flex flex-col items-center">
          <div className="max-w-lg w-full">
            <Link 
              href="/cart" 
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Cart
            </Link>

            <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">Checkout</h1>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                  Contact Information
                </h2>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded focus:ring-2 focus:ring-white outline-none placeholder:text-neutral-600"
                />
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <label htmlFor="newsletter" className="text-sm text-neutral-400">
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4 pt-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                  Shipping Address
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name *"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded focus:ring-2 focus:ring-white outline-none placeholder:text-neutral-600"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name *"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded focus:ring-2 focus:ring-white outline-none placeholder:text-neutral-600"
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address *"
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded focus:ring-2 focus:ring-white outline-none placeholder:text-neutral-600"
                />

                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded focus:ring-2 focus:ring-white outline-none placeholder:text-neutral-600"
                />

                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City *"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded focus:ring-2 focus:ring-white outline-none placeholder:text-neutral-600"
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded focus:ring-2 focus:ring-white outline-none"
                  >
                    <option value="France">France</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Germany">Germany</option>
                    <option value="Spain">Spain</option>
                    <option value="Italy">Italy</option>
                    <option value="Netherlands">Netherlands</option>
                  </select>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal code *"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded focus:ring-2 focus:ring-white outline-none placeholder:text-neutral-600"
                  />
                </div>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone *"
                  required
                  className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded focus:ring-2 focus:ring-white outline-none placeholder:text-neutral-600"
                />
              </div>

              {/* Payment Info */}
              <div className="space-y-4 pt-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-500">
                  Payment
                </h2>
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded flex flex-col items-center justify-center text-neutral-500 gap-2">
                  <p className="text-sm">Secure payment processing</p>
                  <div className="text-xs border border-neutral-700 px-3 py-1 bg-neutral-800 rounded">
                    🔒 SECURE CHECKOUT
                  </div>
                  <p className="text-xs text-neutral-600 mt-2">
                    Payment integration ready
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading || items.length === 0}
                  className="w-full bg-white text-black font-bold h-14 uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-sm disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Place Order • €{(getCartTotal() + shippingCost).toFixed(2)}</>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
