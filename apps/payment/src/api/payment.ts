import axios from 'axios';
import { BankPayload, CardPayload } from '../types/payement/paymentSave.model';

export const bankPaymentSave = (payload: BankPayload) => {
  return axios.post(`/api/payments`, payload);
};

export const CardPaymentSave = (payload: CardPayload) => {
  return axios.post(`/api/payments`, payload);
};

export const getPaymentSave = () => {
  return axios.get(`/api/payments`);
};

export const getPaymentDetailSave = (id: number) => {
  return axios.get(`/api/payments/${id}`);
};

export const delPaymentSave = (id: number) => {
  return axios.delete(`/api/payments/${id}`);
};
