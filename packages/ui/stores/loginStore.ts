import { create } from 'zustand';

interface loginStoreProps {
  nickname: string | null;
  setNickname: (newNickname: string | null) => void;
}

export const loginStore = create<loginStoreProps>()((set) => ({
  nickname: null,
  setNickname: (newNickname) => set({ nickname: newNickname }),
}));
