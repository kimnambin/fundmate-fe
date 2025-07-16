export interface PaymentPayload {
  paymentInfoId: number;
  rewardId: number;
  projectId: number;
  amount: number;
  totalAmount: number;
  scheduleDate: string;
  address: string;
  addressNumber: number;
  addressInfo: string;
}
