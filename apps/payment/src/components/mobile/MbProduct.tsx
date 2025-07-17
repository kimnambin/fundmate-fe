import { ProductDetail } from '../../types/product';
import { formatDate } from '../../utils/date';
import {
  BottomItems,
  KeyP,
  ValueP,
} from '../styles/product-detail/productInfo.style';

interface Props {
  data: ProductDetail | undefined;
}

export default function FundDetailMobile({ data }: Props) {
  if (!data) return;
  return (
    <div className="max-w-md mx-auto bg-white px-6">
      <img
        src="https://imgnews.pstatic.net/image/094/2025/06/25/0000012740_001_20250625075019738.jpg?type=w860"
        alt="상품 이미지"
        className="bg-gray-200 h-60 w-full rounded-md"
      />

      <div className="p-0 w-full">
        <h1 className="mb-8 text-lg font-semibold leading-snug">
          {data.project.title}
        </h1>

        <div className="flex justify-between mt-8 text-sm">
          <div>
            <p className="text-gray-500">모인 금액</p>
            <p className="font-bold text-xl">
              {data.project.current_price.toLocaleString()}원
            </p>
          </div>
          <div>
            <p className="text-gray-500">남은 시간</p>
            <p className="font-bold text-xl">{data.project.remaining_day}일</p>
          </div>
          <div>
            <p className="text-gray-500">목표 금액</p>
            <p className="font-bold text-xl">
              {data.project.goal_amount.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-700 mt-8">
        <BottomItems className="flex">
          <div className="w-32">
            <KeyP className="text-left font-bold w-32">펀딩 기간</KeyP>
          </div>
          <ValueP className="text-xs">
            {formatDate(data.project.start_date)} ~{' '}
            {formatDate(data.project.end_date)}
          </ValueP>
        </BottomItems>

        <BottomItems className="flex">
          <div className="w-32">
            <KeyP className="text-left font-bold w-32">결제 예정일</KeyP>
          </div>
          <ValueP className="text-xs">
            {formatDate(data.project.end_date, 1)}
          </ValueP>
        </BottomItems>

        <BottomItems className="flex">
          <div className="w-32">
            <KeyP className="text-left font-bold w-32">설명</KeyP>
          </div>
          <ValueP className="text-xs">{data.project.description}</ValueP>
        </BottomItems>
      </div>
    </div>
  );
}
