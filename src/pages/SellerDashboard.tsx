import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  DollarSign, 
  Users, 
  TrendingUp, 
  ShoppingBag, 
  Settings,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SellerSidebar from '../components/SellerSidebar';
import { formatIDR } from '../utils/currency';

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  salesGrowth: number;
  orderGrowth: number;
}

interface RecentOrder {
  id: string;
  customerName: string;
  productName: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

interface TopProduct {
  id: string;
  name: string;
  image: string;
  sales: number;
  revenue: number;
  stock: number;
}

const SellerDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // Mock data
  const stats: DashboardStats = {
    totalSales: 231307500, // Rp 231,307,500
    totalOrders: 89,
    totalProducts: 24,
    totalCustomers: 67,
    salesGrowth: 12.5,
    orderGrowth: -2.3,
  };

  const recentOrders: RecentOrder[] = [
    {
      id: 'ORD-001',
      customerName: 'Budi Santoso',
      productName: 'Wireless Bluetooth Headphones',
      amount: 1349000,
      status: 'shipped',
      date: '2024-01-15T10:30:00Z',
    },
    {
      id: 'ORD-002',
      customerName: 'Sari Wijaya',
      productName: 'Stylish Women\'s Sneakers',
      amount: 1034000,
      status: 'confirmed',
      date: '2024-01-15T09:15:00Z',
    },
    {
      id: 'ORD-003',
      customerName: 'Ahmad Rahman',
      productName: 'Wireless Bluetooth Headphones',
      amount: 1349000,
      status: 'delivered',
      date: '2024-01-14T16:45:00Z',
    },
    {
      id: 'ORD-004',
      customerName: 'Dewi Putri',
      productName: 'Smart Fitness Watch',
      amount: 2999000,
      status: 'pending',
      date: '2024-01-14T14:20:00Z',
    },
  ];

  const topProducts: TopProduct[] = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=150',
      sales: 45,
      revenue: 4049.55,
      stock: 12,
    },
    {
      id: '2',
      name: 'Stylish Women\'s Sneakers',
      image: 'https://images.pexels.com/photos/1460691/pexels-photo-1460691.jpeg?auto=compress&cs=tinysrgb&w=150',
      sales: 32,
      revenue: 4159.68,
      stock: 8,
    },
    {
      id: '3',
      name: 'Smart Fitness Watch',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=150',
      sales: 28,
      revenue: 5599.72,
      stock: 15,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerSidebar />
      <div className="ml-64">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
                         <Link
               to="/seller/products/add"
               className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#0A2647] transition-all duration-300 flex items-center space-x-2"
             >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">{formatIDR(stats.totalSales)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`h-4 w-4 mr-1 ${stats.salesGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm ${stats.salesGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.salesGrowth >= 0 ? '+' : ''}{stats.salesGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`h-4 w-4 mr-1 ${stats.orderGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`} />
                  <span className={`text-sm ${stats.orderGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.orderGrowth >= 0 ? '+' : ''}{stats.orderGrowth}%
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                <p className="text-sm text-gray-500 mt-2">Active listings</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                <p className="text-sm text-gray-500 mt-2">Unique buyers</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                                     <Link
                     to="/seller/orders"
                     className="text-[#FF6B6B] hover:text-[#0A2647] font-medium"
                   >
                    View All
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.customerName}</p>
                          <p className="text-sm text-gray-600">{order.productName}</p>
                          <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatIDR(order.amount)}</p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Top Products</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${product.revenue.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">{product.stock} in stock</p>
                      </div>
                    </div>
                  ))}
                </div>
                                 <Link
                   to="/seller/products"
                   className="block mt-4 text-center text-[#FF6B6B] hover:text-[#0A2647] font-medium"
                 >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/seller/products"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Manage Products</p>
                  <p className="text-sm text-gray-600">Add, edit, or remove products</p>
                </div>
              </div>
            </Link>

            <Link
              to="/seller/orders"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">View Orders</p>
                  <p className="text-sm text-gray-600">Process and track orders</p>
                </div>
              </div>
            </Link>

            <Link
              to="/seller/analytics"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Analytics</p>
                  <p className="text-sm text-gray-600">View detailed reports</p>
                </div>
              </div>
            </Link>

            <Link
              to="/seller/settings"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Settings</p>
                  <p className="text-sm text-gray-600">Store configuration</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SellerDashboard; 