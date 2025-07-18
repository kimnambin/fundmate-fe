import { create } from 'zustand';

interface loadingStoreProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const loadingStore = create<loadingStoreProps>()((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}));
