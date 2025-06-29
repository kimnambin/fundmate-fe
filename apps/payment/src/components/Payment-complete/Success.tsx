import { Container, FlexColsm, FlexRowsm } from '../styles/flex.style';
import { BaseText, BoldBigText } from '../styles/text.style';

const Success = () => {
  return (
    <Container className="mt-[10%]">
      <FlexColsm>
        <BoldBigText className="mainTextColor">축하합니다. 12번째</BoldBigText>
        <BoldBigText>공식 후원자가 되셨습니다!</BoldBigText>
        <FlexRowsm>
          <BaseText className="mt-6">
            * 후원 내역 변경은{' '}
            <a className="mainTextColor underline">후원상세</a>에서 하실 수
            있습니다.
          </BaseText>
        </FlexRowsm>
      </FlexColsm>
    </Container>
  );
};

export default Success;
