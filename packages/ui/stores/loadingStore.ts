import { create } from "zustand";

interface loadingStoreProps {
  isLoading: boolean;
  setIsLoading: () => void;
}

export const loadingStore = create<loadingStoreProps>()((set) => ({
  isLoading: false,
  setIsLoading: () => set((state) => ({ isLoading: !state.isLoading }))
}))
