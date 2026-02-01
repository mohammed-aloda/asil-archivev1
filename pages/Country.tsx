import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';

const CountryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // Convert slug back to readable name
    const countryName = slug
        ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Unknown Country';

    return (
        <div className="min-h-screen bg-asl-cream dark:bg-asl-dark-espresso">
            <Header />

            <main className="pt-24 pb-16 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Back button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-asl-espresso dark:text-asl-dark-sand hover:text-asl-gold dark:hover:text-asl-gold transition-colors mb-8"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="uppercase tracking-widest text-xs font-semibold">Back to Globe</span>
                    </Link>

                    {/* Hero Section */}
                    <div className="space-y-6 mb-16">
                        <div className="space-y-2">
                            <p className="text-xs uppercase tracking-[0.5em] text-asl-gold dark:text-asl-dark-gold font-semibold">
                                Heritage Collection
                            </p>
                            <h1 className="text-5xl md:text-7xl font-serif text-asl-espresso dark:text-asl-dark-ivory">
                                {countryName}
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl text-asl-espresso/80 dark:text-asl-dark-sand max-w-3xl">
                            Discover the cultural heritage and unique jerseys inspired by {countryName}'s rich history and traditions.
                        </p>
                    </div>

                    {/* Coming Soon Section */}
                    <div className="bg-white dark:bg-asl-dark-espresso/50 rounded-lg border-2 border-asl-espresso/20 dark:border-asl-gold/20 p-12 text-center">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <div className="w-20 h-20 mx-auto bg-asl-gold/10 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-asl-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <h2 className="text-3xl font-serif text-asl-espresso dark:text-asl-dark-ivory">
                                Coming Soon
                            </h2>

                            <p className="text-base text-asl-espresso/70 dark:text-asl-dark-sand">
                                We're curating a special collection of cultural jerseys and heritage artifacts
                                from {countryName}. Check back soon to explore this unique collection.
                            </p>

                            <div className="pt-4">
                                <Link
                                    to="/shop/cultural"
                                    className="inline-block px-8 py-3 border-2 border-asl-espresso dark:border-asl-dark-ivory text-asl-espresso dark:text-asl-dark-ivory hover:bg-asl-espresso hover:text-asl-cream dark:hover:bg-asl-dark-ivory dark:hover:text-asl-dark-espresso transition-all duration-300 uppercase tracking-widest text-sm font-semibold"
                                >
                                    Browse All Cultural Jerseys
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center space-y-3">
                            <div className="w-12 h-12 mx-auto bg-asl-gold/10 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-asl-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-xl text-asl-espresso dark:text-asl-dark-ivory">
                                Authentic Heritage
                            </h3>
                            <p className="text-sm text-asl-espresso/70 dark:text-asl-dark-sand">
                                Each design honors the cultural identity and historical significance of {countryName}
                            </p>
                        </div>

                        <div className="text-center space-y-3">
                            <div className="w-12 h-12 mx-auto bg-asl-gold/10 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-asl-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-xl text-asl-espresso dark:text-asl-dark-ivory">
                                Premium Craftsmanship
                            </h3>
                            <p className="text-sm text-asl-espresso/70 dark:text-asl-dark-sand">
                                Meticulously designed and manufactured with attention to every detail
                            </p>
                        </div>

                        <div className="text-center space-y-3">
                            <div className="w-12 h-12 mx-auto bg-asl-gold/10 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-asl-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="font-serif text-xl text-asl-espresso dark:text-asl-dark-ivory">
                                Made with Pride
                            </h3>
                            <p className="text-sm text-asl-espresso/70 dark:text-asl-dark-sand">
                                Celebrating the unique identity and pride of {countryName}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CountryPage;
