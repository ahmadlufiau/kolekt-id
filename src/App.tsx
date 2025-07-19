import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { CategoryProvider } from './context/CategoryContext';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderTracking from './pages/OrderTracking';
import HelpCenter from './pages/HelpCenter';

function AppContent() {
  const location = useLocation();
  const isHelpPage = location.pathname === '/help';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isHelpPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
          <Route path="/help" element={<HelpCenter />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <CategoryProvider>
        <Router>
          <AppContent />
        </Router>
      </CategoryProvider>
    </CartProvider>
  );
}

export default App;