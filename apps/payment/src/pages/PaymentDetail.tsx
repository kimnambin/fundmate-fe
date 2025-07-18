import PaymentDetailBottom from '../components/payment-detail/PaymentDetailBottom';
import PaymentDetailBox from '../components/payment-detail/PaymentDetailBox';
import PaymentDetailMid from '../components/payment-detail/PaymentDetailMid';
import PaymentDetailTop from '../components/payment-detail/PaymentDetailTop';
import { FlexCol } from '../components/styles/layout.style';
import { useCheckPayment } from '../hooks/payment/useCheckPayment';
import { useGetPayment } from '../hooks/payment/useGetPayment';
import { useGetSavePayment } from '../hooks/payment/useGetSavePayment';
import { useGetProductInfo } from '../hooks/product/getProductInfo';
import { useGetiInsertedId } from '../hooks/useGetiInsertedId';
import { useGetQueryString } from '../hooks/useGetQueryString';
import { useGetUserInfo } from '../hooks/user/useGetUserInfo';

const PaymentDetail = () => {
  const id = useGetiInsertedId();
  const { data: paymentData } = useGetPayment(Number(id));
  const { data: userInfo } = useGetUserInfo();
  const { data: paymentSaveId } = useCheckPayment(Number(userInfo?.userId));
  const { data: savePaymentData } = useGetSavePayment(Number(paymentSaveId));

  const projectId = useGetQueryString();

  const { data: productData } = useGetProductInfo(Number(projectId));

  return (
    <FlexCol className="w-full px-6 sm:px-0 sm:w-[70%] mx-auto items-start">
      <PaymentDetailTop />
      <PaymentDetailBox
        paymentInfoId={paymentData?.paymentInfoId || 0}
        createdAt={paymentData?.createdAt || ''}
        scheduleDate={paymentData?.scheduleDate || ''}
      />
      <PaymentDetailMid price={productData?.options[0].price || 1000} />
      <PaymentDetailBottom
        code={savePaymentData?.code || '알수 없음'}
        amount={productData?.options[0].price || 1000}
        scheduleDate={paymentData?.scheduleDate || ''}
      />
    </FlexCol>
  );
};

export default PaymentDetail;
