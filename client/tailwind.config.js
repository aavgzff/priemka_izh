/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite/**/*.js',
        './node_modules/flowbite-react/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                'custom-blue': '#008AD3',
                'custom-grey': '#201f1f',
                surface: '#f8fafc',
            },
            fontFamily: {
                worksans: ['WorkSans', 'sans-serif'],
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '1.5rem',
                    lg: '2rem',
                },
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
    ],
}
