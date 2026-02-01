import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Adjust path if necessary
import { useTheme } from '../context/ThemeContext'; // Adjust path if necessary
import { useCurrency } from '../context/CurrencyContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51SulfM2Mo4rJhbYqpHr6WoGQV1HEq9Nu0oMGNxrS1ofmGuLppNB8ZA17MqHU4XpDQeb0CbzMW9FNqyUdBDBcBK4A00kAVg43n2');


const Checkout: React.FC = () => {
    const { cart, cartTotal } = useCart();
    const { theme } = useTheme();
    const { currency, formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const stripe = await stripePromise;
            if (!stripe) {
                alert("Stripe blocked or failed to load. If you are on a mobile phone testing with a local IP (e.g., 192.168...), Stripe requires HTTPS. Try using a tunnel (ngrok) or test on localhost.");
                throw new Error("Stripe failed to load - likely non-HTTPS environment");
            }

            // Call Backend to create session
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart, currency }),
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Server returned ${response.status}: ${errText}`);
            }

            const session = await response.json();

            if (session.error) {
                alert(`Payment Error: ${session.error}`);
                setIsProcessing(false);
                return;
            }

            // Redirect to Stripe (Server-Side URL)
            if (session.url) {
                window.location.href = session.url;
            } else {
                throw new Error("No checkout URL returned from server");
            }


        } catch (error) {
            console.error("Checkout Error:", error);

            let msg = error instanceof Error ? error.message : String(error);
            if (msg.includes("Failed to fetch")) {
                msg = "Cannot connect to server. Ensure your computer and phone are on the same network and the server is running on the correct IP/port.";
            }

            alert(`Checkout Failed: ${msg}`);
            setIsProcessing(false);
        }
    };


    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-32 px-6 text-center">
                <h2 className="text-3xl font-serif text-asl-espresso dark:text-asl-dark-text mb-4">Your Cart is Empty</h2>
                <Link to="/shop" className="text-asl-gold hover:underline">Return to Collection</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
            <Link to="/shop" className="inline-flex items-center text-xs uppercase tracking-widest text-asl-espresso/60 hover:text-asl-gold transition-colors mb-8 dark:text-asl-dark-text/60">
                <ArrowLeft size={16} className="mr-2" /> Continue Shopping
            </Link>

            <h1 className="text-4xl font-serif text-asl-espresso dark:text-asl-dark-text mb-12 text-center">Checkout</h1>

            <div className="max-w-3xl mx-auto">
                {/* Order Summary */}
                <div className="bg-asl-stone/5 dark:bg-white/5 p-8 rounded-sm mb-8">
                    <h2 className="text-xl font-serif text-asl-espresso dark:text-asl-dark-text mb-6">Order Summary</h2>
                    <div className="space-y-6 mb-8">
                        {cart.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                <div className="w-16 h-20 bg-asl-stone/10 flex-shrink-0 relative overflow-hidden">
                                    <span className="absolute top-0 right-0 bg-asl-espresso text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl-lg z-10">{item.quantity}</span>
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-asl-espresso dark:text-asl-dark-text text-sm">{item.name}</h3>
                                    <p className="text-xs opacity-60 uppercase">{item.size}</p>
                                </div>
                                <p className="font-sans text-sm">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-asl-espresso/10 dark:border-white/10 pt-6 space-y-2">
                        <div className="flex justify-between text-sm opacity-60">
                            <span>Subtotal</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm opacity-60">
                            <span>Shipping</span>
                            <span>Calculated at next step</span>
                        </div>
                    </div>
                    <div className="border-t border-asl-espresso/10 dark:border-white/10 mt-4 pt-4 flex justify-between items-center">
                        <span className="text-lg font-serif">Total</span>
                        <span className="text-2xl font-serif">{formatPrice(cartTotal)}</span>
                    </div>
                </div>

                {/* Payment Action */}
                <div className="text-center">
                    <p className="mb-6 opacity-60 text-sm">
                        You will be redirected to Stripe to securely complete your payment and enter shipping details.
                    </p>
                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`w-full py-5 bg-asl-espresso text-white uppercase tracking-widest text-sm hover:bg-asl-gold transition-all flex items-center justify-center gap-3 dark:bg-asl-dark-gold dark:text-asl-dark-bg btn-press shadow-lg ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
                    >
                        {isProcessing ? 'Processing...' : (
                            <>
                                <Lock size={18} /> Proceed to Secure Checkout
                            </>
                        )}
                    </button>
                    <div className="mt-6 flex justify-center gap-4 opacity-40">
                        <CreditCard size={24} />
                        {/* Add other payment icons if desired */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
