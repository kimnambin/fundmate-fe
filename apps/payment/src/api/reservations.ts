import { apiClient } from '@repo/ui/api-client';
import { PaymentPayload } from '../types/payment/payment.model';
import { ReservationPayload } from '../types/reservation/reservations.model';
import { BankPayload, CardPayload } from '../types/payment/paymentSave.model';

export const postReservations = (payload: PaymentPayload) => {
  return apiClient.post(`/api/reservations`, payload);
};

export const getAllReservations = () => {
  return apiClient.get(`/api/reservations`);
};

export const getReservations = (id: number) => {
  return apiClient.get(`/api/reservations/${id}`);
};

export const delReservations = (id: number) => {
  return apiClient.delete(`/api/reservations/${id}`);
};

export const patchReservations = (id: number, payload: ReservationPayload) => {
  return apiClient.patch(`/api/reservations/${id}`, payload);
};

export const putBankReservations = (id: number, payload: BankPayload) => {
  return apiClient.put(`/api/reservations/${id}/payment-info`, payload);
};

export const putCardReservations = (id: number, payload: CardPayload) => {
  return apiClient.put(`/api/reservations/${id}/payment-info`, payload);
};
