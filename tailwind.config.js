/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // body: ['var(--font-body)'],
        // title: ['var(--font-title)']
        body: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
      },
      colors: {
        background: '#ffffff',
        primary: '#2563eb',
        brand: {
          primary: '#4294e3'
        }
      },
    },
  },
  plugins: [],
};