import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import ChatWidget from './ChatWidget';
import { useAuth } from '../context/AuthContext';

interface ChatButtonProps {
  sellerName: string;
  sellerAvatar: string;
  sellerId: string;
  productId: string;
  variant?: 'default' | 'floating';
}

const ChatButton: React.FC<ChatButtonProps> = ({
  sellerName,
  sellerAvatar,
  sellerId,
  productId,
  variant = 'default',
}) => {
  const [showChat, setShowChat] = useState(false);
  const { state: authState } = useAuth();

  const handleChatClick = () => {
    if (!authState.isAuthenticated) {
      alert('Please login to chat with the seller');
      return;
    }
    setShowChat(true);
  };

  return (
    <>
      <button
        onClick={handleChatClick}
        className={`flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ${
          variant === 'floating' 
            ? 'p-3 shadow-lg' 
            : 'px-4 py-2'
        }`}
      >
        <MessageSquare className="h-5 w-5" />
        {variant === 'default' && <span>Chat with Seller</span>}
      </button>

      {showChat && (
        <ChatWidget
          productId={productId}
          sellerName={sellerName}
          sellerAvatar={sellerAvatar}
          sellerId={sellerId}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  );
};

export default ChatButton; 