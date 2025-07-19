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
      name: 'mypage',
      filename: 'remoteEntry.js',
      exposes: {
        './Mypage': './src/pages/Mypage/Mypage.tsx',
        './SupportedProjects':
          './src/pages/supportedProject/supportedProjects.tsx',
        './LikedProjects': './src/pages/likedProjects/LikedProjects.tsx',
        './Following': './src/pages/Following/Following.tsx',
        './MyReviews': './src/pages/MyReviews/MyReviews.tsx',
        './SupporterProfile':
          './src/pages/SupporterProfile/SupporterProfile.tsx',
        './ProfileSetting':
          './src/pages/UserProfileSettings/UserProfileSettings.tsx',
        './Withdrawal': './src/pages/withdrawal/withdrawal.tsx',
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
    target: 'esnext',
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
