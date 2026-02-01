import React from 'react';
import { useTheme } from '../context/ThemeContext';

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen w-full relative transition-colors duration-500 bg-asl-cream dark:bg-asl-dark-espresso overflow-hidden">

            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] mix-blend-multiply dark:mix-blend-soft-light dark:opacity-[0.08]"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }}></div>

            <div className="max-w-4xl mx-auto px-8 py-24 relative z-10">

                {/* Section 1: The Internal Conflict */}
                <section className="mb-24 text-center space-y-8">
                    <h1 className="text-5xl md:text-7xl font-serif text-asl-espresso dark:text-asl-dark-ivory italic">
                        The Beauty of Confusion
                    </h1>
                    <div className="space-y-6 max-w-2xl mx-auto text-lg leading-relaxed text-asl-espresso/90 dark:text-asl-dark-sand font-light">
                        <p>
                            For a long time, I existed in the "in-between." I knew I had deep roots, but I didn't always know how to claim them. Like many, I felt a sense of cultural confusion—not feeling "enough" of one thing, and not quite "at home" in another.
                        </p>
                        <p>
                            That lack of confidence to represent where I came from stayed with me. ASIL was born from that exact tension. It is a brand for those who are searching for their origin, and for those who are finally ready to wear it with pride.
                        </p>
                    </div>
                </section>

                {/* Section 2: Beyond Borders (The Mission) */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-serif text-asl-espresso dark:text-asl-dark-ivory">
                            Unity Through Uniqueness
                        </h3>
                        <p className="text-base leading-relaxed text-asl-espresso/90 dark:text-asl-dark-sand font-light">
                            Our jerseys are more than apparel; they are educational artifacts. We believe that by celebrating our specific, unique differences, we actually find what unifies us.
                        </p>
                        <p className="text-base leading-relaxed text-asl-espresso/90 dark:text-asl-dark-sand font-light">
                            ASIL is a platform to learn. When you wear an ASIL piece, you aren't just representing your own country—you are inviting others to learn about your history, just as you learn about theirs.
                        </p>
                    </div>
                    <div className="relative p-8 border border-asl-gold/20 bg-asl-cream/30 dark:bg-asl-dark-espresso/30 backdrop-blur-sm">
                        <p className="italic text-asl-gold font-serif text-xl text-center">
                            "To celebrate cultural diversity is to unify the human experience."
                        </p>
                    </div>
                </div>

                {/* Section 3: The Goal */}
                <section className="text-center space-y-12 bg-asl-espresso/5 dark:bg-asl-dark-gold/5 p-12 rounded-sm border border-asl-gold/10">
                    <h3 className="text-sm uppercase tracking-[0.5em] text-asl-gold dark:text-asl-dark-gold font-sans font-semibold">
                        The Goal
                    </h3>
                    <h2 className="text-4xl font-serif text-asl-espresso dark:text-asl-dark-ivory">
                        Confidence in Representation
                    </h2>
                    <p className="max-w-2xl mx-auto text-base leading-relaxed text-asl-espresso/90 dark:text-asl-dark-sand font-light">
                        I made this brand so that no one has to feel hesitant to show who they are. We focus on the intricate, hand-drawn details of global landmarks and historic symbols to give you a piece of home you can carry anywhere.
                    </p>
                    <p className="text-lg font-serif italic text-asl-gold">
                        Be proud of who you are. The world is waiting to learn from you.
                    </p>
                </section>

                {/* Final Call to Action */}
                <div className="mt-24 text-center">
                    <button className="px-12 py-5 border-2 border-asl-espresso dark:border-asl-dark-gold text-asl-espresso dark:text-asl-dark-gold hover:bg-asl-espresso hover:text-asl-cream dark:hover:bg-asl-dark-gold dark:hover:text-asl-dark-espresso transition-all duration-500 font-sans uppercase tracking-[0.3em] text-xs font-bold">
                        Find Your Origin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
