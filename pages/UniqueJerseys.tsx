import React from 'react';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';

const UniqueJerseys: React.FC = () => {
    const { theme } = useTheme();
    const { products } = useProducts();

    const uniqueProducts = products.filter(p => p.category === 'Unique');

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-serif text-asl-espresso dark:text-asl-dark-ivory mb-4">Unique Jerseys</h2>
            <p className="text-asl-espresso/70 dark:text-asl-dark-sand mb-12 max-w-2xl text-lg font-light">
                One-of-a-kind experimental designs fusing modern aesthetics with traditional craftsmanship.
            </p>

            {uniqueProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {uniqueProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center opacity-60">
                    <p className="font-serif">No unique artifacts active in the archive.</p>
                </div>
            )}
        </div>
    );
};

export default UniqueJerseys;
