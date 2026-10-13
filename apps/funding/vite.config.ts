import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import { resolve } from 'path';
import {
  FEDERATION_SHARED,
  apiProxy,
} from '@repo/ui/vite-federation';

dotenv.config({ path: resolve(__dirname, '../../.env') });

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    federation({
      name: 'funding',
      filename: 'remoteEntry.js',
      exposes: {
        './CreateFundingPage': './src/pages/createFunding/createFunding.tsx',
        './AskFundiPage': './src/pages/askFundi/askFundi.tsx',
        './AskFundiResultPage': './src/pages/askFundi/askFundiResult.tsx',
      },
      shared: FEDERATION_SHARED,
    }),
  ],
  build: {
    target: 'esnext',
    // html2pdf(html2canvas+jsPDF, ~524kB)는 PDF 저장 시에만 동적 import 되므로 허용한다.
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      external: FEDERATION_SHARED,
    },
  },
  experimental: {
    // remote가 host(main) 페이지에 로드되면 lazy 청크의 preload 의존성(JS/CSS)이
    // host origin의 `/assets/...`로 요청되어 깨진다. 청크 자신의 URL 기준으로 해석한다.
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return {
          runtime: `new URL(${JSON.stringify("../" + filename)}, import.meta.url).href`,
        };
      }
      return { relative: true };
    },
  },
  server: {
    proxy: apiProxy(process.env.VITE_BACKEND_ADDRESS),
  },
});
