import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  helpCategories: Array<{
    id: string;
    title: string;
    icon: React.ReactNode;
  }>;
  faqs: Array<{
    id: number;
    question: string;
    category: string;
  }>;
}

const ChatBot: React.FC<ChatBotProps> = ({ helpCategories, faqs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m Shopee Assistant. How can I help you today? You can ask me about orders, payments, returns, or any other questions.',
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock AI responses based on help content
  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check for greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! Welcome to Shopee Help Center. I can help you with questions about shopping, payments, orders, returns, and more. What would you like to know?';
    }

    // Check for password/account issues
    if (lowerMessage.includes('password') || lowerMessage.includes('login') || lowerMessage.includes('account')) {
      return 'For account and password issues:\n\n1. Go to login page and click "Forgot Password"\n2. Enter your registered email or phone number\n3. Follow the reset instructions sent to you\n4. If you still can\'t access your account, please contact our live support.\n\nWould you like me to connect you with a live agent?';
    }

    // Check for payment issues
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('paylater') || lowerMessage.includes('card')) {
      return 'I can help with payment issues:\n\n• **PayLater**: Check your credit limit and payment history in ShopeePay\n• **Card Issues**: Ensure your card details are correct and has sufficient funds\n• **Payment Failed**: Try using a different payment method\n\nFor specific PayLater issues, you can contact our Consumer Protection Services. Need more help?';
    }

    // Check for shipping/orders
    if (lowerMessage.includes('order') || lowerMessage.includes('shipping') || lowerMessage.includes('delivery') || lowerMessage.includes('track')) {
      return 'For order and shipping questions:\n\n• **Track Order**: Go to "My Orders" in your profile\n• **Shipping Issues**: Contact the seller or our customer service\n• **Delivery Problems**: Check your address details and contact info\n\nYou can also track your order using the tracking number provided. Would you like help with a specific order?';
    }

    // Check for returns/refunds
    if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('cancel')) {
      return 'For returns and refunds:\n\n• **Return Items**: Go to order details and select "Return/Refund"\n• **Cancellation**: You can cancel orders before they\'re shipped\n• **Refund Process**: Refunds typically take 3-7 business days\n\nMake sure to pack items properly for return shipping. Need help with a specific return?';
    }

    // Check for ShopeeFood
    if (lowerMessage.includes('food') || lowerMessage.includes('shopeefood') || lowerMessage.includes('restaurant')) {
      return 'For ShopeeFood orders:\n\n• **Cancel Order**: You can cancel before restaurant confirms\n• **Delivery Issues**: Contact the delivery partner or restaurant\n• **Refunds**: Available for cancelled or problematic orders\n\nShopeeFood has different policies than regular Shopee orders. Need specific help with a food order?';
    }

    // Check for ShopeePay
    if (lowerMessage.includes('shopeepay') || lowerMessage.includes('wallet') || lowerMessage.includes('balance')) {
      return 'For ShopeePay questions:\n\n• **Add Money**: Use bank transfer, cards, or cash at partner locations\n• **Transaction Issues**: Check your transaction history\n• **Security**: Enable PIN and biometric protection\n\nShopeePay offers secure digital payments and rewards. What specific feature do you need help with?';
    }

    // Check for shopping general
    if (lowerMessage.includes('shop') || lowerMessage.includes('buy') || lowerMessage.includes('product') || lowerMessage.includes('seller')) {
      return 'For shopping on Shopee:\n\n• **Product Questions**: Contact the seller directly\n• **Seller Issues**: Check seller ratings and reviews\n• **Shopping Tips**: Look for Shopee Mall for authentic products\n• **Promotions**: Check our daily deals and flash sales\n\nIs there a specific product or seller you need help with?';
    }

    // Check for contact/support
    if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('agent')) {
      return 'You can contact Shopee support through:\n\n• **Live Chat**: Available 24/7 for immediate help\n• **Phone Support**: Call our customer service hotline\n• **Email**: Send detailed questions to our support team\n\nFor urgent issues like account security, I recommend using Live Chat. Would you like me to connect you with a live agent?';
    }

    // Default response with suggestions
    return `I'm not sure about that specific question, but I can help you with:\n\n• Account and login issues\n• Payment and PayLater problems\n• Order tracking and shipping\n• Returns and refunds\n• ShopeeFood orders\n• ShopeePay wallet\n• General shopping questions\n\nTry asking about any of these topics, or would you like to speak with a live agent?`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 seconds delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How to reset my password?",
    "Track my order",
    "Return an item",
    "Payment issues",
    "Contact support"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Shopee Assistant</h3>
                <p className="text-xs text-orange-100">Online • Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot ? 'bg-orange-100' : 'bg-blue-100'
                  }`}>
                    {message.isBot ? (
                      <Bot className="h-4 w-4 text-orange-600" />
                    ) : (
                      <User className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isBot ? 'text-gray-500' : 'text-orange-100'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI Assistant • For complex issues, contact live support
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;