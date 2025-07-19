import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category } from '../types';
import { categories } from '../data/mockData';

interface CategoryContextType {
  quickAccessCategories: Category[];
  hiddenCategories: Category[];
  toggleQuickAccess: (categoryId: string) => void;
  isQuickAccess: (categoryId: string) => boolean;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default quick access categories (Electronics and Fashion)
  const [quickAccessIds, setQuickAccessIds] = useState<string[]>(['1', '2']);

  const quickAccessCategories = categories.filter(cat => quickAccessIds.includes(cat.id));
  const hiddenCategories = categories.filter(cat => !quickAccessIds.includes(cat.id));

  const toggleQuickAccess = (categoryId: string) => {
    setQuickAccessIds(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const isQuickAccess = (categoryId: string) => {
    return quickAccessIds.includes(categoryId);
  };

  return (
    <CategoryContext.Provider value={{
      quickAccessCategories,
      hiddenCategories,
      toggleQuickAccess,
      isQuickAccess,
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};