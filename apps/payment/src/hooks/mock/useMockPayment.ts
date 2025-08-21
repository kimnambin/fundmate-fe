import axios from 'axios';

export const mockPostPayment = async (data: {
  method: string;
  code: string;
  token: string;
  displayInfo: string;
  details:
    | {
        type: 'card';
        expMonth: string;
        expYear?: string;
      }
    | {
        type: 'vbank';
        owner: string;
      };
}) => {
  return axios.post('/payments', data);
};

export const mockPostReservations = async (data: {
  paymentInfoId: number;
  rewardId: number | null;
  projectId: number;
  amount: number;
  totalAmount: number;
  scheduleDate: string;
  address: string;
  addressNumber: number;
  addressInfo: string;
  method: string;
}) => {
  return axios.post('/reservations', data);
};

export const mockGetPaymentInfo = async () => {
  return axios.get('/payments');
};
