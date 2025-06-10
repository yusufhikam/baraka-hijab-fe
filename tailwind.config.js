/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                barakadark: {
                    lighgreen: '#E9EDC9',
                    primary: '#F1C376',
                    primary_darker: '#d19121',
                    lighter: '#F7E6C4',
                    light: '#FFF4F4',
                    darker: '#606C5D',
                },
                barakaprimary: {
                    snow: '#FCF7F8',
                    madder: '#A31621',
                    dessert: '#F3970D',
                },
            },

            // keyframes: {
            //     'spin-border': {
            //         '0%': { innerWidth: 'rotate(0deg)' },
            //         '100%': { transform: 'rotate(360deg)' },
            //     },
            // },
            // animation: {
            //     'spin-border': 'spin-border 1s linear infinite',
            // },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
