import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LandmarkBackground from './LandmarkBackground';
import CartDrawer from './CartDrawer';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative min-h-screen flex flex-col font-serif bg-asl-cream text-asl-espresso selection:bg-asl-gold selection:text-asl-espresso overflow-x-hidden">
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
