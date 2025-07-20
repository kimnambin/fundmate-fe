import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import dotenv from 'dotenv';
import { resolve } from 'path';

export const MAIN_PAGE = 'https://fundmate-fe.vercel.app';
export const FUNDING_PAGE = 'https://fundmate-fe-funding.vercel.app';
export const STATISTICS_PAGE = 'https://fundmate-fe-statistics.vercel.app';
export const MYPAGE = 'https://fundmate-fe-mypage.vercel.app';
export const ADMIN_PAGE = 'https://fundmate-fe-admin.vercel.app';
export const PAYMENT_PAGE = 'https://fundmate-fe-payment.vercel.app';

export default defineConfig(({ mode }) => {
  dotenv.config({ path: resolve(__dirname, '../../.env') });
  console.log(mode);
  const isDev = mode === 'development';
  const deploymentState = !isDev;
  return {
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
          '@tanstack/react-query',
          'axios',
          '@ramonak/react-progress-bar',
        ],
      }),
    ],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react-router-dom',
          '@tanstack/react-query',
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
        '@tanstack/react-query',
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
  };
});
