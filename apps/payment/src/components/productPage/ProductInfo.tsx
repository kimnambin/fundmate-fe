import { formatPrice } from '@repo/ui/utils';
import {
  Bottom,
  BottomItems,
  Divide,
  KeyP,
  Top,
  ValueP,
  Wrapper,
} from '../styles/product-detail/productInfo.style';
import ProductIconBox from './ProductIconBox';
import { formatDate } from '../../utils/date';

// TODO : 화면 구상용 더미 데이터

export const productData = ['모인 금액', '남은 시간'];

export const productPaymentData = [
  '목표 금액',
  '펀딩 기간',
  '결제',
  '예상 발송 및 시작일',
];

interface ProductInfoProps {
  title: string;
  currentPrice: number;
  remainingDay: number;
  goalAmount: number;
  startDate: string;
  endDate: string;
  deliveryDate: string;
  description: string;
  projectId?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  currentPrice,
  remainingDay,
  goalAmount,
  startDate,
  endDate,
  deliveryDate,
  projectId,
}) => {
  return (
    <Wrapper>
      <Top>
        <ValueP>{title}</ValueP>
        {productData.map((key, index) => (
          <Top key={key}>
            {key !== 'title' && <KeyP>{key}</KeyP>}
            <ValueP $ishas={key === 'title'}>
              {index === 0 && `${formatPrice(String(currentPrice))}원`}
              {index === 1 && `${remainingDay}일`}
            </ValueP>
          </Top>
        ))}
      </Top>
      <Divide />
      <Bottom>
        {productPaymentData.map((key, index) => (
          <BottomItems key={key}>
            <div className="w-[140px]">
              <KeyP className="text-left">{key}</KeyP>
            </div>
            <ValueP className="mb-0">
              {index === 0 && `${formatPrice(String(goalAmount))}원`}
              {index === 1 && formatDate(startDate)}
              {index === 2 && formatDate(endDate)}
              {index === 3 && formatDate(deliveryDate)}
            </ValueP>
          </BottomItems>
        ))}
        <ProductIconBox projectId={projectId} />
      </Bottom>
    </Wrapper>
  );
};

export default ProductInfo;
