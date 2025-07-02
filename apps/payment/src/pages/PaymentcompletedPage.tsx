import {
  Container,
  FlexColsm,
  FlexRowsm,
} from '../components/styles/flex.style';
import { BaseText, BoldBigText } from '../components/styles/text.style';
import { SafeLink } from '../components/feat/SafeLink';

const PaymentcompletedPage = () => {
  return (
    <Container className="mx-auto items-start">
      <FlexColsm>
        <BoldBigText className="text-main">축하합니다. 12번째</BoldBigText>
        <BoldBigText>공식 후원자가 되셨습니다!</BoldBigText>
        <FlexRowsm>
          <BaseText className="mt-6">
            * 후원 내역 변경은{' '}
            <SafeLink to="/payment-list" className="text-main underline">
              후원상세
            </SafeLink>
            에서 하실 수 있습니다.
          </BaseText>
        </FlexRowsm>
      </FlexColsm>
    </Container>
  );
};

export default PaymentcompletedPage;
