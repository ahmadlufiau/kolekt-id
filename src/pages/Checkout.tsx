import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, Shield, ChevronRight, Edit } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { mockAddresses, mockPaymentMethods } from '../data/mockData';
import { Address, PaymentMethod } from '../types';

const Checkout: React.FC = () => {
  const { state, createOrder } = useCart();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<Address>(mockAddresses[0]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(mockPaymentMethods[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedItems = state.items.filter(item => item.selected);
  const subtotal = selectedItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const order = createOrder(selectedAddress, selectedPayment);
    
    // Navigate to order confirmation
    navigate('/order-confirmation', { 
      state: { order },
      replace: true 
    });
  };

  if (selectedItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                </div>
                <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center">
                  <Edit className="h-4 w-4 mr-1" />
                  Change
                </button>
              </div>
              
              <div className="space-y-3">
                {mockAddresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedAddress.id === address.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{address.name}</p>
                        <p className="text-gray-600">{address.phone}</p>
                        <p className="text-gray-600">{address.address}</p>
                        <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                      </div>
                      {address.isDefault && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>
                <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center">
                  <Edit className="h-4 w-4 mr-1" />
                  Change
                </button>
              </div>
              
              <div className="space-y-3">
                {mockPaymentMethods.map((payment) => (
                  <div
                    key={payment.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedPayment.id === payment.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPayment(payment)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-6 rounded flex items-center justify-center text-xs font-bold text-white ${
                          payment.type === 'card' ? 'bg-blue-600' : 'bg-yellow-500'
                        }`}>
                          {payment.type === 'card' ? 'CARD' : 'PP'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{payment.name}</p>
                          <p className="text-gray-600 text-sm">{payment.details}</p>
                        </div>
                      </div>
                      {payment.isDefault && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {selectedItems.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-xl font-bold text-orange-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>SSL Encrypted Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <span>Free Returns within 30 days</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  isProcessing
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Place Order'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;