import { useQuery } from '@tanstack/react-query';
import { getPaymentSave } from '../../api/payment';

interface PaymentItem {
  id: number;
  userId: number;
  method: string;
  code: string;
  displayInfo: string;
}

export const useCheckPayment = (userId: number) => {
  return useQuery({
    queryKey: ['payment', userId],
    queryFn: async () => {
      const res = await getPaymentSave();

      const foundItem = res.data.data?.find(
        (item: PaymentItem) => item.userId === userId
      );

      return foundItem ? foundItem.id : null;
    },
    enabled: !!userId,
  });
};
