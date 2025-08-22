import { create } from 'zustand';

interface PriceState {
  updatedPrice: number | null;
  setUpdatedPrice: (price: number) => void;
}

export const usePriceStore = create<PriceState>((set) => ({
  updatedPrice: null,
  setUpdatedPrice: (price) => set({ updatedPrice: price }),
}));
