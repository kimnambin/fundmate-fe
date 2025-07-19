import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface PatchReservationRequest {
  rewardId: number | null;
  donateAmount: number;
  scheduleDate: string;
  address: string;
  addressNumber: number;
  addressInfo: string;
}

export const usePatchReservation = (id: number) =>
  useMutation({
    mutationFn: (data: PatchReservationRequest) =>
      axios.patch(`/reservations/${id}`, data),
  });
