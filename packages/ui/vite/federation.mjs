// 모든 앱(vite.config.ts)이 공유하는 Module Federation / 개발 서버 공통 설정.

// 호스트와 remote가 하나의 인스턴스를 공유해야 하는 패키지.
// 앱이 직접 쓰지 않더라도 @repo/ui가 쓰므로 전부 공유 대상에 둔다.
export const FEDERATION_SHARED = [
  'react',
  'react-dom',
  'react-router-dom',
  '@tanstack/react-query',
  'axios',
  '@ramonak/react-progress-bar',
];

export const federationDedupe = FEDERATION_SHARED;

// dev 서버의 `/api` 프록시. (배포에서는 vercel rewrite가 같은 역할을 한다)
/** @param {string | undefined} target */
export const apiProxy = (target) => ({
  '/api': {
    target,
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
    secure: false,
    cookieDomainRewrite: '',
  },
});
