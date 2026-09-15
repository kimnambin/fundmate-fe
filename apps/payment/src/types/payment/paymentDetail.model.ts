export interface Reservation {
  id: number;
  userId: number;
  rewardId: number;
  paymentInfoId: number;
  productImage: string;
  productName: string;
  optionName: string;
  optionAmount: number;
  amount: number;
  donateAmount: number | null;
  totalAmount: number;
  scheduleDate?: string;
  executed: boolean;
  createdAt: string;
  address: string;
  addressNumber: number;
  addressInfo: string;
  retryCount: number;
  lastErrorMessage: string | null;
  message?: string;
}
