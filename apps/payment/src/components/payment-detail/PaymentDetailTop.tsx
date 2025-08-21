import useMockData from '../../hooks/mock/useMockData';
import {
  ProductImg,
  ProductInfo,
  Title,
} from '../styles/paymentPage/Productinfo.style';
import { FlexColsm } from '../styles/layout.style';
import { BoldBigText } from '../styles/text.style';
import { formatPrice } from '@repo/ui/utils';

const PaymentDetailTop = () => {
  const { productData } = useMockData();

  return (
    <ProductInfo>
      <ProductImg src={productData?.image_url} alt="대표 이미지" />
      <FlexColsm className="items-start justify-start">
        <Title>{productData?.title}</Title>
        <BoldBigText>
          목표 금액 : {formatPrice(String(productData?.goal_amount))}원
        </BoldBigText>
      </FlexColsm>
    </ProductInfo>
  );
};

export default PaymentDetailTop;
