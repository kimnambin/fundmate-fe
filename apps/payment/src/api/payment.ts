import axios from 'axios';
import { BankPayload, CardPayload } from '../types/paymentSave.model';
import { PaymentPayload } from '../types/payment.model';

export const bankPaymentSave = (payload: BankPayload) => {
  return axios.post(`/api/payments`, payload);
};

export const CardPaymentSave = (payload: CardPayload) => {
  return axios.post(`/api/payments`, payload);
};

export const getPaymentSave = (id: number) => {
  return axios.get(`/api/payments/${id}`);
};

export const postPayment = (payload: PaymentPayload) => {
  return axios.post(`/api/reservations`, payload);
};
