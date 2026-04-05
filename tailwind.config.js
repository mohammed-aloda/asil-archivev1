/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './App.tsx',
        './main.tsx'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
            },
            colors: {
                asl: {
                    cream: '#FDFBF7',
                    espresso: '#2C1E16',
                    gold: '#C2B280',
                    stone: '#D2C4A7',
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
