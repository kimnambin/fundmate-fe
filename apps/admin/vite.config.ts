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
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './FundingHistory': './src/pages/fundingHistory/fundingHistory.tsx',
        './MakerProfile': './src/pages/makerProfile/makerProfile.tsx',
        './PaymentList': './src/pages/paymentManagement/paymentList.tsx',
        './PaymentManagement':
          './src/pages/paymentManagement/paymentManagement.tsx',
        './PaymentSummary': './src/pages/paymentManagement/paymentSummary.tsx',
        './StatsPage': './src/pages/stats/statsPage.tsx',
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        'axios',
        '@ramonak/react-progress-bar',
      ],
    }),
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-router-dom',
        'axios',
        '@ramonak/react-progress-bar',
      ],
    },
  },
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      'react-router-dom',
      '@ramonak/react-progress-bar',
    ],
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
