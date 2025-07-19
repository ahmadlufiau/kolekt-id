import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    // Handle wishlist logic here
    console.log('Added to wishlist:', product.name);
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              -{product.discount}%
            </div>
          )}
          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-gray-600">{product.sold} sold</span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-orange-600">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-md hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;