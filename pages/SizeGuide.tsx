import React from 'react';
import { Link } from 'react-router-dom';

const SizeGuide: React.FC = () => {
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
                        Fit &amp; Measurements
                    </h3>
                    <h1 className="text-5xl md:text-6xl font-serif text-asl-espresso">
                        Size Guide
                    </h1>
                    <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-asl-espresso/70 font-light">
                        All measurements are in centimetres (cm). To ensure the best fit, measure yourself
                        and compare against the chart below. When in doubt, size up.
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-asl-gold/30 mb-16" />

                {/* Size Table */}
                <section className="mb-16">
                    <h2 className="text-xl md:text-2xl font-serif text-asl-espresso mb-6 text-center">
                        Adult (Men) Soccer Uniform — cm
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse font-sans text-sm">
                            <thead>
                                <tr className="bg-asl-espresso text-asl-cream">
                                    <th className="px-6 py-4 text-left text-xs uppercase tracking-widest font-semibold border border-asl-espresso/20">
                                        Measurement
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs uppercase tracking-widest font-semibold border border-asl-espresso/20">
                                        S
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs uppercase tracking-widest font-semibold border border-asl-espresso/20">
                                        M
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs uppercase tracking-widest font-semibold border border-asl-espresso/20">
                                        L
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs uppercase tracking-widest font-semibold border border-asl-espresso/20">
                                        XL
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs uppercase tracking-widest font-semibold border border-asl-espresso/20">
                                        2XL
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-asl-cream hover:bg-asl-gold/5 transition-colors">
                                    <td className="px-6 py-4 text-asl-espresso font-medium border border-asl-gold/20">
                                        Chest <span className="text-asl-espresso/50 text-xs">(1/2 circumference)</span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">49</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">51</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">54</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">56</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">58</td>
                                </tr>
                                <tr className="bg-asl-espresso/5 hover:bg-asl-gold/5 transition-colors">
                                    <td className="px-6 py-4 text-asl-espresso font-medium border border-asl-gold/20">
                                        Length <span className="text-asl-espresso/50 text-xs">(jersey)</span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">70</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">72.5</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">75</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">78</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">80</td>
                                </tr>
                                <tr className="bg-asl-cream hover:bg-asl-gold/5 transition-colors">
                                    <td className="px-6 py-4 text-asl-espresso font-medium border border-asl-gold/20">
                                        Shorts Length
                                    </td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">46</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">48</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">50</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">52</td>
                                    <td className="px-6 py-4 text-center text-asl-espresso border border-asl-gold/20">54</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* How to Measure */}
                <section className="mb-16 bg-asl-espresso/5 border border-asl-gold/20 p-8 space-y-4">
                    <h3 className="text-lg font-serif text-asl-espresso mb-4">How to Measure</h3>
                    <div className="space-y-3 text-sm text-asl-espresso/80 font-light leading-relaxed">
                        <p>
                            <span className="font-semibold text-asl-espresso uppercase tracking-wide text-xs">Chest:</span>{' '}
                            Measure around the fullest part of your chest, keeping the tape parallel to the ground.
                            The value in the chart is half the circumference.
                        </p>
                        <p>
                            <span className="font-semibold text-asl-espresso uppercase tracking-wide text-xs">Jersey Length:</span>{' '}
                            Measured from the highest point of the shoulder down to the hem at the front.
                        </p>
                        <p>
                            <span className="font-semibold text-asl-espresso uppercase tracking-wide text-xs">Shorts Length:</span>{' '}
                            Measured from the waistband to the hem of the shorts on the outside of the leg.
                        </p>
                    </div>
                </section>

                {/* Fit tip + CTA */}
                <div className="border-t border-asl-gold/30 pt-12 text-center space-y-6">
                    <p className="text-base text-asl-espresso/70 font-light max-w-lg mx-auto">
                        If you are between sizes or prefer a looser, pitch-ready look, we recommend <strong>sizing up</strong>.
                    </p>
                    <p className="text-sm text-asl-espresso/50 font-light">
                        Still unsure? Check our{' '}
                        <Link to="/shipping" className="text-asl-gold underline hover:text-asl-espresso transition-colors">
                            Returns Policy
                        </Link>{' '}
                        for important sizing information before you order.
                    </p>
                    <Link
                        to="/shop"
                        className="inline-block px-10 py-4 border-2 border-asl-espresso text-asl-espresso hover:bg-asl-espresso hover:text-asl-cream transition-all duration-500 tracking-widest uppercase text-xs font-bold"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SizeGuide;
