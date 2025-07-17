import { ProductDetail } from '../../types/product';
import { formatDate } from '../../utils/date';
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

interface Props {
  data: ProductDetail | undefined;
  projectId: string;
}

const ProductInfo = ({ data, projectId }: Props) => {
  if (!data) return;

  return (
    <Wrapper>
      <Top>
        <Top>
          <ValueP>{data.project.title}</ValueP>
        </Top>
        <Top>
          <KeyP>모인 금액</KeyP>
          <ValueP>{data.project.current_price.toLocaleString()}원</ValueP>
        </Top>
        <Top>
          <KeyP>남은 시간</KeyP>
          <ValueP>{data.project.remaining_day}일</ValueP>
        </Top>
        <Top>
          <KeyP>후원자</KeyP>
          {/* 후원자 수가 없으면 0 등으로 표시 */}
          <ValueP>{/* 후원자 수를 넣어주세요 */}0명</ValueP>
        </Top>
      </Top>
      <Divide />
      <Bottom>
        <BottomItems>
          <div className="w-[140px]">
            <KeyP className="text-left">목표 금액</KeyP>
          </div>
          <ValueP className="mb-0">
            {data.project.goal_amount.toLocaleString()}원
          </ValueP>
        </BottomItems>

        <BottomItems>
          <div className="w-[140px]">
            <KeyP className="text-left">펀딩 기간</KeyP>
          </div>
          <ValueP className="mb-0">
            {formatDate(data.project.start_date)} ~{' '}
            {formatDate(data.project.end_date)}
          </ValueP>
        </BottomItems>

        <BottomItems>
          <div className="w-[140px]">
            <KeyP className="text-left">결제 예정일</KeyP>
          </div>
          <ValueP className="mb-0">
            {formatDate(data.project.end_date, 1)}에 결제 진행
          </ValueP>
        </BottomItems>

        <BottomItems>
          <div className="w-[140px]">
            <KeyP className="text-left">예상 발송 및 시작일</KeyP>
          </div>
          <ValueP className="mb-0">
            {formatDate(data.project.delivery_date)}
          </ValueP>
        </BottomItems>

        <ProductIconBox projectId={projectId} />
      </Bottom>
    </Wrapper>
  );
};

export default ProductInfo;
