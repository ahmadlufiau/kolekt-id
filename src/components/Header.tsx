import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, User, Heart, Bell } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const location = useLocation();

  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center space-x-4">
            <span>Follow us on</span>
            <div className="flex space-x-2">
              <a href="#" className="hover:text-orange-200 transition-colors">Facebook</a>
              <a href="#" className="hover:text-orange-200 transition-colors">Instagram</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
            <span>|</span>
            <Link to="/help" className="hover:text-orange-200 transition-colors">Help</Link>
            <span>|</span>
            <span>English</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white hover:text-orange-200 transition-colors">
            Shopee
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-12 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded-md transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Navigation icons */}
          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="flex items-center space-x-1 hover:text-orange-200 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="hidden md:inline">Wishlist</span>
            </Link>
            
            <Link to="/cart" className="flex items-center space-x-1 hover:text-orange-200 transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <Link to="/profile" className="flex items-center space-x-1 hover:text-orange-200 transition-colors">
              <User className="h-5 w-5" />
              <span className="hidden md:inline">Profile</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-400">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="hover:text-orange-200 transition-colors">Home</Link>
              <Link to="/categories" className="hover:text-orange-200 transition-colors">Categories</Link>
              <Link to="/deals" className="hover:text-orange-200 transition-colors">Flash Deals</Link>
              <Link to="/wishlist" className="hover:text-orange-200 transition-colors">Wishlist</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;