import {
  Bottom,
  BottomItems,
  Divide,
  KeyP,
  Top,
  ValueP,
  Wrapper,
} from '../styles/product-detail/productInfo.style';
import useQueryString from '../../hooks/useQueryString';
import ProductIconBox from './ProductIconBox';

// TODO : 화면 구상용 더미 데이터

export interface ProductDataProps {
  [key: string]: string;
}

export const productData: ProductDataProps = {
  title: '3D 미니 프런터기기',
  '모인 금액': '1,556,900원',
  '남은 시간': '8일',
  후원자: '10명',
};

export const productPaymentData: ProductDataProps = {
  '목표 금액': '500,000원',
  '펀딩 기간': '2025.06.17 ~ 2025.08.20',
  결제: '2025.08.20에 결제 진행',
  '예상 발송 및 시작일': '2025.08.20',
};

const ProductInfo = () => {
  useQueryString(productData.title);

  return (
    <Wrapper>
      <Top>
        {Object.entries(productData).map(([key, value]) => (
          <Top key={key}>
            {key !== 'title' && <KeyP>{key}</KeyP>}
            <ValueP $ishas={key === 'title'}>{value}</ValueP>
          </Top>
        ))}
      </Top>
      <Divide />
      <Bottom>
        {Object.entries(productPaymentData).map(([key, value]) => (
          <BottomItems key={key}>
            <div className="w-[140px]">
              <KeyP className="text-left">{key}</KeyP>
            </div>
            <ValueP className="mb-0">{value}</ValueP>
          </BottomItems>
        ))}
        <ProductIconBox />
      </Bottom>
    </Wrapper>
  );
};

export default ProductInfo;
