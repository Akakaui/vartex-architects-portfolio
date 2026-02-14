/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#1773cf",
                "background-light": "#ffffff",
                "background-dark": "#111921",
                "accent": "#cf1717",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "mono": ["Roboto Mono", "monospace"],
                "technical": ["IBM Plex Mono", "monospace"],
            },
            letterSpacing: {
                "widest": "0.2em",
                "tighter": "-0.05em",
            },
            borderRadius: {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}
