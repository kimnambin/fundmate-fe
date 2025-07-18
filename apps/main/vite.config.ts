import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') });

const ADMIN = 'https://fundmate-fe-admin.vercel.app';
const FUNDING = 'https://fundmate-fe-funding.vercel.app';
const MYPAGE = 'https://fundmate-fe-mypage.vercel.app';
const PAYMENT = 'https://fundmate-fe-payment.vercel.app';
const STATISTICS = 'https://fundmate-fe-statistics.vercel.app';

const isDeployed = import.meta.env.MODE === 'production';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main',
      remotes: {
        admin: isDeployed
          ? ADMIN
          : 'http://localhost:5001/assets/remoteEntry.js',
        funding: isDeployed
          ? FUNDING
          : 'http://localhost:5002/assets/remoteEntry.js',
        mypage: isDeployed
          ? MYPAGE
          : 'http://localhost:5003/assets/remoteEntry.js',
        payment: isDeployed
          ? PAYMENT
          : 'http://localhost:5004/assets/remoteEntry.js',
        statistics: isDeployed
          ? STATISTICS
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
        target: process.env.VITE_BACKEND_ADDRESS,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        cookieDomainRewrite: '',
      },
    },
  },
});
