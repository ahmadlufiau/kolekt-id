import React from 'react';
import { categories } from '../data/mockData';
import { Link } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import { Settings, Star } from 'lucide-react';

const Categories: React.FC = () => {
  const { quickAccessCategories, hiddenCategories, isQuickAccess, toggleQuickAccess } = useCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Categories</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Settings className="h-4 w-4" />
            <span>Click any category to toggle quick access</span>
          </div>
        </div>
        
        {/* Quick Access Categories */}
        {quickAccessCategories.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-5 w-5 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">Quick Access</h2>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {quickAccessCategories.length}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {quickAccessCategories.map((category) => (
                <div key={category.id} className="relative">
                  <Link
                    to={`/category/${category.id}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{category.icon}</span>
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {category.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">Explore {category.name.toLowerCase()} products</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleQuickAccess(category.id)}
                    className="absolute top-2 right-2 p-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
                    title="Remove from quick access"
                  >
                    <Star className="h-4 w-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* All Other Categories */}
        {hiddenCategories.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900">All Categories</h2>
              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                {hiddenCategories.length}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {hiddenCategories.map((category) => (
                <div key={category.id} className="relative">
                  <Link
                    to={`/category/${category.id}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">{category.icon}</span>
                        <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {category.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">Explore {category.name.toLowerCase()} products</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => toggleQuickAccess(category.id)}
                    className="absolute top-2 right-2 p-2 bg-gray-200 text-gray-600 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-colors"
                    title="Add to quick access"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Fallback - show all if no customization */}
        {quickAccessCategories.length === 0 && hiddenCategories.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="relative">
                <Link
                  to={`/category/${category.id}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">Explore {category.name.toLowerCase()} products</p>
                  </div>
                </Link>
                <button
                  onClick={() => toggleQuickAccess(category.id)}
                  className="absolute top-2 right-2 p-2 bg-gray-200 text-gray-600 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-colors"
                  title="Add to quick access"
                >
                  <Star className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Old static grid - keeping for reference but hidden */}
        <div className="hidden grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">Explore {category.name.toLowerCase()} products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;