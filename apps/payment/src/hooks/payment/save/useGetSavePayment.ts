import { useQuery } from '@tanstack/react-query';
import { getPaymentDetailSave } from '../../../api/payment';
import { PaymentSavePayment } from '../../../types/payement/paymentSave.model';

export const useGetSavePayment = (id: number) => {
  return useQuery<PaymentSavePayment, Error>({
    queryKey: ['paymentSaveInfo'],
    queryFn: async () => {
      const res = await getPaymentDetailSave(id);
      return res.data;
    },
  });
};
