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
      name: 'statistics',
      filename: 'remoteEntry.js',
      exposes: {
        './Statistics': './src/pages/Statistics.tsx',
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'axios',
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
        '@tanstack/react-query',
        'axios',
      ],
    },
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
