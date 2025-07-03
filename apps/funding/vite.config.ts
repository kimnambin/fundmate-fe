import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'funding',
      filename: 'remoteEntry.js',
      remotes: {
        admin: 'http://localhost:5001/assets/remoteEntry.js',
      },
      exposes: {
        './CreateFundingPage': './src/pages/createFunding/createFunding.tsx',
        './AskFundiPage': './src/pages/askFundi/askFundi.tsx',
        './AskFundiResultPage': './src/pages/askFundi/askFundiResult.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  build: {
    target: 'esnext',
  },
});
