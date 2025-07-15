import { MainButton } from '@repo/ui/components';
import { BoldBigText, BoldText } from '../../styles/text.style';

interface PayConfirmProps {
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmPayment: () => void;
  title: string;
}

const PayConfirmModal = ({
  setIsConfirmModalOpen,
  confirmPayment,
  title,
}: PayConfirmProps) => {
  return (
    <div className="flex flex-col p-5 gap-5">
      <div className="text-center flex flex-col gap-[10px]">
        {title == 'card' ? (
          <>
            <BoldBigText>카드 결제</BoldBigText>
            <BoldText>결제 수단으로 등록하시겠습니까??</BoldText>
          </>
        ) : (
          <>
            <BoldBigText>계좌 이체</BoldBigText>
            <BoldText>결제 수단으로 등록하시겠습니까??</BoldText>
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
