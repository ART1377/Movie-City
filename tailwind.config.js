/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xxs: "320px",
        xs: "480px",
        s: "540px",
        xm: "900px",
      },
      colors: {
        "main-green": "var(--main-green)",
        "dark-green": "var(--dark-green)",
        "light-green": "var(--light-green)",
        "header-color": "var(--header-color)",
        "text-dark": "var(--text-dark)",
        "text-light": "var(--text-light)",
        "bg-body": "var(--bg-body)",
        "bg-white": "var(--bg-white)",
        "bg-black": "var(--bg-black)",
      },
      boxShadow: {
        "box-shadow":
          "rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px",
      },
    },
  },
  plugins: [],
};
