export const FEDERATION_SHARED: string[];
export const federationDedupe: string[];
export const apiProxy: (target: string | undefined) => {
  '/api': {
    target: string | undefined;
    changeOrigin: boolean;
    rewrite: (path: string) => string;
    secure: boolean;
    cookieDomainRewrite: string;
  };
};
