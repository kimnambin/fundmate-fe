import { create } from "zustand";

interface statisticsStoreProps {
  isLoading: boolean;
  isSubmit: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setIsSubmit: (isSubmit: boolean) => void;
}

export const statisticsStore = create<statisticsStoreProps>()((set) => ({
  isLoading: false,
  isSubmit: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsSubmit: (isSubmit) => set({ isSubmit })

}))
