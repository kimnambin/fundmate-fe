import PaymentListData from '../components/payment-list/PaymentListData';
import PaymentListTop from '../components/payment-list/PaymentListTop';
import { FlexCol } from '../components/styles/flex.style';

const PaymentListPage = () => {
  return (
    <FlexCol className="w-[60%] mx-auto items-start gap-8">
      <PaymentListTop />
      <PaymentListData />
    </FlexCol>
  );
};

export default PaymentListPage;
