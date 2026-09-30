/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@repo/ui/tailwind-preset')],
  content: [
    './src/*.{tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
    '../funding/src/**/*.{js,ts,jsx,tsx}',
    '../statistics/src/**/*.{js,ts,jsx,tsx}',
    '../mypage/src/**/*.{js,ts,jsx,tsx}',
    '../payment/src/**/*.{js,ts,jsx,tsx}',
    '../admin/src/**/*.{js,ts,jsx,tsx}',
  ],
};
