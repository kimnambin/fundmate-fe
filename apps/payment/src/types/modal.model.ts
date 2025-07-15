export interface PaymentProps {
  addressData: string;
  method: 'CARD' | 'vBANK';
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setSavedPaymentId: (id: number) => void;
}
