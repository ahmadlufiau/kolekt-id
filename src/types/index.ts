export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  sold: number;
  category: string;
  description: string;
  discount?: number;
  tags?: string[];
  seller: {
    name: string;
    rating: number;
    followers: number;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  address: Address;
  paymentMethod: PaymentMethod;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
  images?: string[];
}

export interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
  images: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderType: 'customer' | 'seller';
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatRoom {
  id: string;
  productId: string;
  customerId: string;
  sellerId: string;
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}