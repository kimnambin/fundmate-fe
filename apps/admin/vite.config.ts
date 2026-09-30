import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import dotenv from 'dotenv';
import { resolve } from 'path';
import {
  FEDERATION_SHARED,
  federationDedupe,
  apiProxy,
} from '@repo/ui/vite-federation';

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
      shared: FEDERATION_SHARED,
    }),
  ],
  build: {
    target: 'esnext',
    rollupOptions: {
      external: FEDERATION_SHARED,
    },
  },
  resolve: {
    dedupe: federationDedupe,
  },
  server: {
    proxy: apiProxy(process.env.VITE_BACKEND_ADDRESS),
  },
});
