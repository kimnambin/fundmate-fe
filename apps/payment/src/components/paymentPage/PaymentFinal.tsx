import { useState } from 'react';
import PayModal from '../modal/PayModal';
import TransferModal from '../modal/TransferModal';
import { BoxCol, BoxRow, FlexColsm } from '../styles/layout.style';
import { Radio } from '../styles/paymentPage/Address.style';
import { BaseText, BoldText, LightColor } from '../styles/text.style';
import Address from './Address';
import { formatNum } from '../../utils/numbers';
import { MainButton } from '@repo/ui/components';

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
  const [addressData, setAddressData] = useState('');

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
      {selectedPayment && <Address setAddressData={setAddressData} />}
      <BoxRow className="justify-between p-5 my-4 sm:my-7">
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
      <MainButton
        label="후원하기"
        className={`ml-0 mt-4 w-full px-6 py-3 ${!addressData || modalType || !checks[0] || !checks[1] ? 'bg-gray-400' : ''} hover:opacity-100`}
        disabled={!addressData || !checks[0] || !checks[1]}
        textSize={'text-base'}
        textWeight={'font-bold'}
        onClick={handleBtn}
      />
      {isModalOpen &&
        (modalType === 'transfer' ? (
          <TransferModal
            addAmount={addAmount}
            addressData={addressData}
            setIsModalOpen={handleCloseModal}
          />
        ) : (
          <PayModal
            addAmount={addAmount}
            addressData={addressData}
            setIsModalOpen={handleCloseModal}
          />
        ))}
    </>
  );
};

export default PaymentFinal;
