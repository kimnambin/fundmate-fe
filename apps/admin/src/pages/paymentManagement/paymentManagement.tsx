import PaymentSummary from './paymentSummary';
import PaymentList from './paymentList';
import { Title } from '@repo/ui/styles';

const PaymentManagement = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Title>결제 관리</Title>
      <PaymentSummary />
      <PaymentList />
    </div>
  );
};

export default PaymentManagement;
