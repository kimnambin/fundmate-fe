import axios from 'axios';
import { BankPayload, CardPayload } from '../types/paymentSave.model';
import { PaymentPayload } from '../types/payment.model';
// const API_URL = import.meta.env.VITE_API_URL;

export const bankPaymentSave = (payload: BankPayload) => {
  // return axios.post(`${API_URL}/payments`, payload);
  return axios.post(`/payments`, payload);
};

export const CardPaymentSave = (payload: CardPayload) => {
  // return axios.post(`${API_URL}/payments`, payload);
  return axios.post(`/payments`, payload);
};

export const getPaymentSave = (id: number) => {
  // return axios.get(`${API_URL}/payments/${id}`);
  return axios.get(`/payments/${id}`);
};

export const postPayment = (payload: PaymentPayload) => {
  return axios.post(`/reservations`, payload);
  // return axios.post(`${API_URL}/reservations`, payload);
};
