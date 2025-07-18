import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import dotenv from 'dotenv';
import { resolve } from 'path';
import {
  ADMIN_PAGE,
  FUNDING_PAGE,
  MYPAGE,
  PAYMENT_PAGE,
  STATISTICS_PAGE,
} from '@repo/ui/utils';

dotenv.config({ path: resolve(__dirname, '../../.env') });
const deploymentState = import.meta.env.MODE === 'production';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main',
      remotes: {
        admin: deploymentState
          ? `${ADMIN_PAGE}/assets/remoteEntry.js`
          : 'http://localhost:5001/assets/remoteEntry.js',
        funding: deploymentState
          ? `${FUNDING_PAGE}/assets/remoteEntry.js`
          : 'http://localhost:5002/assets/remoteEntry.js',
        mypage: deploymentState
          ? `${MYPAGE}/assets/remoteEntry.js`
          : 'http://localhost:5003/assets/remoteEntry.js',
        payment: deploymentState
          ? `${PAYMENT_PAGE}/assets/remoteEntry.js`
          : 'http://localhost:5004/assets/remoteEntry.js',
        statistics: deploymentState
          ? `${STATISTICS_PAGE}/assets/remoteEntry.js`
          : 'http://localhost:5005/assets/remoteEntry.js',
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        '@ramonak/react-progress-bar',
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
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
        target: process.env.BACKEND_ADDRESS,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        cookieDomainRewrite: '',
      },
    },
  },
});
