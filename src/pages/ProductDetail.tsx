import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, Shield, Truck, RotateCcw, MessageSquare, Plus as PlusIcon } from 'lucide-react';
import { products, mockReviews } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import ChatButton from '../components/ChatButton';
import { Review, ReviewFormData } from '../types';
import { formatIDR } from '../utils/currency';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { state: authState } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(mockReviews.filter(r => r.productId === id));

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleSubmitReview = async (reviewData: ReviewFormData) => {
    if (!authState.isAuthenticated || !authState.user) {
      alert('Please login to submit a review');
      return;
    }

    setIsSubmittingReview(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newReview: Review = {
      id: `review-${Date.now()}`,
      productId: id!,
      userId: authState.user.id,
      userName: authState.user.name,
      userAvatar: authState.user.avatar,
      rating: reviewData.rating,
      title: reviewData.title,
      comment: reviewData.comment,
      createdAt: new Date().toISOString(),
      helpful: 0,
      images: reviewData.images,
    };

    setReviews(prev => [newReview, ...prev]);
    setShowReviewForm(false);
    setIsSubmittingReview(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${product.category}`} className="hover:text-orange-600">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({reviews.length} reviews)</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-600">{product.sold} sold</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
                              <span className="text-4xl font-bold text-[#FF6B6B]">{formatIDR(product.price)}</span>
                              {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{formatIDR(product.originalPrice)}</span>
                )}
              {product.discount && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                  -{product.discount}%
                </span>
              )}
            </div>

            <div className="prose text-gray-700">
              <p>{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#FF6B6B] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#0A2647] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Button */}
            <div className="mt-4">
              <ChatButton
                sellerName={product.seller.name}
                sellerAvatar="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150"
                sellerId="seller-1"
                productId={product.id}
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-600">Authentic</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-gray-600">30-Day Return</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Seller Information</h3>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium">{product.seller.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{product.seller.rating}</span>
                    <span>•</span>
                    <span>{product.seller.followers} followers</span>
                  </div>
                </div>
                <button className="text-orange-600 hover:text-orange-700 font-medium">
                  Follow
                </button>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Online now</span>
                </div>
                <ChatButton
                  sellerName={product.seller.name}
                  sellerAvatar="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150"
                  sellerId="seller-1"
                  productId={product.id}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">({reviews.length} reviews)</span>
              </div>
            </div>
            {authState.isAuthenticated && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="flex items-center space-x-2 bg-[#FF6B6B] text-white px-4 py-2 rounded-lg hover:bg-[#0A2647] transition-all duration-300"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Write Review</span>
              </button>
            )}
          </div>

          {/* Review Form Modal */}
          {showReviewForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="w-full max-w-2xl">
                <ReviewForm
                  onSubmit={handleSubmitReview}
                  onCancel={() => setShowReviewForm(false)}
                  isSubmitting={isSubmittingReview}
                />
              </div>
            </div>
          )}

          {/* Review Summary */}
          {reviews.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Summary</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                      </div>
                      <div className="flex justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">out of 5</div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                          const count = reviews.filter(r => r.rating === rating).length;
                          const percentage = (count / reviews.length) * 100;
                          return (
                            <div key={rating} className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600 w-4">{rating}</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-yellow-400 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-8">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Based on {reviews.length} customer reviews</p>
                  <p className="mt-2">Share your experience with this product to help other customers make informed decisions.</p>
                </div>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600 mb-4">Be the first to review this product!</p>
                {authState.isAuthenticated ? (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="bg-[#FF6B6B] text-white px-6 py-2 rounded-lg hover:bg-[#0A2647] transition-all duration-300"
                  >
                    Write First Review
                  </button>
                ) : (
                  <p className="text-sm text-gray-500">Please login to write a review</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 left-4 z-20">
        <ChatButton
          sellerName={product.seller.name}
          sellerAvatar="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150"
          sellerId="seller-1"
          productId={product.id}
          variant="floating"
        />
      </div>
    </div>
  );
};

export default ProductDetail;