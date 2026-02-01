import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LandmarkBackground from './LandmarkBackground';
import { useTheme } from '../context/ThemeContext';
import CartDrawer from './CartDrawer';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`relative min-h-screen flex flex-col font-serif bg-paper-texture overflow-x-hidden
      ${theme === 'light'
                ? 'bg-asl-cream text-asl-espresso selection:bg-asl-gold selection:text-asl-espresso'
                : 'bg-asl-dark-bg text-asl-dark-text selection:bg-asl-dark-gold selection:text-asl-dark-bg'
            }
    `}>
            <LandmarkBackground />

            <Header />
            <CartDrawer />

            <main className="flex-grow pt-24 pb-12 z-10 relative">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
