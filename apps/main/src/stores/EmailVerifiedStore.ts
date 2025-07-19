import { create } from "zustand";

interface EmailVerifiedStoreProps {
  email: string | null,
  code: string | null,
  setEmail: (email: string | null) => void,
  setCode: (code: string | null) => void
}

export const emailVerifiedStore = create<EmailVerifiedStoreProps>()((set) => ({
  email: null,
  code: null,
  setEmail: (email) => set({ email }),
  setCode: (code) => set({ code })
}))
