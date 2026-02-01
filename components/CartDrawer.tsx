import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
    const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const { theme } = useTheme();
    const { formatPrice } = useCurrency();

    if (!isCartOpen) return null;

    const bgColor = theme === 'light' ? 'bg-asl-cream' : 'bg-asl-dark-espresso';
    const textColor = theme === 'light' ? 'text-asl-espresso' : 'text-asl-dark-text';
    const borderColor = theme === 'light' ? 'border-asl-stone/30' : 'border-asl-dark-gold/20';

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full md:w-[480px] z-[70] ${bgColor} shadow-2xl transform transition-transform duration-300 ease-out flex flex-col`}>
                {/* Header */}
                <div className={`flex items-center justify-between p-6 border-b ${borderColor}`}>
                    <h2 className={`text-2xl font-serif ${textColor}`}>Your Cart</h2>
                    <button onClick={toggleCart} className={`${textColor} opacity-60 hover:opacity-100 hover:rotate-90 transition-all`}>
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                            <span className="text-4xl mb-4">🕸️</span>
                            <p className={`font-serif text-lg ${textColor}`}>Your cart is empty.</p>
                            <button
                                onClick={toggleCart}
                                className="mt-6 text-xs uppercase tracking-widest border-b border-current hover:text-asl-gold transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                {/* Image */}
                                <div className="w-24 h-32 bg-asl-stone/10 flex-shrink-0 overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className={`font-serif text-lg ${textColor}`}>{item.name}</h3>
                                            <p className={`font-sans ${textColor}`}>{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                        <p className={`text-xs uppercase tracking-widest opacity-60 ${textColor} mt-1`}>{item.size} • {item.category}</p>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        {/* Quantity Controls */}
                                        <div className={`flex items-center border ${borderColor}`}>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                className={`p-2 hover:bg-asl-gold/10 ${textColor} btn-press`}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className={`px-2 text-sm font-sans ${textColor}`}>{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                className={`p-2 hover:bg-asl-gold/10 ${textColor} btn-press`}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="text-red-500 hover:text-red-700 opacity-60 hover:opacity-100 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className={`p-6 border-t ${borderColor} ${theme === 'light' ? 'bg-asl-cream/50' : 'bg-asl-dark-espresso/50'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <span className={`text-xs uppercase tracking-widest opacity-60 ${textColor}`}>Total</span>
                            <span className={`text-2xl font-serif ${textColor}`}>{formatPrice(cartTotal)}</span>
                        </div>
                        <Link
                            to="/checkout"
                            onClick={toggleCart} // Close drawer when navigating
                            className={`w-full py-4 bg-asl-espresso text-white uppercase tracking-[0.2em] text-xs hover:bg-asl-gold transition-colors dark:bg-asl-dark-gold dark:text-asl-dark-bg block text-center btn-press`}
                        >
                            Checkout
                        </Link>
                        <p className={`text-[10px] text-center mt-4 opacity-50 ${textColor}`}>Shipping & Taxes calculated at checkout.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
