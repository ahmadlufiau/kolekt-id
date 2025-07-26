import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { useAuth } from '../context/AuthContext';

interface ChatWidgetProps {
  productId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerId: string;
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  sellerName,
  sellerAvatar,
  sellerId,
  onClose,
}) => {
  const { state: authState } = useAuth();
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock initial messages
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: 'welcome',
        senderId: sellerId,
        senderName: sellerName,
        senderAvatar: sellerAvatar,
        senderType: 'seller',
        message: `Hi! Welcome to ${sellerName}. How can I help you with this product?`,
        timestamp: new Date().toISOString(),
        isRead: true,
      },
    ];
    setMessages(initialMessages);
  }, [sellerId, sellerName, sellerAvatar]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || !authState.user) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: authState.user.id,
      senderName: authState.user.name,
      senderAvatar: authState.user.avatar,
      senderType: 'customer',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate seller typing
    setIsTyping(true);
    setTimeout(() => {
      const sellerResponse: ChatMessage = {
        id: `seller-${Date.now()}`,
        senderId: sellerId,
        senderName: sellerName,
        senderAvatar: sellerAvatar,
        senderType: 'seller',
        message: getSellerResponse(message.trim()),
        timestamp: new Date().toISOString(),
        isRead: false,
      };
      setMessages(prev => [...prev, sellerResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getSellerResponse = (customerMessage: string): string => {
    const lowerMessage = customerMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'The current price is as shown on the product page. We also offer special discounts for bulk orders!';
    }
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return 'We offer free shipping on orders over $50. Standard delivery takes 3-5 business days.';
    }
    if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) {
      return 'All our products come with a 1-year manufacturer warranty. We also offer extended warranty options.';
    }
    if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return 'We have a 30-day return policy. If you\'re not satisfied, you can return the item for a full refund.';
    }
    if (lowerMessage.includes('stock') || lowerMessage.includes('available')) {
      return 'Yes, this item is currently in stock! We recommend ordering soon as inventory can change quickly.';
    }
    if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
      return 'The sizing information is available in the product description. If you need help finding the right size, let me know your measurements!';
    }
    if (lowerMessage.includes('quality') || lowerMessage.includes('material')) {
      return 'We only sell high-quality products from trusted manufacturers. All items are thoroughly tested before shipping.';
    }
    
    return 'Thank you for your question! I\'ll be happy to help you with any specific details about this product.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="fixed bottom-4 right-4 z-30">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-80">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={sellerAvatar} alt={sellerName} className="w-8 h-8 rounded-full" />
                <div>
                  <h3 className="font-semibold">{sellerName}</h3>
                  <p className="text-sm opacity-90">Online</p>
                </div>
              </div>
              <button onClick={onClose} className="text-white hover:text-gray-200">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-6 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Login to Chat</h3>
            <p className="text-gray-600 mb-4">Please login to start chatting with the seller</p>
            <button
              onClick={() => window.location.href = '/login'}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
            >
              Login Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-80">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={sellerAvatar} alt={sellerName} className="w-8 h-8 rounded-full" />
              <div>
                <h3 className="font-semibold">{sellerName}</h3>
                <p className="text-sm opacity-90">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-gray-200"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button onClick={onClose} className="text-white hover:text-gray-200">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderType === 'customer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[80%] ${msg.senderType === 'customer' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                    <div
                      className={`px-3 py-2 rounded-lg ${
                        msg.senderType === 'customer'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.senderType === 'customer' ? 'text-orange-100' : 'text-gray-500'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2">
                    <img
                      src={sellerAvatar}
                      alt={sellerName}
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWidget; 