import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { theme } = useTheme();
    const { formatPrice } = useCurrency();
    const [isHovered, setIsHovered] = useState(false);
    const [hasLoadedSecondary, setHasLoadedSecondary] = useState(false); // Optimization: Start loading only on first hover

    // Determine secondary image
    // If product.images exists and has items, use the first one as the hover image
    const hasSecondImage = product.images && product.images.length > 0;
    const secondaryImage = hasSecondImage ? product.images![0] : product.image;

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (hasSecondImage && !hasLoadedSecondary) {
            setHasLoadedSecondary(true);
        }
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className={`block border ${theme === 'light' ? 'border-asl-stone/50' : 'border-asl-dark-bronze/50'} p-4 transition-all hover:border-asl-gold group`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-[3/4] bg-asl-paper dark:bg-asl-dark-walnut mb-4 flex items-center justify-center overflow-hidden relative">
                {/* Main Image */}
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isHovered && hasSecondImage ? 'opacity-0' : 'opacity-100'}`}
                />

                {/* Secondary Image (Absolute positioned on top) */}
                {/* Optimization: Only render into DOM if user has hovered at least once to save initial bandwidth */}
                {hasSecondImage && hasLoadedSecondary && (
                    <img
                        src={secondaryImage}
                        alt={`${product.name} alternate view`}
                        loading="lazy"
                        decoding="async"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    />
                )}
            </div>

            <h3 className="text-lg font-serif text-asl-espresso dark:text-asl-dark-text group-hover:text-asl-gold transition-colors">{product.name}</h3>
            <p className="text-xs uppercase tracking-widest text-asl-gold mt-1">{product.category}</p>

            <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-sans opacity-70 text-asl-espresso dark:text-asl-dark-text">{formatPrice(product.price)}</span>
                <span className="text-xs uppercase border-b border-transparent group-hover:border-asl-gold transition-colors text-asl-espresso dark:text-asl-dark-text">View Blueprint</span>
            </div>
        </Link>
    );
};

export default ProductCard;
