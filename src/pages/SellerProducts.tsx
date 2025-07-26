import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  ArrowLeft,
  X,
  Star,
  Package
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SellerSidebar from '../components/SellerSidebar';
import { formatIDR } from '../utils/currency';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  stock: number;
  sold: number;
  rating: number;
  images: string[];
  status: 'active' | 'inactive' | 'out_of_stock';
}

const SellerProducts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and long battery life.',
      price: 1349000,
      originalPrice: 1949000,
      discount: 31,
      category: 'Electronics',
      stock: 12,
      sold: 45,
      rating: 4.5,
      images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=150'],
      status: 'active',
    },
    {
      id: '2',
      name: 'Stylish Women\'s Sneakers',
      description: 'Comfortable and fashionable sneakers perfect for everyday wear.',
      price: 1034000,
      category: 'Fashion',
      stock: 8,
      sold: 32,
      rating: 4.2,
      images: ['https://images.pexels.com/photos/1460691/pexels-photo-1460691.jpeg?auto=compress&cs=tinysrgb&w=150'],
      status: 'active',
    },
    {
      id: '3',
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with heart rate monitor and GPS.',
      price: 2999000,
      originalPrice: 3749000,
      discount: 20,
      category: 'Electronics',
      stock: 0,
      sold: 28,
      rating: 4.7,
      images: ['https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=150'],
      status: 'out_of_stock',
    },
    {
      id: '4',
      name: 'Organic Cotton T-Shirt',
      description: 'Soft and comfortable organic cotton t-shirt in various colors.',
      price: 449000,
      category: 'Fashion',
      stock: 25,
      sold: 15,
      rating: 4.0,
      images: ['https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg?auto=compress&cs=tinysrgb&w=150'],
      status: 'inactive',
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'out_of_stock':
        return 'Out of Stock';
      default:
        return status;
    }
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would make an API call
    console.log(`Deleting product ${productId}`);
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  const updateProductStatus = (productId: string, newStatus: Product['status']) => {
    // In a real app, this would make an API call
    console.log(`Updating product ${productId} status to: ${newStatus}`);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerSidebar />
      <div className="ml-64">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/seller/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
              <p className="text-gray-600">Manage your product catalog</p>
            </div>
          </div>
          <Link
            to="/seller/products/add"
                            className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#0A2647] transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Sports">Sports</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                    -{product.discount}%
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {getStatusText(product.status)}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.stock}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-bold text-gray-900">{formatIDR(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">{formatIDR(product.originalPrice)}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.sold} sold
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <Link
                    to={`/seller/products/edit/${product.id}`}
                    className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowDeleteModal(true);
                    }}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Details Modal */}
        {selectedProduct && !showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Product Images */}
                <div>
                  <img
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium text-gray-900">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProduct.status)}`}>
                        {getStatusText(selectedProduct.status)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-900">{formatIDR(selectedProduct.price)}</span>
                        {selectedProduct.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">{formatIDR(selectedProduct.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Stock</p>
                      <p className="font-medium text-gray-900">{selectedProduct.stock} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sold</p>
                      <p className="font-medium text-gray-900">{selectedProduct.sold} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{selectedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Status</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateProductStatus(selectedProduct.id, 'active')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => updateProductStatus(selectedProduct.id, 'inactive')}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Deactivate
                    </button>
                    <button
                      onClick={() => updateProductStatus(selectedProduct.id, 'out_of_stock')}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Mark Out of Stock
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Delete Product</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete "{selectedProduct.name}"? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(selectedProduct.id)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default SellerProducts; 