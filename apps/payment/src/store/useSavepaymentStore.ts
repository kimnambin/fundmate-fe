import { create } from 'zustand';

interface PaymentState {
  insertedId: string | null;
  setInsertedId: (id: string) => void;
}

export const useSavePaymentStore = create<PaymentState>((set) => ({
  insertedId: null,
  setInsertedId: (id: string) => set({ insertedId: id }),
}));
