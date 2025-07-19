import React, { useState } from 'react';
import { Search, ShoppingBag, Gift, CreditCard, Truck, RefreshCw, Info, Utensils, DollarSign, X, MessageCircle, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatBot from '../components/ChatBot';

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  const categories = [
    {
      id: 'shopping',
      title: 'Shopping at Shopee',
      icon: <ShoppingBag className="h-6 w-6" />,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
    },
    {
      id: 'offers',
      title: 'Offers & Rewards',
      icon: <Gift className="h-6 w-6" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'payment',
      title: 'Payment',
      icon: <CreditCard className="h-6 w-6" />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 'orders',
      title: 'Orders & Shipping',
      icon: <Truck className="h-6 w-6" />,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      icon: <RefreshCw className="h-6 w-6" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'general',
      title: 'General Information',
      icon: <Info className="h-6 w-6" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'food',
      title: 'ShopeeFood',
      icon: <Utensils className="h-6 w-6" />,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      id: 'pay',
      title: 'ShopeePay',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: '[My Account] How to reset my Shopee account password if I forgot it?',
      category: 'shopping',
    },
    {
      id: 2,
      question: '[ShopeePay] How do I contact Consumer Protection Services?',
      category: 'pay',
    },
    {
      id: 3,
      question: '[My Account] Why can\'t I log into my Shopee account?',
      category: 'shopping',
    },
    {
      id: 4,
      question: '[PayLater - Payment] Why can\'t I use PayLater?',
      category: 'payment',
    },
    {
      id: 5,
      question: '[FAQ] PayLater',
      category: 'payment',
    },
    {
      id: 6,
      question: '[New to Shopee] Why can\'t I register my Shopee account with my phone number?',
      category: 'shopping',
    },
    {
      id: 7,
      question: '[Account Security] How to maintain the security of my Shopee account?',
      category: 'shopping',
    },
    {
      id: 8,
      question: '[ShopeeFood Purchase] How to cancel a ShopeeFood order?',
      category: 'food',
    },
    {
      id: 9,
      question: '[My Account] How to change/update my phone number?',
      category: 'shopping',
    },
    {
      id: 10,
      question: '[Return Shipping] How to pack items for return to Seller?',
      category: 'returns',
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Help Center Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Shopee</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Shopee</span>
                <span className="text-gray-500">Help Center</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Shopee Policies</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Hi, how can we help you?
            </h1>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-16 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300 text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Notification Banner */}
      {showNotification && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    If your Shopee account has been hacked, please contact Customer Service immediately by selecting 
                    <span className="font-semibold"> Live Chat with Shopee </span> - select 
                    <span className="font-semibold"> Chat with Live Agent</span>.{' '}
                    <button className="text-yellow-800 underline hover:text-yellow-900">
                      Learn more
                    </button>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="flex-shrink-0 ml-4 text-yellow-400 hover:text-yellow-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-left"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${category.bgColor} ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {category.title}
                </h3>
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ</h2>
          <div className="bg-white rounded-lg shadow-md">
            {faqs.map((faq, index) => (
              <button
                key={faq.id}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  index !== faqs.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <p className="text-gray-700 hover:text-orange-600 transition-colors">
                  {faq.question}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Still need help?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team</p>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                Start Chat
              </button>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us for immediate help</p>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                Call Now
              </button>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Mail className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us your questions</p>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                Send Email
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                Shopee Policies
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                Privacy Policy
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-gray-600 text-sm">© 2024 Sea Group. All rights reserved.</p>
              <div className="flex space-x-2">
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ig</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <ChatBot helpCategories={categories} faqs={faqs} />
    </div>
  );
};

export default HelpCenter;