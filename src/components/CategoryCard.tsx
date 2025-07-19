import React from 'react';
import { Category } from '../types';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className="group flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-16 h-16 mb-3 rounded-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
        {category.icon}
      </div>
      <h3 className="text-sm font-medium text-gray-800 text-center group-hover:text-orange-600 transition-colors">
        {category.name}
      </h3>
    </Link>
  );
};

export default CategoryCard;