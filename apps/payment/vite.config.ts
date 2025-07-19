import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') });

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
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        '@ramonak/react-progress-bar',
      ],
    }),
    // tailwindcss(),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_ADDRESS,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        cookieDomainRewrite: '',
      },
    },
  },
});
