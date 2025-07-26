import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Settings,
  Users,
  DollarSign,
  MessageSquare,
  Home
} from 'lucide-react';

const SellerSidebar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/seller/dashboard', icon: Home },
    { name: 'Orders', href: '/seller/orders', icon: Package },
    { name: 'Products', href: '/seller/products', icon: ShoppingBag },
    { name: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
    { name: 'Customers', href: '/seller/customers', icon: Users },
    { name: 'Earnings', href: '/seller/earnings', icon: DollarSign },
    { name: 'Messages', href: '/seller/messages', icon: MessageSquare },
    { name: 'Settings', href: '/seller/settings', icon: Settings },
  ];

  return (
    <div className="bg-white shadow-lg w-64 min-h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        <Link to="/seller/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#FF6B6B] rounded-lg flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Seller Hub</span>
        </Link>
      </div>

      <nav className="mt-6">
        <div className="px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#FF6B6B]/10 text-[#FF6B6B] border-r-2 border-[#FF6B6B]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-[#FF6B6B]' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="mt-8 px-3">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Today's Orders</span>
              <span className="font-medium text-gray-900">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Today's Sales</span>
              <span className="font-medium text-gray-900">$1,234</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pending Orders</span>
                               <span className="font-medium text-[#FF6B6B]">5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Store */}
      <div className="mt-8 px-3">
        <Link
          to="/"
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
        >
          <Home className="mr-3 h-5 w-5 text-gray-400" />
          Back to Store
        </Link>
      </div>
    </div>
  );
};

export default SellerSidebar; 