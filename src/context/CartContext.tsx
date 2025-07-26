import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { CartItem, Product, Order, Address, PaymentMethod } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  state: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelect: (productId: string) => void;
  clearCart: () => void;
  createOrder: (address: Address, paymentMethod: PaymentMethod) => Order;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'TOGGLE_SELECT'; productId: string }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.product.id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
      const newItems = [...state.items, { product: action.product, quantity: 1, selected: true }];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.productId);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: Math.max(0, action.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    case 'TOGGLE_SELECT': {
      const updatedItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, selected: !item.selected }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

const calculateTotal = (items: CartItem[]): number => {
  return items
    .filter(item => item.selected)
    .reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', productId });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  }, []);

  const toggleSelect = useCallback((productId: string) => {
    dispatch({ type: 'TOGGLE_SELECT', productId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const createOrder = useCallback((address: Address, paymentMethod: PaymentMethod): Order => {
    const selectedItems = state.items.filter(item => item.selected);
    const subtotal = selectedItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: selectedItems,
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
      address,
      paymentMethod,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return order;
  }, [state.items]);

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleSelect,
      clearCart,
      createOrder,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};