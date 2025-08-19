import { formatPrice } from '@repo/ui/utils';
import {
  ProductInfoProps,
  productPaymentData,
} from '../productPage/ProductInfo';
import {
  BottomItems,
  KeyP,
  ValueP,
} from '../styles/product-detail/ProductInfo.style';

interface FundDetailMobileProps extends ProductInfoProps {
  img_url?: string;
}

export const FundDetailMobile: React.FC<FundDetailMobileProps> = ({
  title,
  currentPrice,
  goalAmount,
  startDate,
  endDate,
  deliveryDate,
  img_url,
}) => {
  const mockProductData = [
    formatPrice(String(goalAmount)),
    startDate,
    endDate,
    `${deliveryDate}일 후`,
  ];

  return (
    <div className="max-w-md mx-auto bg-white px-6 ">
      <img
        src={img_url}
        alt="상품 이미지"
        className="bg-gray-200 h-60 w-full rounded-md"
      />

      <div className="p-0 w-full">
        <h1 className="text-lg font-semibold leading-snug mb-8">{title}</h1>

        <div className="flex justify-between mt-8 text-sm">
          <div>
            <p className="text-gray-500">현재 가격</p>
            <p className="font-bold text-xl">
              {formatPrice(String(currentPrice))}
            </p>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-700 mt-8">
        {productPaymentData.map((label, index) => (
          <BottomItems key={index} className="flex">
            <div className="w-32">
              <KeyP className="text-left font-bold">{label}</KeyP>
            </div>
            <ValueP className="text-xs mb-0 font-normal">
              {mockProductData[index]}
            </ValueP>
          </BottomItems>
        ))}
      </div>
    </div>
  );
};
