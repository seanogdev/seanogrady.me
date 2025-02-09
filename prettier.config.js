/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  singleQuote: true,
  htmlWhitespaceSensitivity: 'ignore',
  tailwindStylesheet: './app/style.css',
  plugins: ['prettier-plugin-tailwindcss'],
};
