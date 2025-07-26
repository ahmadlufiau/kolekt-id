import React, { useState } from 'react';
import { Settings, Check, X } from 'lucide-react';
import { useCategories } from '../context/CategoryContext';
import { categories } from '../data/mockData';

const CategoryCustomizer: React.FC = () => {
  const { isQuickAccess, toggleQuickAccess } = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
        title="Customize categories"
      >
        <Settings className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border z-50 w-80 transform -translate-x-1/2 left-1/2">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Access Categories</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 p-4 pb-2">
              Select categories to show on homepage. All categories will be in "View All".
            </p>
            
            <div className="max-h-64 overflow-y-auto p-4 pt-0">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => toggleQuickAccess(category.id)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    isQuickAccess(category.id)
                      ? 'bg-orange-500 border-orange-500'
                      : 'border-gray-300'
                  }`}>
                    {isQuickAccess(category.id) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#FF6B6B] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#0A2647] transition-all duration-300"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryCustomizer;