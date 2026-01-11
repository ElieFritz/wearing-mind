'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RefreshCw, Plus, X } from 'lucide-react';
import { productsApi } from '@/lib/api';
import ImageUploader from '@/components/ImageUploader';

const AVAILABLE_SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const DEFAULT_SIZES = ['S', 'M', 'L', 'XL'];

const COLOR_PRESETS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Grey', hex: '#808080' },
  { name: 'Navy', hex: '#001F3F' },
  { name: 'Blue', hex: '#0066CC' },
  { name: 'Red', hex: '#CC0000' },
  { name: 'Green', hex: '#00CC00' },
  { name: 'Beige', hex: '#F5F5DC' },
];

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(DEFAULT_SIZES);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    category: 'Hoodie',
    description: '',
    stock: '',
    is_new: false,
    is_featured: false,
  });

  // Auto-generate SKU from name
  useEffect(() => {
    if (formData.name && !formData.sku) {
      const generatedSku = generateSku(formData.name, formData.category);
      setFormData(prev => ({ ...prev, sku: generatedSku }));
    }
  }, [formData.name, formData.category]);

  // Auto-detect colors from name
  useEffect(() => {
    if (formData.name && selectedColors.length === 0) {
      const detectedColors = detectColorsFromName(formData.name);
      if (detectedColors.length > 0) {
        setSelectedColors(detectedColors);
      }
    }
  }, [formData.name]);

  const generateSku = (name: string, category: string): string => {
    const categoryPrefix = {
      'Hoodie': 'H',
      'T-Shirt': 'T',
      'Sweatshirt': 'S',
      'Accessories': 'A',
    }[category] || 'P';

    const namePart = name
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .substring(0, 3);

    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `WM-${categoryPrefix}${namePart}-${random}`;
  };

  const detectColorsFromName = (name: string): string[] => {
    const detected: string[] = [];
    const lowerName = name.toLowerCase();
    
    COLOR_PRESETS.forEach(color => {
      if (lowerName.includes(color.name.toLowerCase())) {
        detected.push(color.hex);
      }
    });
    
    return detected;
  };

  const regenerateSku = () => {
    const newSku = generateSku(formData.name || 'PROD', formData.category);
    setFormData(prev => ({ ...prev, sku: newSku }));
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (hex: string) => {
    setSelectedColors(prev =>
      prev.includes(hex)
        ? prev.filter(c => c !== hex)
        : [...prev, hex]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSizes.length === 0) {
      alert('Please select at least one size');
      return;
    }
    
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        images: imageUrls,
        sizes: selectedSizes,
        colors: selectedColors,
      };

      await productsApi.create(productData);
      alert('Product created successfully!');
      router.push('/admin/products');
    } catch (error: any) {
      alert(`Failed to create product: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-sm text-gray-600 mt-1">Create a new product listing</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Mind Hoodie Black"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2A5A] focus:border-transparent outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU *
                  <span className="text-xs text-gray-500 ml-2">(Auto-generated)</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="sku"
                    required
                    value={formData.sku}
                    onChange={handleChange}
                    placeholder="e.g., WM-H001-BLK"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2A5A] focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={regenerateSku}
                    title="Generate new SKU"
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RefreshCw className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2A5A] focus:border-transparent outline-none"
                >
                  <option value="Hoodie">Hoodie</option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Sweatshirt">Sweatshirt</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Product description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2A5A] focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>

          {/* Sizes Section */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Available Sizes *</h3>
              <p className="text-sm text-gray-500 mb-3">Select sizes available for this product</p>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AVAILABLE_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`h-12 border-2 text-sm font-bold uppercase tracking-wider transition-all ${
                    selectedSizes.includes(size)
                      ? 'border-[#1E2A5A] bg-[#1E2A5A] text-white'
                      : 'border-gray-300 text-gray-700 hover:border-[#1E2A5A]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            
            {selectedSizes.length > 0 && (
              <p className="text-sm text-gray-600">
                Selected: {selectedSizes.join(', ')} ({selectedSizes.length} sizes)
              </p>
            )}
          </div>

          {/* Colors Section */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Available Colors</h3>
              <p className="text-sm text-gray-500 mb-3">Select color variants (auto-detected from name)</p>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color.hex}
                  type="button"
                  onClick={() => toggleColor(color.hex)}
                  className={`relative h-12 rounded-lg border-2 transition-all ${
                    selectedColors.includes(color.hex)
                      ? 'border-[#1E2A5A] ring-2 ring-[#1E2A5A] ring-opacity-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColors.includes(color.hex) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#1E2A5A]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {selectedColors.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedColors.map((hex) => {
                  const colorName = COLOR_PRESETS.find(c => c.hex === hex)?.name || hex;
                  return (
                    <span
                      key={hex}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: hex }}
                      />
                      {colorName}
                      <button
                        type="button"
                        onClick={() => toggleColor(hex)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Images Section with Uploader */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Product Images</h3>
              <span className="text-sm text-gray-500">Max 5 images, 5MB each</span>
            </div>
            
            <ImageUploader
              images={imageUrls}
              onImagesChange={setImageUrls}
              maxImages={5}
            />
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Pricing & Inventory</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (€) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="120.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2A5A] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Stock *
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E2A5A] focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Total stock across all sizes
                </p>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_new"
                  checked={formData.is_new}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#1E2A5A] border-gray-300 rounded focus:ring-[#1E2A5A]"
                />
                <span className="text-sm text-gray-700">Mark as New</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#1E2A5A] border-gray-300 rounded focus:ring-[#1E2A5A]"
                />
                <span className="text-sm text-gray-700">Feature on Homepage</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <Link
              href="/admin/products"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#1E2A5A] text-white rounded-lg hover:bg-[#3B4D80] transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
