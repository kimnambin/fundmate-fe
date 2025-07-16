import { MainButton, Modal } from '@repo/ui/components';
import { BoldBigText, BoldText } from '../styles/text.style';
import { formatPrice } from '@repo/ui/utils';
import { SmallFont } from '@repo/ui/styles';
import { usePaymentForm } from '../../hooks/payment/usePayment';

interface PayConfirmProps {
  addressData: string;
  addAmount: number;
  method: 'CARD' | 'VBANK';
  onConfirmPayment: () => void;
  isLoading: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentModal = ({
  addressData,
  addAmount,
  method,
  setIsModalOpen,
  onConfirmPayment,
  setShowLoading,
}: Omit<PayConfirmProps, 'isLoading'>) => {
  const {} = usePaymentForm({
    addressData,
    addAmount,
    setShowLoading,
    setIsModalOpen,
  });

  return (
    <Modal isOpen={true} onClose={() => setIsModalOpen(false)}>
      <div className="flex flex-col p-5 gap-5">
        <div className="text-center flex flex-col gap-[10px]">
          {method === 'CARD' ? (
            <>
              <BoldBigText>카드 결제</BoldBigText>
              <SmallFont>사전에 등록된 결제 정보를 가져왔습니다.</SmallFont>
              <BoldText>
                {formatPrice(String(addAmount))}원을 정말로 결제하시겠습니까?
              </BoldText>
            </>
          ) : (
            <>
              <BoldBigText>계좌 이체</BoldBigText>
              <SmallFont>사전에 등록된 결제 정보를 가져왔습니다.</SmallFont>
              <BoldText>
                {formatPrice(String(addAmount))}원을 정말로 이체하시겠습니까?
              </BoldText>
            </>
          )}
        </div>
        <div className="flex gap-[20px] justify-center">
          <MainButton
            label="아니오"
            width="w-[200px]"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          />
          <MainButton label="예" width="w-[200px]" onClick={onConfirmPayment} />
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
