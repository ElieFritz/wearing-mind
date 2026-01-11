'use client';

import { TrendingUp, Package, ShoppingCart, Users, AlertCircle } from 'lucide-react';

// Composant StatCard
function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  trend = 'up' 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: any;
  trend?: 'up' | 'down';
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="p-2 bg-[#1E2A5A]/10 rounded-lg">
          <Icon className="w-5 h-5 text-[#1E2A5A]" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {change} vs last month
          </p>
        </div>
      </div>
    </div>
  );
}

// Composant RecentOrder
function RecentOrder({ 
  orderId, 
  customer, 
  amount, 
  status 
}: { 
  orderId: string; 
  customer: string; 
  amount: string; 
  status: string;
}) {
  const statusColors: Record<string, string> = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="flex-1">
        <p className="font-medium text-gray-900">#{orderId}</p>
        <p className="text-sm text-gray-500">{customer}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-semibold text-gray-900">{amount}</p>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

// Composant LowStockProduct
function LowStockProduct({ 
  name, 
  sku, 
  stock 
}: { 
  name: string; 
  sku: string; 
  stock: number;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">SKU: {sku}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-red-600">{stock} left</span>
        <AlertCircle className="w-4 h-4 text-red-600" />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  // Mock data - A remplacer par vraies donnees API
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '€24,567', 
      change: '+12.5%', 
      icon: TrendingUp,
      trend: 'up' as const
    },
    { 
      title: 'Total Orders', 
      value: '234', 
      change: '+8.2%', 
      icon: ShoppingCart,
      trend: 'up' as const
    },
    { 
      title: 'Products', 
      value: '89', 
      change: '+3', 
      icon: Package,
      trend: 'up' as const
    },
    { 
      title: 'Customers', 
      value: '1,234', 
      change: '+15.3%', 
      icon: Users,
      trend: 'up' as const
    },
  ];

  const recentOrders = [
    { orderId: '1001', customer: 'Jean Dupont', amount: '€120.00', status: 'completed' },
    { orderId: '1002', customer: 'Marie Martin', amount: '€95.00', status: 'processing' },
    { orderId: '1003', customer: 'Pierre Dubois', amount: '€180.00', status: 'pending' },
    { orderId: '1004', customer: 'Sophie Bernard', amount: '€55.00', status: 'completed' },
    { orderId: '1005', customer: 'Luc Petit', amount: '€140.00', status: 'processing' },
  ];

  const lowStockProducts = [
    { name: 'Mind Hoodie Black', sku: 'WM-H001-BLK-L', stock: 3 },
    { name: 'Logo Tee White', sku: 'WM-T001-WHT-M', stock: 5 },
    { name: 'Oversized Sweat', sku: 'WM-S001-GRY-XL', stock: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Orders & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <a href="/admin/orders" className="text-sm text-[#1E2A5A] hover:underline">
              View all ?
            </a>
          </div>
          <div className="space-y-0">
            {recentOrders.map((order, index) => (
              <RecentOrder key={index} {...order} />
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Low Stock Alert</h2>
            <a href="/admin/products" className="text-sm text-[#1E2A5A] hover:underline">
              View all ?
            </a>
          </div>
          <div className="space-y-0">
            {lowStockProducts.map((product, index) => (
              <LowStockProduct key={index} {...product} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a 
          href="/admin/products/new"
          className="bg-[#1E2A5A] text-white rounded-lg p-6 hover:bg-[#3B4D80] transition-colors cursor-pointer"
        >
          <Package className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-bold mb-2">Add New Product</h3>
          <p className="text-sm text-white/80">Create a new product listing</p>
        </a>
        
        <a 
          href="/admin/orders"
          className="bg-white text-gray-900 rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200"
        >
          <ShoppingCart className="w-8 h-8 mb-3 text-[#1E2A5A]" />
          <h3 className="text-lg font-bold mb-2">Manage Orders</h3>
          <p className="text-sm text-gray-600">Process and track orders</p>
        </a>
        
        <a 
          href="/admin/analytics"
          className="bg-white text-gray-900 rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer border border-gray-200"
        >
          <TrendingUp className="w-8 h-8 mb-3 text-[#1E2A5A]" />
          <h3 className="text-lg font-bold mb-2">View Analytics</h3>
          <p className="text-sm text-gray-600">Sales and performance metrics</p>
        </a>
      </div>
    </div>
  );
}
