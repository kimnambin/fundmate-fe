import PaymentListData from '../components/payment-list/PaymentListData';
import PaymentListTop from '../components/payment-list/PaymentListTop';
import { FlexCol } from '../components/styles/layout.style';

const PaymentListPage = () => {
  return (
    <FlexCol className="w-full px-6 sm:px-0 sm:w-[60%] mx-auto items-start gap-8">
      <PaymentListTop />
      <PaymentListData />
    </FlexCol>
  );
};

export default PaymentListPage;
