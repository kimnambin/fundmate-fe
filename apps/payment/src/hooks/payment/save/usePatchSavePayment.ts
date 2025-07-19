import { useMutation } from '@tanstack/react-query';
import { patchReservations } from '../../../api/reservations';

interface PatchReservationRequest {
  rewardId: number;
  donateAmount: number;
  scheduleDate: string;
  address: string;
  addressNumber: number;
  addressInfo: string;
}

export const usePatchReservation = (id: number) =>
  useMutation({
    mutationFn: async (data: PatchReservationRequest) => {
      const payload: PatchReservationRequest = {
        ...data,
        rewardId: data.rewardId ?? 0,
      };
      return await patchReservations(id, payload);
    },
  });
