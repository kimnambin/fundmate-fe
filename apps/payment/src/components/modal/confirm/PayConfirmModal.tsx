import { MainButton } from '@repo/ui/components';
import { BoldBigText, BoldText } from '../../styles/text.style';
import { formatPrice } from '@repo/ui/utils';

interface PayConfirmProps {
  addAmount: number;
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmPayment: () => void;
  title: string;
  isLoading: boolean;
}

const PayConfirmModal = ({
  addAmount,
  setIsConfirmModalOpen,
  confirmPayment,
  title,
}: Omit<PayConfirmProps, 'isLoading'>) => {
  return (
    <div className="flex flex-col p-5 gap-5">
      <div className="text-center flex flex-col gap-[10px]">
        {title == 'card' ? (
          <>
            <BoldBigText>카드 결제</BoldBigText>
            <BoldText>
              {formatPrice(String(addAmount))}원을 정말로 결제하시겠습니까??
            </BoldText>
          </>
        ) : (
          <>
            <BoldBigText>계좌 이체</BoldBigText>
            <BoldText>
              {formatPrice(String(addAmount))}원을 정말로 이체하시겠습니까??
            </BoldText>
          </>
        )}
      </div>
      <div className="flex gap-[20px] justify-center">
        <MainButton
          label="아니오"
          width="w-[200px]"
          onClick={() => setIsConfirmModalOpen(false)}
        />
        <MainButton
          label="예"
          width="w-[200px]"
          onClick={() => confirmPayment()}
        />
      </div>
    </div>
  );
};

export default PayConfirmModal;
