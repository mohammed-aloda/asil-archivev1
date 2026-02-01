import React, { useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
// Keep Home eager for LCP
import Home from './pages/Home';

// Lazy Load Pages
const Shop = lazy(() => import('./pages/Shop'));
const About = lazy(() => import('./pages/About'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CustomRequest = lazy(() => import('./pages/CustomRequest'));
const CulturalJerseys = lazy(() => import('./pages/CulturalJerseys'));
const UniqueJerseys = lazy(() => import('./pages/UniqueJerseys'));
const Admin = lazy(() => import('./pages/Admin'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Country = lazy(() => import('./pages/Country'));

import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import LogoAnimation from './components/LogoAnimation';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

// Placeholder for Cart
const Cart = () => (
  <div className="min-h-[60vh] flex items-center justify-center fade-in-up">
    <div className="text-center">
      <h2 className="text-3xl font-serif text-asl-espresso dark:text-asl-dark-gold mb-4">Your Selection</h2>
      <p className="text-asl-espresso/60 dark:text-asl-dark-text/60 mb-8">Your cart is currently empty.</p>
      <a href="#/shop" className="text-xs uppercase tracking-widest border-b border-asl-espresso pb-1 hover:text-asl-gold hover:border-asl-gold transition-colors dark:text-asl-dark-text dark:border-asl-dark-gold">Return to Shop</a>
    </div>
  </div>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LogoAnimation onComplete={() => setLoading(false)} />;
  }

  return (
    <CurrencyProvider>
      <ThemeProvider>
        <ProductProvider>
          <ToastProvider>
            <CartProvider>
              <Router>
                <ScrollToTop />
                <CustomCursor />
                <div className="bg-noise"></div>
                <MainLayout>
                  <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-asl-cream dark:bg-asl-dark-bg"><div className="w-12 h-12 border-2 border-asl-gold rounded-full border-t-transparent animate-spin"></div></div>}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/shop/cultural" element={<CulturalJerseys />} />
                      <Route path="/shop/unique" element={<UniqueJerseys />} />
                      <Route path="/archive" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/country/:slug" element={<Country />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/custom" element={<CustomRequest />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/profile" element={<div className="p-20 text-center text-asl-espresso dark:text-asl-dark-text">User Portal Placeholder</div>} />
                    </Routes>
                  </Suspense>
                </MainLayout>
              </Router>
            </CartProvider>
          </ToastProvider>
        </ProductProvider>
      </ThemeProvider>
    </CurrencyProvider>
  );
};

export default App;