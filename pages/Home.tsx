import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';


const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col relative transition-colors duration-500 bg-asl-cream dark:bg-asl-dark-espresso overflow-x-hidden">

            {/* Global Background Texture */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply dark:mix-blend-soft-light dark:opacity-[0.08]"
                    style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }}></div>
            </div>

            {/* --- HERO SECTION --- */}
            <section className="min-h-[110vh] flex flex-col items-center justify-center p-8 relative z-10">
                {/* Hand-Drawn Landmark Sketch (Hero Only) */}
                <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <img
                        src="/assets/bg-for-website.png"
                        alt="Global Heritage Collage"
                        className="w-full h-full object-cover object-top translate-x-[-0.3%] filter brightness-110 saturate-[1] contrast-[1.1] mix-blend-multiply dark:mix-blend-lighten opacity-50 dark:opacity-20 transition-opacity duration-1000"
                    />

                    {/* Cinematic Vignette Overlay to keep text readable */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-asl-cream/10 to-asl-cream dark:via-asl-dark-espresso/10 dark:to-asl-dark-espresso" />
                </div>

                <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 px-4 md:px-0">
                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif text-asl-espresso dark:text-asl-dark-ivory tracking-tight animate-fade-in-up drop-shadow-sm">
                        ASIL
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-sans font-medium tracking-[0.2em] md:tracking-[1.4em] uppercase text-asl-espresso dark:text-asl-dark-ivory animate-fade-in-up delay-200 pl-[0.2em] md:pl-[1.4em]">
                        Origin
                    </p>
                    <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-asl-espresso/90 dark:text-asl-dark-sand font-light animate-fade-in-up delay-300 px-2">
                        Helping you find your origin.
                        A curated archive of cultural artifacts re-imagined for the contemporary world.
                    </p>
                    <div className="pt-8 animate-fade-in-up delay-500">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                            <Link to="/shop/cultural" className="w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 border-2 border-asl-espresso text-asl-espresso dark:text-asl-dark-ivory dark:border-asl-dark-ivory hover:bg-asl-espresso hover:text-asl-cream dark:hover:bg-asl-dark-ivory dark:hover:text-asl-dark-espresso transition-all duration-500 tracking-widest uppercase text-xs sm:text-sm font-semibold btn-press">
                                Cultural Jerseys
                            </Link>
                            <Link to="/shop/unique" className="w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 border-2 border-asl-espresso text-asl-espresso dark:text-asl-dark-ivory dark:border-asl-dark-ivory hover:bg-asl-espresso hover:text-asl-cream dark:hover:bg-asl-dark-ivory dark:hover:text-asl-dark-espresso transition-all duration-500 tracking-widest uppercase text-xs sm:text-sm font-semibold btn-press">
                                Unique Jerseys
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- GLOBE SECTION REMOVED --- */}
            {/* 
            <section className="py-16 md:py-24 px-4 md:px-8 relative z-10 bg-white dark:bg-gray-50">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                     <div className="space-y-4">
                        <h3 className="text-xs md:text-sm font-sans uppercase tracking-[0.5em] text-asl-gold dark:text-asl-gold">
                            Find Your Origin
                        </h3>
                        <h2 className="text-3xl md:text-5xl font-serif text-asl-espresso dark:text-asl-espresso">
                             Explore Global Heritage
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-asl-espresso/80 dark:text-asl-espresso/80 font-light">
                            Select a country on the globe to discover its cultural jersey. Each piece tells a story of heritage, tradition, and identity.
                        </p>
                    </div>
                </div>
            </section>
            */}

            {/* --- CULTURAL JERSEYS SECTION --- */}
            <section className="py-12 md:py-24 px-4 md:px-8 relative z-10 border-t border-asl-stone/30 dark:border-asl-dark-bronze/30">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="space-y-6 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-serif text-asl-espresso dark:text-asl-dark-ivory">
                            Cultural Jerseys
                        </h2>
                        <h3 className="text-sm font-sans uppercase tracking-[0.2em] text-asl-gold dark:text-asl-dark-gold">
                            The Heritage Series
                        </h3>
                        <p className="text-lg leading-relaxed text-asl-espresso/80 dark:text-asl-dark-sand font-light">
                            Every stitch tells a story. Our Cultural Jerseys are authentic reproductions of history, capturing the patterns, colors, and spirit of civilizations from around the globe. Wear your origin with pride.
                        </p>
                        <Link to="/shop/cultural" className="inline-block mt-4 text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-asl-espresso dark:border-asl-dark-gold text-asl-espresso dark:text-asl-dark-gold hover:text-asl-gold hover:border-asl-gold transition-colors pb-2">
                            Explore the Collection
                        </Link>
                    </div>
                    <Link to="/product/1" className="aspect-[4/5] bg-asl-espresso/5 dark:bg-asl-dark-gold/5 flex items-center justify-center border border-asl-gold/20 relative group overflow-hidden cursor-pointer">
                        <img
                            src="/images/photo for website/Iraq V1 Front Jersey Photoshop.png"
                            alt="Iraq Origins Jersey"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </Link>
                </div>
            </section>

            {/* --- UNIQUE JERSEYS SECTION --- */}
            <section className="py-12 md:py-24 px-4 md:px-8 relative z-10 bg-asl-espresso/5 dark:bg-asl-dark-gold/5">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="order-2 md:order-1 aspect-[4/5] bg-asl-cream dark:bg-asl-dark-espresso flex items-center justify-center border border-asl-gold/20">
                        {/* Placeholder for Jersey Image */}
                        <div className="text-center opacity-40">
                            <img src="https://api.iconify.design/ph:star-four-thin.svg?color=%23c2b280" className="w-32 h-32 mx-auto mb-4" alt="Unique Icon" />
                            <span className="font-serif italic text-asl-espresso dark:text-asl-dark-sand">Experimental Concept</span>
                        </div>
                    </div>
                    <div className="order-1 md:order-2 space-y-6 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-serif text-asl-espresso dark:text-asl-dark-ivory">
                            Unique Jerseys
                        </h2>
                        <h3 className="text-sm font-sans uppercase tracking-[0.2em] text-asl-gold dark:text-asl-dark-gold">
                            Limited Edition Concepts
                        </h3>
                        <p className="text-lg leading-relaxed text-asl-espresso/80 dark:text-asl-dark-sand font-light">
                            For those who dare to stand out. Our Unique collection fuses modern street aesthetics with traditional craftsmanship. Rare, experimental, and never repeated.
                        </p>
                        <Link to="/shop/unique" className="inline-block mt-4 text-xs font-bold uppercase tracking-[0.2em] border-b-2 border-asl-espresso dark:border-asl-dark-gold text-asl-espresso dark:text-asl-dark-gold hover:text-asl-gold hover:border-asl-gold transition-colors pb-2">
                            View Unique Pieces
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- CUSTOM REQUEST SECTION --- */}
            <section className="py-20 md:py-32 px-4 md:px-8 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-6xl font-serif text-asl-espresso dark:text-asl-dark-ivory">
                        Make Your Own
                    </h2>
                    <p className="text-lg md:text-xl leading-relaxed text-asl-espresso/80 dark:text-asl-dark-sand font-light px-4">
                        Have a vision of your origin? Work with our artisans to create a bespoke piece that tells your personal story. From initial blueprint to final stitch.
                    </p>
                    <div className="pt-4">
                        <Link to="/custom" className="inline-block px-10 py-4 md:px-12 md:py-5 border-2 border-asl-espresso text-asl-espresso dark:text-asl-dark-gold dark:border-asl-dark-gold hover:bg-asl-espresso hover:text-asl-cream dark:hover:bg-asl-dark-gold dark:hover:text-asl-dark-espresso transition-all duration-500 tracking-widest uppercase text-xs font-bold">
                            Start Custom Project
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- ABOUT US TEASER --- */}
            <section className="py-16 md:py-24 px-4 md:px-8 relative z-10 border-t border-asl-stone/30 dark:border-asl-dark-bronze/30 bg-asl-cream dark:bg-asl-dark-espresso">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h3 className="text-xs md:text-sm font-sans uppercase tracking-[0.5em] text-asl-gold dark:text-asl-dark-gold">
                        Our Philosophy
                    </h3>
                    <p className="text-xl md:text-4xl font-serif italic text-asl-espresso dark:text-asl-dark-ivory leading-tight px-4">
                        "To celebrate cultural diversity is to unify the human experience."
                    </p>
                    <p className="text-sm md:text-base text-asl-espresso/70 dark:text-asl-dark-sand max-w-2xl mx-auto px-4">
                        ASIL is more than a brand. It's a journey from cultural confusion to confident representation.
                    </p>
                    <Link to="/about" className="inline-block text-xs font-bold uppercase tracking-[0.2em] border-b border-asl-gold text-asl-gold hover:text-asl-espresso dark:hover:text-asl-dark-ivory transition-colors pb-1">
                        Read Our Story
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
