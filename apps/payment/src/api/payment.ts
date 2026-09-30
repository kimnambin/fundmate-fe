import { apiClient } from '@repo/ui/api-client';
import { BankPayload, CardPayload } from '../types/payment/paymentSave.model';

export const bankPaymentSave = (payload: BankPayload) => {
  return apiClient.post(`/api/payments`, payload);
};

export const CardPaymentSave = (payload: CardPayload) => {
  return apiClient.post(`/api/payments`, payload);
};

export const getPaymentSave = () => {
  return apiClient.get(`/api/payments`);
};

export const getPaymentDetailSave = (id: number) => {
  return apiClient.get(`/api/payments/${id}`);
};

export const delPaymentSave = (id: number) => {
  return apiClient.delete(`/api/payments/${id}`);
};
