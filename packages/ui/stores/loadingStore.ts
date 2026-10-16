import { create } from 'zustand';

interface loadingStoreProps {
  /** 진행 중인 API 요청 수 (apiClient 인터셉터가 관리) */
  pending: number;
  /** 진행 중인 요청이 하나라도 있는지 */
  isLoading: boolean;
  begin: () => void;
  end: () => void;
  setIsLoading: (value: boolean) => void;
}

const createLoadingStore = () =>
  create<loadingStoreProps>()((set) => ({
    pending: 0,
    isLoading: false,
    begin: () =>
      set((s) => ({ pending: s.pending + 1, isLoading: true })),
    end: () =>
      set((s) => {
        const pending = Math.max(0, s.pending - 1);
        return { pending, isLoading: pending > 0 };
      }),
    setIsLoading: (value) => set({ isLoading: value }),
  }));

// remote마다 @repo/ui가 따로 번들되어 모듈 인스턴스가 갈린다.
// 호스트의 로딩 바가 remote의 요청도 보도록 store를 globalThis에 하나만 둔다.
const KEY = '__fundmateLoadingStore__';
const g = globalThis as unknown as Record<
  string,
  ReturnType<typeof createLoadingStore> | undefined
>;

export const loadingStore = (g[KEY] ??= createLoadingStore());
