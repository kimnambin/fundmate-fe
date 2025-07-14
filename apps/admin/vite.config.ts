import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

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
        './PaymentManagement': './src/pages/paymentManagement/paymentManagement.tsx',
        './PaymentSummary': './src/pages/paymentManagement/paymentSummary.tsx',
        './StatsPage': './src/pages/stats/statsPage.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@ramonak/react-progress-bar'],
    }),
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
});
