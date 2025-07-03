import {
  Container,
  FlexColsm,
  FlexRowsm,
} from '../components/styles/flex.style';
import { BaseText, BoldBigText } from '../components/styles/text.style';
import { Link } from 'react-router-dom';
import { useGetQueryString } from '../hooks/useGetQueryString';

const PaymentcompletedPage = () => {
  const url = useGetQueryString();
  return (
    <Container className="mt-[10%] items-start">
      <FlexColsm>
        <BoldBigText className="text-main">축하합니다. 12번째</BoldBigText>
        <BoldBigText>공식 후원자가 되셨습니다!</BoldBigText>
        <FlexRowsm>
          <BaseText className="mt-6">
            * 후원 내역 변경은{' '}
            <Link to={`/payment-detail/${url}`} className="text-main underline">
              후원상세
            </Link>
            에서 하실 수 있습니다.
          </BaseText>
        </FlexRowsm>
      </FlexColsm>
    </Container>
  );
};

export default PaymentcompletedPage;
