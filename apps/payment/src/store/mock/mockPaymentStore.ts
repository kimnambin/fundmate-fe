import { create } from 'zustand';
import { PaymentPayload } from '../../types/payement/payment.model';

interface PaymentStore {
  savedPayment: PaymentPayload | null;
  setSavedPayment: (payment: PaymentPayload) => void;
  delSavedPayment: () => void;
}
export const usePaymentStore = create<PaymentStore>((set) => ({
  savedPayment: null,
  setSavedPayment: (payment) => set({ savedPayment: payment }),
  delSavedPayment: () => set({ savedPayment: null }),
}));
