import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
// import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'payment',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductPage': './src/pages/ProductPage.tsx',
        './PaymentPage': './src/pages/PaymentPage.tsx',
        './PaymentCompleted': './src/pages/PaymentcompletedPage.tsx',
        './PaymentDetail': './src/pages/PaymentDetail.tsx',
        './PaymentListPage': './src/pages/PaymentListPage.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
    // tailwindcss(),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
  },
});
