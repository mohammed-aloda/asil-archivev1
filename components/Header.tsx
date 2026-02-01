import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useProducts } from '../context/ProductContext';
import { PRODUCTS } from '../constants'; // Fallback if context isn't fully ready or for direct access if preferred, but useProducts is better

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { toggleCart, cartCount } = useCart();
  const { currency, setCurrency } = useCurrency();
  const { products } = useProducts();

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle resizing to close mobile sub-menus if switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileShopOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setIsSearchOpen(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    // Simple heuristic for "closest thing": name > category > description
    const match = products.find(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.origin.toLowerCase().includes(query)
    );

    if (match) {
      navigate(`/product/${match.id}`);
    } else {
      // If no direct match, could redirect to shop or show a toast. 
      // For now, redirect to shop as a "fallback" to explore.
      navigate('/shop');
    }

    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: 'shop' }, // Logic handles the path check
    { name: 'About', path: '/about' },
    { name: 'Custom', path: '/custom' },
  ];

  // Shop sub-menu toggle for mobile
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);
  const mobileShopRef = useRef<HTMLDivElement>(null);

  // Close mobile shop menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileShopRef.current && !mobileShopRef.current.contains(event.target as Node)) {
        setIsMobileShopOpen(false);
      }
    };

    if (isMobileShopOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileShopOpen]);

  // Handle resizing to close mobile sub-menus if switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileShopOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dynamic colors based on theme
  const textColor = theme === 'light' ? 'text-asl-espresso' : 'text-asl-dark-ivory';
  const bgColor = theme === 'light' ? 'bg-asl-cream/90 backdrop-blur-md' : 'bg-asl-dark-espresso/90 backdrop-blur-md';
  const borderColor = theme === 'light' ? 'border-asl-gold/20' : 'border-asl-dark-gold/10';
  const hoverColor = theme === 'light' ? 'hover:text-asl-gold' : 'hover:text-asl-dark-gold';
  const inputBgColor = theme === 'light' ? 'bg-asl-espresso/5' : 'bg-asl-dark-gold/10';

  return (
    <div className="fixed w-full z-40 top-0 left-0">
      {/* Primary Header */}
      <nav className={`${bgColor} border-b ${borderColor} transition-colors duration-500`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo (Left Aligned on Mobile too) */}
          <div className="flex-shrink-0">
            <Link to="/" className="inline-block">
              <img
                src="/assets/logo.svg"
                alt="ASIL"
                className={`h-10 md:h-12 w-auto object-contain transition-opacity hover:opacity-80`}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.name === 'Shop' ? (
                  <span
                    className={`text-sm uppercase tracking-widest ${hoverColor} transition-colors ${location.pathname.includes('/shop') ? 'font-bold' : 'opacity-80'} ${textColor} cursor-default`}
                  >
                    {link.name}
                  </span>
                ) : (
                  <Link
                    to={link.path.startsWith('/') ? link.path : `/${link.path}`}
                    className={`text-sm uppercase tracking-widest ${hoverColor} transition-colors ${location.pathname === link.path ? 'font-bold' : 'opacity-80'} ${textColor}`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown for Shop */}
                {link.name === 'Shop' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-48 z-50">
                    <div className={`${theme === 'light' ? 'bg-asl-cream border-asl-stone/30' : 'bg-asl-dark-espresso border-asl-dark-gold/10'} border p-4 shadow-lg text-center flex flex-col gap-3`}>
                      <Link to="/shop/cultural" className={`text-xs uppercase tracking-widest ${textColor} ${hoverColor}`}>Cultural Jerseys</Link>
                      <Link to="/shop/unique" className={`text-xs uppercase tracking-widest ${textColor} ${hoverColor}`}>Unique Jerseys</Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Icons (Right) */}
          <div className={`flex items-center space-x-4 md:space-x-6 ${textColor}`}>
            {/* Currency Toggle */}
            <button
              onClick={() => setCurrency(currency === 'CAD' ? 'USD' : 'CAD')}
              className={`text-[10px] md:text-xs uppercase tracking-widest font-bold ${hoverColor} transition-colors px-2 py-1 border border-transparent hover:border-current rounded-sm`}
            >
              {currency}
            </button>

            {/* Animated Search Box */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen ? (
                  <motion.form
                    initial={{ width: 40, opacity: 0 }}
                    animate={{ width: window.innerWidth < 768 ? 140 : 200, opacity: 1 }}
                    exit={{ width: 40, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onSubmit={handleSearchSubmit}
                    className={`relative flex items-center overflow-hidden rounded-full ${inputBgColor}`}
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => {
                        // Small delay to allow submit to trigger if user pressed enter or clicked something
                        setTimeout(() => {
                          if (!searchQuery) setIsSearchOpen(false);
                        }, 200);
                      }}
                      className={`w-full py-1 pl-3 md:pl-4 pr-6 md:pr-8 text-xs md:text-sm bg-transparent outline-none ${textColor} placeholder-opacity-50 placeholder-${theme === 'light' ? 'asl-espresso' : 'asl-dark-ivory'}`}
                      placeholder="Search..."
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-1 md:right-2 p-1 opacity-50 hover:opacity-100"
                    >
                      <X size={12} className="md:w-3.5 md:h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsSearchOpen(true)}
                    className={`${hoverColor} transition-colors cursor-hover`}
                  >
                    <Search size={18} className="md:w-5 md:h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <Link to="/profile" className={`hidden md:block ${hoverColor} transition-colors cursor-hover`}><User size={20} /></Link>
            <button onClick={toggleCart} className={`relative ${hoverColor} transition-colors cursor-hover`}>
              <ShoppingBag size={18} className="md:w-5 md:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-asl-gold text-white text-[8px] md:text-[10px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Secondary Mobile Header (Navigation) */}
      <div
        ref={mobileShopRef}
        className={`md:hidden ${theme === 'light' ? 'bg-asl-cream border-t border-asl-gold/10' : 'bg-asl-dark-espresso border-t border-asl-dark-gold/5'} px-6 py-3 overflow-x-auto no-scrollbar transition-all duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between gap-6 min-w-max mx-auto max-w-sm">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.name === 'Shop' ? (
                <button
                  onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                  className={`text-xs uppercase tracking-widest ${isMobileShopOpen || location.pathname.includes('/shop') ? 'font-bold text-asl-gold' : 'opacity-70'} ${textColor} transition-colors`}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  to={link.path.startsWith('/') ? link.path : `/${link.path}`}
                  onClick={() => setIsMobileShopOpen(false)}
                  className={`text-xs uppercase tracking-widest ${location.pathname === link.path ? 'font-bold text-asl-gold' : 'opacity-70'} ${textColor} transition-colors`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Shop Sub-menu */}
        <AnimatePresence>
          {isMobileShopOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex justify-center gap-6 pt-3 pb-1 border-t border-dashed border-asl-gold/20 mt-2">
                <Link to="/shop/cultural" onClick={() => setIsMobileShopOpen(false)} className={`text-[10px] uppercase tracking-widest ${textColor} opacity-80`}>Cultural</Link>
                <Link to="/shop/unique" onClick={() => setIsMobileShopOpen(false)} className={`text-[10px] uppercase tracking-widest ${textColor} opacity-80`}>Unique</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;
