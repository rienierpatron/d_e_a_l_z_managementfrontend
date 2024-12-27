const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "var(--color-white)",
        black: "var(--color-black)",
        primary: "var(--color-primary)",
        "dark-primary": "var(--color-dark-primary)",
        "primary-40": "var(--color-primary-40)",
        secondary: "var(--color-secondary)",
        purple: "var(--color-purple)",
        red: "var(--color-red)",
        "red-40": "var(--color-red-40)",
        orange: "var(--color-orange)",
        "orange-80": "var(--color-orange-80)",
        "sky-blue": "var(--color-sky-blue)",
        "light-blue": "var(--color-light-blue)",
        "background-blue": "var(--color-background-blue)",
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
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(104deg, #4177F4 11.43%, #F945B1 82.92%)",
        "gradient-table-head":
          "linear-gradient(104deg, rgba(65, 119, 244, 0.08) 11.43%, rgba(249, 69, 177, 0.08) 82.92%);",
      },
      boxShadow: {
        "custom-label-info": "0px -1px 12px 0px rgba(0, 0, 0, 0.05)",
        "custom-primary": "0px 8px 20px 0px rgba(249, 69, 177, 0.20);",
        "custom-purple": "0px 4px 24px 0px rgba(155, 97, 220, 0.40)",
        "custom-black": "0px 6px 24px 0px rgba(0, 0, 0, 0.04)",
      },
      width: {
        main: "calc(100% - 115px)",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none" /* Chrome, Safari, Edge */,
        },
      });
    },
  ],
};
