'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Truck, ShieldCheck, ShoppingBag, Check, ChevronLeft, ChevronRight, Loader, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { productsApi } from '@/lib/api';
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  sizes: string[];
  colors: string[];
  is_new: boolean;
  is_featured: boolean;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsApi.getOne(productId);
      const productData = response.data;
      setProduct(productData);
      
      // Set default color from colors array or extract from name
      if (productData.colors && productData.colors.length > 0) {
        setSelectedColor(productData.colors[0]);
      } else {
        const colors = extractColors(productData.name);
        if (colors.length > 0) {
          setSelectedColor(colors[0]);
        }
      }
    } catch (error: any) {
      console.error('Failed to fetch product:', error);
      setTimeout(() => router.push('/shop'), 2000);
    } finally {
      setLoading(false);
    }
  };

  // Extract colors from product name (fallback)
  const extractColors = (name: string): string[] => {
    const colorMap: { [key: string]: string } = {
      'black': '#000000',
      'white': '#FFFFFF',
      'grey': '#808080',
      'gray': '#808080',
      'blue': '#0066CC',
      'red': '#CC0000',
      'green': '#00CC00',
      'yellow': '#FFCC00',
      'pink': '#FF69B4',
      'purple': '#9966CC',
      'orange': '#FF8C00',
      'brown': '#8B4513',
      'navy': '#001F3F',
      'beige': '#F5F5DC',
    };

    const colors: string[] = [];
    const lowerName = name.toLowerCase();

    Object.keys(colorMap).forEach(color => {
      if (lowerName.includes(color)) {
        colors.push(colorMap[color]);
      }
    });

    if (colors.length === 0) {
      colors.push('#000000');
    }

    return colors;
  };

  const getColorName = (hex: string): string => {
    const colorNames: { [key: string]: string } = {
      '#000000': 'Black',
      '#FFFFFF': 'White',
      '#808080': 'Grey',
      '#0066CC': 'Blue',
      '#CC0000': 'Red',
      '#00CC00': 'Green',
      '#FFCC00': 'Yellow',
      '#FF69B4': 'Pink',
      '#9966CC': 'Purple',
      '#FF8C00': 'Orange',
      '#8B4513': 'Brown',
      '#001F3F': 'Navy',
      '#F5F5DC': 'Beige',
    };
    return colorNames[hex] || hex;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    if (!product) return;

    setIsAdding(true);

    addItem({
      id: product.id,
      variantId: `${product.id}-${selectedSize}-${selectedColor}`,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: getColorName(selectedColor),
      quantity: quantity,
      image: product.images?.[0] || '/images/products/hoodie-black.jpg',
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const nextImage = () => {
    if (product && product.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product && product.images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8FA]">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-[#1E2A5A]" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8FA]">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link href="/shop" className="text-[#1E2A5A] hover:underline">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Use colors from DB or fallback to extraction
  const availableColors = product.colors && product.colors.length > 0 
    ? product.colors 
    : extractColors(product.name);
    
  // Use sizes from DB or fallback to default
  const availableSizes = product.sizes && product.sizes.length > 0
    ? product.sizes
    : ['S', 'M', 'L', 'XL'];

  return (
    <div className="min-h-screen bg-[#F8F8FA] pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1E2A5A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div 
              className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-sm"
              layoutId={`product-image-${selectedImage}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <SafeImage
                    src={product.images[selectedImage] || '/images/products/hoodie-black.jpg'}
                    alt={`${product.name} - Image ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                    priority={selectedImage === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white text-sm rounded-full">
                {selectedImage + 1} / {product.images.length || 1}
              </div>

              {/* Badges */}
              {product.is_new && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#1E2A5A] text-white text-xs font-bold uppercase tracking-wider">
                  New
                </div>
              )}
            </motion.div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-[#1E2A5A] ring-2 ring-[#1E2A5A] ring-opacity-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SafeImage
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#1E2A5A] mb-4">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-black text-[#1E2A5A]">
                  €{product.price.toFixed(2)}
                </span>
                {product.stock < 10 && product.stock > 0 && (
                  <span className="text-sm text-amber-600 font-medium">
                    Only {product.stock} left in stock
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Color Selector */}
            {availableColors.length > 0 && (
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                  Color: {getColorName(selectedColor)}
                </label>
                <div className="flex gap-3">
                  {availableColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? 'border-[#1E2A5A] ring-2 ring-[#1E2A5A] ring-opacity-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color }}
                      title={getColorName(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-700">
                  Size {selectedSize && `(${selectedSize})`}
                </label>
                <button className="text-xs text-[#1E2A5A] hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border-2 text-sm font-bold uppercase tracking-wider transition-all ${
                      selectedSize === size
                        ? 'border-[#1E2A5A] bg-[#1E2A5A] text-white'
                        : 'border-gray-300 text-gray-700 hover:border-[#1E2A5A]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Available sizes: {availableSizes.join(', ')}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-300 hover:border-[#1E2A5A] flex items-center justify-center font-bold transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border-2 border-gray-300 hover:border-[#1E2A5A] flex items-center justify-center font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0 || !selectedSize}
              className={`w-full h-14 font-bold uppercase tracking-widest text-white flex items-center justify-center gap-2 transition-all ${
                product.stock === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isAdding
                  ? 'bg-green-600'
                  : 'bg-[#1E2A5A] hover:bg-[#3B4D80]'
              }`}
              whileHover={product.stock > 0 && !isAdding ? { scale: 1.02 } : {}}
              whileTap={product.stock > 0 && !isAdding ? { scale: 0.98 } : {}}
            >
              {product.stock === 0 ? (
                'Out of Stock'
              ) : isAdding ? (
                <>
                  <Check className="w-5 h-5" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </>
              )}
            </motion.button>

            {/* Product Info */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="w-5 h-5 flex-shrink-0" />
                <span>Free shipping in EU over €150</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                <span>Secure payment with Stripe</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Star className="w-5 h-5 flex-shrink-0" />
                <span>Premium quality materials</span>
              </div>
            </div>

            {/* SKU */}
            <p className="text-xs text-gray-400 pt-4">
              SKU: {product.sku}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
