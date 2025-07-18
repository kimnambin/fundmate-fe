import { useQuery } from '@tanstack/react-query';
import { getReservations } from '../../api/reservations';
import { Reservation } from '../../types/payement/paymentDeatil.model';

export const useGetPayment = (id: number) => {
  return useQuery<Reservation, Error>({
    queryKey: ['paymentInfo'],
    queryFn: async () => {
      const res = await getReservations(id);
      return res.data;
    },
  });
};
