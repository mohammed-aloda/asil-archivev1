import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  const textColor = theme === 'light' ? 'text-asl-cream' : 'text-asl-dark-text';
  // Footer in 'light' theme (Parchment) uses Espresso background
  // Footer in 'dark' theme (Espresso) uses Darker background (Dark Bronze or Dark BG)

  // Actually, per palette:
  // Light Mode: Footer usually contrasts. bg-asl-espresso text-asl-cream is good.
  // Dark Mode: bg-asl-dark-bronze text-asl-dark-text?

  const bgClass = theme === 'light' ? 'bg-asl-espresso' : 'bg-asl-dark-bronze';
  const borderClass = theme === 'light' ? 'border-asl-gold/20' : 'border-asl-dark-gold/20';
  const headingColor = theme === 'light' ? 'text-asl-gold' : 'text-asl-dark-gold';

  return (
    <footer className={`${bgClass} ${textColor} pt-20 pb-10 border-t ${borderClass} transition-colors duration-500 relative z-20`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 text-center md:text-left">
            <h3 className={`text-2xl font-serif ${headingColor} mb-4 md:mb-6`}>ASIL</h3>
            <p className="opacity-60 text-sm leading-relaxed mb-6">
              Bridging the gap between heritage and modern engineering. A global archive of origins.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="text-center md:text-left">
            <h4 className={`text-xs uppercase tracking-[0.2em] ${headingColor} mb-4 md:mb-6`}>Explore</h4>
            <ul className="space-y-3 md:space-y-4 text-sm opacity-70">
              <li><Link to="/about" className="hover:text-asl-gold transition-colors">Our Story</Link></li>
              <li><Link to="/journal" className="hover:text-asl-gold transition-colors">Journal</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="text-center md:text-left">
            <h4 className={`text-xs uppercase tracking-[0.2em] ${headingColor} mb-4 md:mb-6`}>Support</h4>
            <ul className="space-y-3 md:space-y-4 text-sm opacity-70">
              <li><Link to="/faq" className="hover:text-asl-gold transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-asl-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-asl-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-asl-gold transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center md:text-left">
            <h4 className={`text-xs uppercase tracking-[0.2em] ${headingColor} mb-4 md:mb-6`}>The Registry</h4>
            <p className="text-xs opacity-50 mb-4">Join for exclusive access to new origins.</p>
            <form className="flex border-b border-asl-gold/30 pb-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none outline-none text-current text-sm w-full placeholder-current/30 focus:ring-0"
              />
              <button className="text-xs uppercase hover:text-asl-gold transition-colors">Join</button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs opacity-40">
          <p>&copy; {new Date().getFullYear()} ASIL Global Heritage. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-asl-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-asl-gold transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
