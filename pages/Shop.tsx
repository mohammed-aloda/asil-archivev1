import React from 'react';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';

const Shop: React.FC = () => {
    const { theme } = useTheme();
    const { products } = useProducts();

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-serif text-asl-espresso dark:text-asl-dark-text mb-12">The Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default Shop;
