import { useState } from 'react';
import PayModal from '../modal/PayModal';
import TransferModal from '../modal/TransferModal';
import { BoxCol, BoxRow, FlexColsm } from '../styles/flex.style';
import { Radio } from '../styles/paymentPage/Adress.style';
import { BaseButton } from '../styles/product-detail/productInfo.style';
import { BaseText, BoldText, LightColor } from '../styles/text.style';
import Adress from './Adress';
import { formatNum } from '../../utils/numbers';

interface PaymentFinalProps {
  selectedPayment: string;
  addAmount: number;
}

const PaymentFinal: React.FC<PaymentFinalProps> = ({
  selectedPayment,
  addAmount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'transfer' | 'pay' | null>(null);

  const [checks, setChecks] = useState([false, false]);

  const handleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const handleBtn = () => {
    if (selectedPayment === 'transfer') {
      setModalType('transfer');
    } else if (selectedPayment === 'card') {
      setModalType('pay');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  return (
    <>
      {selectedPayment && <Adress />}
      <BoxRow className="justify-between p-5 my-7">
        <LightColor className="bg-none">최종 후원 금액</LightColor>
        <BoldText>{formatNum(addAmount)}원</BoldText>
      </BoxRow>
      <BoxCol className="items-start border-2 border-dashed border-[#9747FF]">
        <Radio className="mt-3">
          <input
            type="checkbox"
            value="check1"
            className="text-main"
            checked={checks[0]}
            onChange={() => handleCheck(0)}
          />
          <BaseText>Accept terms andditon</BaseText>
        </Radio>
        <Radio className="items-center justify-start my-3">
          <input
            type="checkbox"
            value="check2"
            className="text-main"
            checked={checks[1]}
            onChange={() => handleCheck(1)}
          />
          <FlexColsm className="justify-start items-start">
            <BaseText>Accept terms andditon</BaseText>
            <LightColor className="text-xs">
              You agree to our Terms of Service and Privacy Policy.
            </LightColor>
          </FlexColsm>
        </Radio>
      </BoxCol>
      <BaseButton
        className={`ml-0 mt-4 ${modalType || !checks[0] || !checks[1] ? 'bg-gray-400' : 'ml-0 mt-4'}`}
        disabled={modalType || !checks[0] || !checks[1]}
        onClick={handleBtn}
      >
        후원하기
      </BaseButton>

      {isModalOpen &&
        (modalType === 'transfer' ? (
          <TransferModal
            addAmount={addAmount}
            setIsModalOpen={handleCloseModal}
          />
        ) : (
          <PayModal addAmount={addAmount} setIsModalOpen={handleCloseModal} />
        ))}
    </>
  );
};

export default PaymentFinal;
