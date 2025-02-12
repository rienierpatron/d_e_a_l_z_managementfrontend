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
        "white-20": "var(--color-white-20)",
        black: "var(--color-black)",
        primary: "var(--color-primary)",
        "dark-primary": "var(--color-dark-primary)",
        "primary-40": "var(--color-primary-40)",
        secondary: "var(--color-secondary)",
        "secondary-60": "var(--color-secondary-60)",
        purple: "var(--color-purple)",
        "purple-60": "var(--color-purple-60)",
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
        "green-60": "var(--color-green-60)",
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
        '4xl': "1920px",
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
      animation: {
        'scale-rotate': 'scaleRotate 3s ease-in-out infinite',
        'move-left-right': 'moveLeftRight 3s ease-in-out infinite',
      },
      keyframes: {
        scaleRotate: {
          '0%': {
            transform: 'scale(1) rotate(0deg)',  // Initial state: no scale or rotation
          },
          '50%': {
            transform: 'scale(1.05) rotate(3deg)',  // Slightly scale up and rotate
          },
          '100%': {
            transform: 'scale(1) rotate(0deg)',  // Return to original size and rotation
          },
        },
        moveLeftRight: {
          '0%, 100%': {
            transform: 'translateX(0)', // Starting position and end position (no movement)
          },
          '50%': {
            transform: 'translateX(30px)', // Move 10px to the right at the halfway point
          },
        },
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
