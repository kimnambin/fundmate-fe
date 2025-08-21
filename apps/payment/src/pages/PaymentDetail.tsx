import PaymentDetailBottom from '../components/payment-detail/PaymentDetailBottom';
import PaymentDetailBox from '../components/payment-detail/PaymentDetailBox';
import PaymentDetailMid from '../components/payment-detail/PaymentDetailMid';
import PaymentDetailTop from '../components/payment-detail/PaymentDetailTop';
import { FlexCol } from '../components/styles/layout.style';
// import { useCheckPayment } from '../hooks/payment/useCheckPayment';
// import { useGetPayment } from '../hooks/payment/useGetPayment';
// import { useGetSavePayment } from '../hooks/payment/save/useGetSavePayment';
// import { useGetUserInfo } from '../hooks/user/useGetUserInfo';
// import { useGetProductInfo } from '../hooks/product/getProductInfo';
// import { useGetiInsertedId } from '../hooks/useGetiInsertedId';
// import { useGetQueryString } from '../hooks/useGetQueryString';
import { useState } from 'react';
import { usePaymentStore } from '../store/mock/mockPaymentStore';
import useMockData from '../hooks/mock/useMockData';
import { sevenWeeksLaterFormatted, todayDateFormatted } from '../utils/date';
import { NotFound } from '@repo/ui/components';

const PaymentDetail = () => {
  // const id = useGetiInsertedId();
  // const { data: paymentData, error } = useGetPayment(Number(id));
  // const { data: userInfo } = useGetUserInfo();
  // const { data: paymentSaveId } = useCheckPayment(Number(userInfo?.userId));
  // const { data: savePaymentData } = useGetSavePayment(Number(paymentSaveId));

  const savedPayment = usePaymentStore((state) => state.savedPayment);
  const { userData } = useMockData();

  // const projectId = useGetQueryString();

  // const { data: productData } = useGetProductInfo(Number(projectId));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!savedPayment) {
    return <NotFound />;
  }

  // TODO : 옵션 업그레이드 시 -> 다른 곳도 수정이 되야 할듯
  // 결제 취소 시 zustand에서도 삭제 되도록

  return (
    <FlexCol className="w-full px-6 sm:px-0 sm:w-[70%] mx-auto items-start">
      <PaymentDetailTop />
      <PaymentDetailBox
        paymentInfoId={savedPayment?.paymentInfoId || 123456}
        createdAt={todayDateFormatted() || ''}
        scheduleDate={`${sevenWeeksLaterFormatted()}후 결제` || ''}
      />
      <PaymentDetailMid
        price={userData?.options[0].price || 1000}
        isOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
        onClose={handleCloseModal}
        scheduleDate={`${sevenWeeksLaterFormatted()}일 남음` || ''}
        address={savedPayment?.address || ''}
        addressNumber={savedPayment?.addressNumber || 0}
        addressInfo={savedPayment?.addressInfo || ''}
        onUpdatePrice={() => {}}
      />
      <PaymentDetailBottom
        code={savedPayment?.method}
        amount={savedPayment?.amount || 1000}
        scheduleDate={sevenWeeksLaterFormatted() || ''}
      />
    </FlexCol>
  );
};

export default PaymentDetail;
