/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@repo/ui/tailwind-preset')],
  content: [
    './src/*.tsx',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
};
