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