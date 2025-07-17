import { create } from 'zustand';

interface statisticsStoreProps {
  isDataSubmitted: boolean;
  setDataSubmitState: (value: boolean) => void;
}

export const statisticsStore = create<statisticsStoreProps>()((set) => ({
  isDataSubmitted: false,
  setDataSubmitState: (value) => set({ isDataSubmitted: value }),
}));
