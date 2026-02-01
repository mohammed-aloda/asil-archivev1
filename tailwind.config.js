/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './App.tsx',
        './main.tsx'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: {
                'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
            },
            colors: {
                asl: {
                    // Light Mode (Parchment)
                    cream: '#FDFBF7',
                    espresso: '#2C1E16',
                    gold: '#C2B280',

                    // Dark Mode (High Visibility)
                    'dark-espresso': '#1A1410',
                    'dark-ivory': '#FFFDF5',
                    'dark-sand': '#EFEBD8',
                    'dark-gold': '#E6D5A7',

                    // Legacy/Backwards compatibility
                    stone: '#D2C4A7',
                    'dark-bronze': '#4E3B31',
                    'dark-text': '#FFFDF5',
                    'dark-bg': '#1A1410',
                },
                'bright-gold': '#FFD700',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Montserrat"', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
};
