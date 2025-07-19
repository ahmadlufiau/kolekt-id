import React from 'react';
import { User, Package, Heart, Settings, Bell, MapPin, CreditCard } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-gray-600">john.doe@email.com</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 text-orange-600 font-medium">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Package className="h-5 w-5" />
                  <span>Orders</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <MapPin className="h-5 w-5" />
                  <span>Addresses</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </a>
                <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value="John"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value="Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value="john.doe@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value="+1 (555) 123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <button className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                Save Changes
              </button>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Order #12345</h4>
                      <p className="text-sm text-gray-600">3 items • $149.97</p>
                      <p className="text-sm text-green-600">Delivered</p>
                    </div>
                  </div>
                  <button className="text-orange-600 hover:text-orange-700 font-medium">
                    View Details
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Order #12344</h4>
                      <p className="text-sm text-gray-600">2 items • $89.98</p>
                      <p className="text-sm text-blue-600">Shipped</p>
                    </div>
                  </div>
                  <button className="text-orange-600 hover:text-orange-700 font-medium">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;