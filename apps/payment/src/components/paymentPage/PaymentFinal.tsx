import { useState } from 'react';
import CardPaymentModal from '../modal/CardPaymentModal';
import TransferModal from '../modal/TransferModal';
import { BoxCol, BoxRow, FlexColsm } from '../styles/layout.style';
import { Radio } from '../styles/paymentPage/Address.style';
import { BaseText, BoldText, LightColor } from '../styles/text.style';
import Address from './Address';
import { formatPrice } from '@repo/ui/utils';
import { Loading, MainButton } from '@repo/ui/components';
import { ModalContainer } from '../styles/modal/modal.style';

interface PaymentFinalProps {
  selectedPayment: string;
  addAmount: number;
}

const PaymentFinal: React.FC<PaymentFinalProps> = ({
  selectedPayment,
  addAmount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>('');
  const [addressData, setAddressData] = useState('');
  const [checks, setChecks] = useState([false, false]);
  const [showLoading, setShowLoading] = useState(false);

  const handleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const handleBtn = () => {
    if (selectedPayment === 'BANK') {
      setModalType('BANK');
    } else if (selectedPayment === 'CARD') {
      setModalType('CARD');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  return (
    <>
      {showLoading && (
        <ModalContainer>
          <Loading />
        </ModalContainer>
      )}

      {selectedPayment && <Address setAddressData={setAddressData} />}
      <BoxRow className="justify-between p-5 my-4 sm:my-7">
        <LightColor className="bg-none">최종 후원 금액</LightColor>
        <BoldText>{formatPrice(String(addAmount))}원</BoldText>
        {addAmount < 1000 && (
          <span className="text-red-500 text-sm">
            최소 1,000원 이상 후원해주세요.
          </span>
        )}
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
        className={`ml-0 mt-4 w-full px-6 py-3 ${addAmount < 1000 || !addressData || modalType || !checks[0] || !checks[1] ? 'bg-gray-400 cursor-not-allowed' : ''} hover:opacity-100`}
        disabled={addAmount < 1000 || !addressData || !checks[0] || !checks[1]}
        textSize={'text-base'}
        textWeight={'font-bold'}
        onClick={handleBtn}
      />

      {isModalOpen &&
        (modalType === 'BANK' ? (
          <TransferModal
            addAmount={addAmount}
            addressData={addressData}
            method="BANK"
            setIsModalOpen={handleCloseModal}
            setShowLoading={setShowLoading}
          />
        ) : (
          <CardPaymentModal
            addAmount={addAmount}
            addressData={addressData}
            method="CARD"
            setIsModalOpen={handleCloseModal}
            setShowLoading={setShowLoading}
          />
        ))}
    </>
  );
};

export default PaymentFinal;
