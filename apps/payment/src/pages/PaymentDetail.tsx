import PaymentDetailBottom from '../components/payment-detail/PaymentDetailBottom';
import PaymentDetailBox from '../components/payment-detail/PaymentDetailBox';
import PaymentDetailMid from '../components/payment-detail/PaymentDetailMid';
import PaymentDetailTop from '../components/payment-detail/PaymentDetailTop';
import { FlexCol } from '../components/styles/layout.style';
import { useCheckPayment } from '../hooks/payment/useCheckPayment';
import { useGetPayment } from '../hooks/payment/useGetPayment';
import { useGetSavePayment } from '../hooks/payment/save/useGetSavePayment';
import { useGetProductInfo } from '../hooks/product/getProductInfo';
import { useGetiInsertedId } from '../hooks/useGetiInsertedId';
import { useGetQueryString } from '../hooks/useGetQueryString';
import { useGetUserInfo } from '../hooks/user/useGetUserInfo';
import { useState } from 'react';
import { Layout } from '@repo/ui/styles';

const PaymentDetail = () => {
  const id = useGetiInsertedId();
  const { data: paymentData, error } = useGetPayment(Number(id));
  const { data: userInfo } = useGetUserInfo();
  const { data: paymentSaveId } = useCheckPayment(Number(userInfo?.userId));
  const { data: savePaymentData } = useGetSavePayment(Number(paymentSaveId));

  const projectId = useGetQueryString();

  const { data: productData } = useGetProductInfo(Number(projectId));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (error) {
    <Layout>
      <p>페이지를 찾을 수 없습니다</p>
    </Layout>;
  }

  return (
    <FlexCol className="w-full px-6 sm:px-0 sm:w-[70%] mx-auto items-start">
      <PaymentDetailTop />
      <PaymentDetailBox
        paymentInfoId={paymentData?.paymentInfoId || 0}
        createdAt={paymentData?.createdAt || ''}
        scheduleDate={paymentData?.scheduleDate || ''}
      />
      <PaymentDetailMid
        price={productData?.options[0].price || 1000}
        isOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
        onClose={handleCloseModal}
        scheduleDate={paymentData?.scheduleDate || ''}
        address={paymentData?.address || ''}
        addressNumber={paymentData?.addressNumber || 0}
        addressInfo={paymentData?.addressInfo || ''}
      />
      <PaymentDetailBottom
        code={savePaymentData?.data?.code || '알수 없음'}
        amount={productData?.options[0].price || 1000}
        scheduleDate={paymentData?.scheduleDate || ''}
      />
    </FlexCol>
  );
};

export default PaymentDetail;
