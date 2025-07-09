import { create } from "zustand";

interface statisticsStoreProps {
  isLoading: boolean;
  isSubmit: boolean;
  setIsLoading: () => void;
  setIsSubmit: () => void;
}

export const statisticsStore = create<statisticsStoreProps>()((set) => ({
  isLoading: false,
  isSubmit: false,
  setIsLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  setIsSubmit: () => set((state) => ({ isSubmit: !state.isSubmit }))

}))
