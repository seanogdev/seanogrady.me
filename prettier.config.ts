import type { Config } from 'prettier';

const config: Config = {
  printWidth: 120,
  singleQuote: true,
  htmlWhitespaceSensitivity: 'ignore',
  tailwindStylesheet: './app/style.css',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
