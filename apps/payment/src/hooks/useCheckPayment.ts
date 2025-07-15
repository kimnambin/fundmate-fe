import { useQuery } from '@tanstack/react-query';
import { getPaymentSave } from '../api/payment';

export const useCheckPayment = (userId: number, _p: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['payment', userId],
    queryFn: async () => {
      const res = await getPaymentSave(userId);
      return !!res.data;
    },
    enabled: false,
  });
};
