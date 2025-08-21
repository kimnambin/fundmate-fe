import { useEffect, useState } from 'react';
import CardPaymentModal from '../modal/CardPaymentModal';
import TransferModal from '../modal/TransferModal';
import { BoxCol, BoxRow, FlexColsm } from '../styles/layout.style';
import { Radio } from '../styles/paymentPage/Address.style';
import { BaseText, BoldText, LightColor } from '../styles/text.style';
import Address from './Address';
import { formatPrice } from '@repo/ui/utils';
import { Loading, MainButton } from '@repo/ui/components';
import { ModalContainer } from '../styles/modal/modal.style';
import PaymentModal from '../modal/PaymentModal';
import { usePaymentForm } from '../../hooks/payment/usePayment';
import {
  useGetoptionid,
  useGetQueryString,
} from '../../hooks/useGetQueryString';
// import { useGetProductInfo } from '../../hooks/product/getProductInfo';
import { useSavePaymentStore } from '../../store/useSavepaymentStore';
import { usePaymentStore } from '../../store/mock/mockPaymentStore';
import useMockStore from '../../store/mock/mockDataStore';
import { sevenWeeksLaterFormatted } from '../../utils/date';

interface PaymentFinalProps {
  selectedPayment: string;
  addAmount: number;
  setAddAmount: React.Dispatch<React.SetStateAction<number>>;
}

const PaymentFinal: React.FC<PaymentFinalProps> = ({
  selectedPayment,
  addAmount,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [addressData, setAddressData] = useState('');
  const [checks, setChecks] = useState([false, false]);
  const [showLoading, setShowLoading] = useState(false);
  const [savedPaymentId, setSavedPaymentId] = useState<number | null>(1);

  const handleCheck = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const handleBtn = async () => {
    if (addAmount < 1000 || !addressData || !checks[0] || !checks[1]) return;

    if (selectedPayment === 'VBANK') {
      setModalType('VBANK');
    } else if (selectedPayment === 'CARD') {
      setModalType('CARD');
    }

    setIsModalOpen(true);
  };

  const insertedId = useSavePaymentStore((state) => state.insertedId);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSavedPaymentId(null);
  };

  const projectId = useGetQueryString();
  // const { data: productData } = useGetProductInfo(Number(projectId));

  const { productData } = useMockStore();

  const optionid = useGetoptionid();

  useEffect(() => {
    if (insertedId !== null) {
      console.log('정상적으로 insertedId 반영됨:', insertedId);

      reservePayment();
    }
  }, [savedPaymentId]);

  const { savedPayment } = usePaymentStore();

  const { reservePayment } = usePaymentForm({
    paymentInfoId: Number(savedPaymentId),
    rewardId: Number(optionid) ?? null,
    projectId: Number(projectId) ?? null,
    amount: addAmount,
    totalAmount: productData?.goal_amount ?? 0,
    scheduleDate: sevenWeeksLaterFormatted() ?? '',
    address: addressData,
    setShowLoading,
    setIsModalOpen,
    method: selectedPayment ?? '알수없음',
  });

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
            checked={checks[0]}
            onChange={() => handleCheck(0)}
          />
          <BaseText>Accept terms andditon</BaseText>
        </Radio>
        <Radio className="items-center justify-start my-3">
          <input
            type="checkbox"
            value="check2"
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
        className={`ml-0 mt-4 w-full px-6 py-3 ${
          addAmount < 1000 ||
          !addressData ||
          modalType ||
          !checks[0] ||
          !checks[1]
            ? 'bg-gray-400 cursor-not-allowed'
            : ''
        } hover:opacity-100`}
        disabled={addAmount < 1000 || !addressData || !checks[0] || !checks[1]}
        textSize={'text-base'}
        textWeight={'font-bold'}
        onClick={handleBtn}
      />

      {isModalOpen &&
        modalType &&
        (savedPayment ? (
          <PaymentModal
            addressData={addressData}
            addAmount={addAmount}
            method={modalType === 'CARD' ? 'CARD' : 'VBANK'}
            onConfirmPayment={() => reservePayment()}
            setIsModalOpen={handleCloseModal}
            setShowLoading={setShowLoading}
          />
        ) : modalType === 'VBANK' ? (
          <TransferModal
            addressData={addressData}
            method="VBANK"
            setIsModalOpen={handleCloseModal}
            setShowLoading={setShowLoading}
            setSavedPaymentId={setSavedPaymentId}
          />
        ) : (
          <CardPaymentModal
            addressData={addressData}
            method="CARD"
            setIsModalOpen={handleCloseModal}
            setShowLoading={setShowLoading}
            setSavedPaymentId={setSavedPaymentId}
          />
        ))}
    </>
  );
};

export default PaymentFinal;
