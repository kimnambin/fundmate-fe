import axios from 'axios';
import { PaymentPayload } from '../types/payement/payment.model';
import { ReservationPayload } from '../types/reservation/reservations.model';
import { BankPayload, CardPayload } from '../types/payement/paymentSave.model';

export const postReservations = (payload: PaymentPayload) => {
  return axios.post(`/api/reservations`, payload);
};

export const getAllReservations = () => {
  return axios.get(`/api/reservations`);
};

export const getReservations = (id: number) => {
  return axios.get(`/api/reservations/${id}`);
};

export const delReservations = (id: number) => {
  return axios.delete(`/api/reservations/${id}`);
};

export const patchReservations = (id: number, payload: ReservationPayload) => {
  return axios.patch(`/api/reservations/${id}`, payload);
};

export const putBankReservations = (id: number, payload: BankPayload) => {
  return axios.put(`/api/reservations/${id}/payment-info`, payload);
};

export const putCardReservations = (id: number, payload: CardPayload) => {
  return axios.put(`/api/reservations/${id}/payment-info`, payload);
};
