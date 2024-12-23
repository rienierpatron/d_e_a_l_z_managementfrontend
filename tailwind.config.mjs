/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "var(--color-white)",
        black: "var(--color-black)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        purple: "var(--color-purple)",
        red: "var(--color-red)",
        "red-40": "var(--color-red-40)",
        orange: "var(--color-orange)",
        "orange-80": "var(--color-orange-80)",
        "sky-blue": "var(--color-sky-blue)",
        "light-blue": "var(--color-light-blue)",
        "dark-blue-80": "var(--color-dark-blue-80)",
        "midnight-blue": "var(--color-midnight-blue)",
        "dark-gray": "var(--color-dark-gray)",
        "light-gray": "var(--color-light-gray)",
        green: "var(--color-green)",
        gold: "var(--color-gold)",
        "gold-15": "var(--color-gold-15)",
      },
      fontSize: {
        "32px": "var(--font-32px)",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1536px",
      },
    },
  },
  plugins: [],
};
