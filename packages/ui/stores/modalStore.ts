import { create } from "zustand";

interface modalStoreProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const modalStore = create<modalStoreProps>()((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen }))
}))
