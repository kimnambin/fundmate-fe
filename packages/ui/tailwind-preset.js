/** 모든 앱이 공유하는 Tailwind 디자인 토큰. 앱의 tailwind.config.js에서 `presets`로 사용한다. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#F59E0B',

        main: '#5FBDFF',
        mainOpacity: '#5FBDFF1A',
        'sub-color': '#DFF2FF',
        'text-active': '#000000',
        'text-unactive': '#343F59',
        'sub-text': '#7E7C7C',
        'input-text': '#94A3B8',
        // DEFAULT만 덮어써서 `text-red-500` 같은 기본 스케일은 그대로 유지한다.
        red: { DEFAULT: '#FB6565' },
        line: '#E2E8F0',
        'gray-background': '#F1F7EC',
      },
      fontFamily: {
        sans: ['Pretendard'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      containers: {
        '2xs': '16rem',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
