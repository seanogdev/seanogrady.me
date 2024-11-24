/** @type {import("prettier").Config} */
export default {
  printWidth: 120,
  singleQuote: true,
  htmlWhitespaceSensitivity: 'ignore',
  tailwindEntryPoint: './app/app.css',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['tv'],
};
