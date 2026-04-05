import React from 'react';
import { Link } from 'react-router-dom';

const ShippingReturns: React.FC = () => {
    return (
        <div className="min-h-screen w-full relative bg-asl-cream overflow-hidden">

            {/* Background Texture */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] mix-blend-multiply"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }}
            />

            <div className="max-w-3xl mx-auto px-8 py-24 relative z-10">

                {/* Page Title */}
                <div className="mb-16 text-center">
                    <h3 className="text-xs uppercase tracking-[0.5em] text-asl-gold font-sans font-semibold mb-4">
                        Policies
                    </h3>
                    <h1 className="text-5xl md:text-6xl font-serif text-asl-espresso">
                        Shipping &amp; Returns
                    </h1>
                </div>

                {/* Divider */}
                <div className="border-t border-asl-gold/30 mb-16" />

                {/* Shipping Policy */}
                <section className="mb-16 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-serif text-asl-espresso">
                        Shipping Policy
                    </h2>
                    <p className="text-base leading-relaxed text-asl-espresso/80 font-light">
                        At Asil, we take pride in the craftsmanship of every jersey. Because our pieces are often
                        made-to-order or sourced through specialized international channels to ensure cultural
                        authenticity, please note our shipping timelines:
                    </p>

                    <div className="bg-asl-espresso/5 border border-asl-gold/20 p-6 space-y-4">
                        <div>
                            <h4 className="text-sm font-sans uppercase tracking-[0.15em] text-asl-espresso font-semibold mb-2">
                                Processing &amp; Delivery
                            </h4>
                            <p className="text-base leading-relaxed text-asl-espresso/80 font-light">
                                All orders typically take <strong>10 to 14 business days</strong> to arrive at your doorstep.
                            </p>
                        </div>

                        <div className="border-t border-asl-gold/20 pt-4">
                            <h4 className="text-sm font-sans uppercase tracking-[0.15em] text-asl-espresso font-semibold mb-2">
                                Tracking
                            </h4>
                            <p className="text-base leading-relaxed text-asl-espresso/80 font-light">
                                Once your order has been dispatched, you will receive a confirmation email with a tracking
                                number so you can follow your jersey's journey. <em>Please note we are currently working on
                                making full tracking integration available — we appreciate your patience.</em>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Returns & Exchanges */}
                <section className="mb-16 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-serif text-asl-espresso">
                        Returns &amp; Exchanges
                    </h2>
                    <p className="text-base leading-relaxed text-asl-espresso/80 font-light">
                        As a small, independent business, we are committed to keeping our operations sustainable and our
                        prices fair for our community. To do this responsibly, we maintain a strict return policy:
                    </p>

                    <div className="bg-asl-espresso/5 border border-asl-gold/20 p-6 space-y-4">
                        <div>
                            <h4 className="text-sm font-sans uppercase tracking-[0.15em] text-asl-espresso font-semibold mb-2">
                                No Returns
                            </h4>
                            <p className="text-base leading-relaxed text-asl-espresso/80 font-light">
                                We do not accept returns or exchanges for "change of mind" or incorrect sizing.
                                Because we are a small business, we simply do not have the resources to manage
                                return logistics at this stage — every piece is carefully prepared with you in mind.
                            </p>
                        </div>

                        <div className="border-t border-asl-gold/20 pt-4">
                            <h4 className="text-sm font-sans uppercase tracking-[0.15em] text-asl-espresso font-semibold mb-2">
                                Damaged Goods
                            </h4>
                            <p className="text-base leading-relaxed text-asl-espresso/80 font-light">
                                The only exception to this rule is if your product arrives damaged or defective. If you
                                receive a damaged item, please contact us at{' '}
                                <a href="mailto:asljerseys@gmail.com" className="text-asl-gold underline hover:text-asl-espresso transition-colors">
                                    asljerseys@gmail.com
                                </a>{' '}
                                within <strong>24 hours of delivery</strong> with photos of the damage, and we will
                                arrange a replacement.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sizing Notice */}
                <section className="mb-16 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-serif text-asl-espresso">
                        Sizing Notice
                    </h2>
                    <p className="text-base leading-relaxed text-asl-espresso/80 font-light">
                        Because we do not offer returns for sizing errors, it is crucial that you select the correct
                        fit before checking out:
                    </p>

                    <div className="bg-asl-espresso/5 border border-asl-gold/20 p-6 space-y-4">
                        <div>
                            <h4 className="text-sm font-sans uppercase tracking-[0.15em] text-asl-espresso font-semibold mb-2">
                                Check the Size Guide
                            </h4>
                            <p className="text-base leading-relaxed text-asl-espresso/80 font-light">
                                Please carefully review our{' '}
                                <Link to="/size-guide" className="text-asl-gold underline hover:text-asl-espresso transition-colors font-semibold">
                                    Size Guide
                                </Link>{' '}
                                before finalizing your purchase.
                            </p>
                        </div>

                        <div className="border-t border-asl-gold/20 pt-4">
                            <h4 className="text-sm font-sans uppercase tracking-[0.15em] text-asl-espresso font-semibold mb-2">
                                Fit Tip
                            </h4>
                            <p className="text-base leading-relaxed text-asl-espresso/80 font-light">
                                If you are between sizes or prefer a "pitch-ready" look, we generally recommend
                                sizing up — but always refer to the specific measurements provided in our{' '}
                                <Link to="/size-guide" className="text-asl-gold underline hover:text-asl-espresso transition-colors">
                                    Size Guide
                                </Link>.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Closing quote */}
                <div className="border-t border-asl-gold/30 pt-12 text-center">
                    <p className="text-lg font-serif italic text-asl-gold mb-6">
                        "Every piece carries a story — we want it to reach you perfectly."
                    </p>
                    <Link
                        to="/shop"
                        className="inline-block px-10 py-4 border-2 border-asl-espresso text-asl-espresso hover:bg-asl-espresso hover:text-asl-cream transition-all duration-500 tracking-widest uppercase text-xs font-bold"
                    >
                        Browse the Collection
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ShippingReturns;
