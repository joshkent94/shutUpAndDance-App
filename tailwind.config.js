/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        colors: {
            primary: 'rgb(var(--primary-colour))',
            secondary: 'rgb(var(--secondary-colour))',
            third: 'rgb(var(--third-colour))',
            fourth: 'rgb(var(--fourth-colour))',
            fifth: 'rgb(var(--fifth-colour))',
        },
        extend: {
            backgroundImage: {
                rapper: "url('/assets/rapper-cropped.jpg')",
            },
        },
    },
    plugins: [],
    important: true,
}
