export interface PaymentProps {
  addAmount: number;
  addressData: string;
  method: 'CARD' | 'BANK';
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}
