import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useCurrency } from '../context/CurrencyContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { products } = useProducts();
  const { formatPrice } = useCurrency();
  const [zoom, setZoom] = React.useState(1);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const { addToCart, toggleCart } = useCart();
  const { showToast } = useToast(); // Hook
  const [selectedSize, setSelectedSize] = React.useState('M');
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, selectedSize);
      showToast(`Added ${product.name} to collection`, 'success');
      // toggleCart(); // Optional: Open cart immediately
    }
  };

  // ... (lines 27-155)

  <button
    onClick={handleAddToCart}
    className="w-full py-4 bg-asl-espresso text-white uppercase tracking-widest text-xs hover:bg-asl-gold transition-colors dark:bg-asl-dark-gold dark:text-asl-dark-bg btn-press"
  >
    Add to Collection
  </button>

  // ... existing Zoom/Pan logic

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 }); // Reset position on full zoom out
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      // Use the first touch point
      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom > 1) {
      // Prevent default to stop scrolling while dragging
      // Note: might need 'touch-action: none' CSS on the container for this to work effectively

      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 px-6 text-center">
        <h2 className="text-3xl font-serif text-asl-espresso dark:text-asl-dark-text mb-4">Artifact Not Found</h2>
        <Link to="/shop" className="text-asl-gold hover:underline">Return to Collection</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <Link to="/shop" className="inline-flex items-center text-xs uppercase tracking-widest text-asl-espresso/60 hover:text-asl-gold transition-colors mb-8 dark:text-asl-dark-text/60">
        <ArrowLeft size={16} className="mr-2" /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 pb-12">
        <div className="space-y-4 w-full lg:w-[70%] mx-auto lg:mx-0">
          <div className="aspect-[3/4] bg-asl-paper dark:bg-asl-dark-walnut relative overflow-hidden group rounded-sm shadow-sm">
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover pointer-events-none" />
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-2 right-2 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleZoomOut}
                className="w-8 h-8 flex items-center justify-center bg-white/90 text-asl-espresso border border-asl-espresso/20 hover:bg-asl-gold hover:text-white transition-colors dark:bg-asl-dark-bg/90 dark:text-asl-dark-text"
                disabled={zoom <= 1}
              >
                -
              </button>
              <button
                onClick={handleZoomIn}
                className="w-8 h-8 flex items-center justify-center bg-white/90 text-asl-espresso border border-asl-espresso/20 hover:bg-asl-gold hover:text-white transition-colors dark:bg-asl-dark-bg/90 dark:text-asl-dark-text"
                disabled={zoom >= 3}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center px-2 lg:px-0">
          <span className="text-asl-gold text-xs uppercase tracking-[0.2em] mb-3 md:mb-4">{product.category} • {product.origin}</span>
          <h1 className="text-3xl md:text-5xl font-serif text-asl-espresso dark:text-asl-dark-text mb-4 md:mb-6">{product.name}</h1>
          <p className="text-xl font-sans text-asl-espresso/80 dark:text-asl-dark-text/80 mb-8">{formatPrice(product.price)}</p>

          <div className="prose prose-stone dark:prose-invert mb-8">
            <p className="text-asl-espresso/70 dark:text-asl-dark-text/70 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-asl-gold/20">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-asl-espresso/50 dark:text-asl-dark-text/50 mb-2">Materials</h4>
              <p className="text-asl-espresso dark:text-asl-dark-text">{product.materials}</p>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs uppercase tracking-widest text-asl-espresso/50 dark:text-asl-dark-text/50">Size</h4>
                <button className="text-[10px] uppercase text-asl-espresso/60 hover:text-asl-gold underline dark:text-asl-dark-text/60">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border font-sans text-sm transition-all
                                ${selectedSize === size
                        ? 'border-asl-espresso bg-asl-espresso text-white dark:border-asl-dark-gold dark:bg-asl-dark-gold dark:text-asl-dark-bg'
                        : 'border-asl-stone/30 text-asl-espresso hover:border-asl-gold dark:text-asl-dark-text dark:border-asl-dark-bronze'
                      }
                            `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-asl-espresso text-white uppercase tracking-widest text-xs hover:bg-asl-gold transition-colors dark:bg-asl-dark-gold dark:text-asl-dark-bg"
            >
              Add to Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;