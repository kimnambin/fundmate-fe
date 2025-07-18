import { productData, productPaymentData } from '../productPage/ProductInfo';
import {
  BottomItems,
  KeyP,
  ValueP,
} from '../styles/product-detail/productInfo.style';

export default function FundDetailMobile() {
  return (
    <div className="max-w-md mx-auto bg-white px-6">
      <img
        src="https://imgnews.pstatic.net/image/094/2025/06/25/0000012740_001_20250625075019738.jpg?type=w860"
        alt="상품 이미지"
        className="bg-gray-200 h-60 w-full rounded-md"
      />

      <div className="p-0 w-full">
        {Object.entries(productData).map(([key, value]) => (
          <div key={key} className={key === 'title' ? 'mb-8' : ''}>
            {key === 'title' ? (
              <h1 className="text-lg font-semibold leading-snug">{value}</h1>
            ) : null}
          </div>
        ))}

        <div className="flex justify-between mt-8 text-sm">
          {Object.entries(productData).map(([key, value]) =>
            key !== 'title' ? (
              <div key={key}>
                <p className="text-gray-500">{key}</p>
                <p className="font-bold text-xl">{value}</p>
              </div>
            ) : null
          )}
        </div>
      </div>

      <div className="text-sm text-gray-700 mt-8">
        {Object.entries(productPaymentData).map(([key, value]) => (
          <BottomItems key={key} className="flex">
            <div className="w-32">
              <KeyP className="text-left font-bold w-32">{key}</KeyP>
            </div>
            <ValueP className="text-xs">{value}</ValueP>
          </BottomItems>
        ))}
      </div>
    </div>
  );
}
