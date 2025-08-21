import { MainButton } from '@repo/ui/components';
import { BoldBigText, BoldText } from '../../styles/text.style';
import { usePaymentStore } from '../../../store/mock/mockPaymentStore';
import { PaymentPayload } from '../../../types/payement/payment.model';

interface PayConfirmProps {
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmPayment: () => void;
  title: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addAmount: number;
}

const PayConfirmModal = ({
  setIsConfirmModalOpen,
  title,
  setIsModalOpen,
}: PayConfirmProps) => {
  const setSavedPayment = usePaymentStore((state) => state.setSavedPayment);

  const handleConfirm = () => {
    const paymentInfo: PaymentPayload = {
      method: title === 'card' ? '카드' : '계좌 이체',
      paymentInfoId: 0,
      rewardId: null,
      projectId: 0,
      amount: 0,
      totalAmount: 0,
      scheduleDate: '',
      address: '',
    };

    setSavedPayment(paymentInfo);
    setIsModalOpen(true);
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="flex flex-col p-5 gap-5">
      <div className="text-center flex flex-col gap-[10px]">
        {title === 'card' ? (
          <>
            <BoldBigText>카드 결제</BoldBigText>
            <BoldText>결제 수단으로 등록하시겠습니까?</BoldText>
          </>
        ) : (
          <>
            <BoldBigText>계좌 이체</BoldBigText>
            <BoldText>결제 수단으로 등록하시겠습니까?</BoldText>
          </>
        )}
      </div>
      <div className="flex gap-[20px] justify-center">
        <MainButton
          label="아니오"
          width="w-[200px]"
          onClick={() => setIsConfirmModalOpen(false)}
        />
        <MainButton label="예" width="w-[200px]" onClick={handleConfirm} />
      </div>
    </div>
  );
};

export default PayConfirmModal;
