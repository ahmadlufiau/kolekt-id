import React, { useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, MapPin, CreditCard, ArrowRight } from 'lucide-react';
import { Order } from '../types';
import { useCart } from '../context/CartContext';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const order = location.state?.order as Order;

  const handleNavigateHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (!order) {
      handleNavigateHome();
      return;
    }
    
    // Clear cart after successful order
    clearCart();
  }, [order, handleNavigateHome, clearCart]);

  if (!order) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Confirmed
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-semibold text-gray-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold text-gray-900">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold text-gray-900">{formatDate(order.estimatedDelivery)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold text-orange-600 text-lg">${order.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>
              <div className="text-gray-700">
                <p className="font-semibold">{order.address.name}</p>
                <p>{order.address.phone}</p>
                <p>{order.address.address}</p>
                <p>{order.address.city}, {order.address.state} {order.address.zipCode}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="h-5 w-5 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-6 rounded flex items-center justify-center text-xs font-bold text-white ${
                  order.paymentMethod.type === 'card' ? 'bg-blue-600' : 'bg-yellow-500'
                }`}>
                  {order.paymentMethod.type === 'card' ? 'CARD' : 'PP'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{order.paymentMethod.name}</p>
                  <p className="text-gray-600 text-sm">{order.paymentMethod.details}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-xl font-bold text-orange-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Order Processing</p>
                    <p className="text-sm text-gray-600">We're preparing your items for shipment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Shipped</p>
                    <p className="text-sm text-gray-600">You'll receive tracking information</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Delivered</p>
                    <p className="text-sm text-gray-600">Expected by {formatDate(order.estimatedDelivery)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to={`/order-tracking/${order.id}`}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Package className="h-5 w-5" />
                <span>Track Order</span>
              </Link>
              <Link
                to="/"
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <p className="text-blue-800">
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;