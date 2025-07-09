import {
  Container,
  FlexColsm,
  FlexRowsm,
  GridCol6,
} from '../components/styles/layout.style';
import { BaseText, BoldBigText } from '../components/styles/text.style';
import { Link } from 'react-router-dom';
import { useGetQueryString } from '../hooks/useGetQueryString';
import { VerticalCard } from '@repo/ui/components';
import { Blank } from '../components/styles/product-detail/prdouctstyle.style';

const PaymentcompletedPage = () => {
  const url = useGetQueryString();

  return (
    <Container className="mt-[10%] px-6 items-start sm:px-0">
      <FlexColsm className="w-full">
        <BoldBigText className="text-main">축하합니다. 12번째</BoldBigText>
        <BoldBigText>공식 후원자가 되셨습니다!</BoldBigText>
        <FlexRowsm>
          <BaseText className="mt-6 text-xs sm:text-base">
            * 후원 내역 변경은{' '}
            <Link to={`/payment/detail/${url}`} className="text-main underline">
              후원상세
            </Link>
            에서 하실 수 있습니다.
          </BaseText>
        </FlexRowsm>
        <div className="mt-[15%] w-full">
          <BoldBigText className="pl-3 ml-3">
            이런 프로젝트도 좋아하실거에요
          </BoldBigText>

          <GridCol6 className="w-full">
            {Array.from({ length: 8 }).map((_, index) => {
              try {
                return <VerticalCard key={index} />;
              } catch (error) {
                console.error('Card 오류:', error);
                return <div key={index}>오류 발생</div>;
              }
            })}
          </GridCol6>
        </div>
        <Blank></Blank>
      </FlexColsm>
    </Container>
  );
};

export default PaymentcompletedPage;
