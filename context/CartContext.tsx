import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../constants';

const MAX_QTY = 20;

// Rebuild saved cart items from the current product list, so old or edited
// localStorage data can't show wrong prices or names.
function restoreCart(raw: unknown): CartItem[] {
    if (!Array.isArray(raw)) return [];
    const items: CartItem[] = [];
    for (const entry of raw) {
        const product = PRODUCTS.find(p => p.id === String(entry?.id));
        const quantity = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(entry?.quantity) || 1)));
        const size = typeof entry?.size === 'string' ? entry.size.slice(0, 5) : 'M';
        if (product) items.push({ ...product, quantity, size });
    }
    return items;
}

interface CartContextType {
    cart: CartItem[];
    isCartOpen: boolean;
    addToCart: (product: Product, size: string) => void;
    removeFromCart: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        // Load from local storage
        try {
            const saved = localStorage.getItem('cart');
            return saved ? restoreCart(JSON.parse(saved)) : [];
        } catch (e) {
            console.error("Failed to parse cart from local storage", e);
            return [];
        }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        // Save to local storage whenever cart changes
        try {
            localStorage.setItem('cart', JSON.stringify(cart.map(({ id, size, quantity }) => ({ id, size, quantity }))));
        } catch {
            // Storage may be unavailable (private mode); the cart still works for this visit
        }
    }, [cart]);

    const addToCart = (product: Product, size: string) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id && item.size === size);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: Math.min(MAX_QTY, item.quantity + 1) }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, size }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string, size: string) => {
        setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)));
    };

    const updateQuantity = (productId: string, size: string, quantity: number) => {
        if (quantity < 1 || quantity > MAX_QTY) return;
        setCart(prev => prev.map(item =>
            item.id === productId && item.size === size
                ? { ...item, quantity }
                : item
        ));
    };

    const clearCart = () => setCart([]);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);
    const cartCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            toggleCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
