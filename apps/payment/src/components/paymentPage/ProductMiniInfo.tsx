import { FlexColsm } from '../styles/layout.style';
import { BoldBigText } from '../styles/text.style';
import {
  ProductInfo,
  ProductImg,
  Title,
} from '../styles/paymentPage/Productinfo.style';
import { productData } from '../productPage/ProductInfo';

const ProductMiniInfo = () => {
  return (
    <ProductInfo>
      <ProductImg
        src="https://imgnews.pstatic.net/image/094/2025/06/25/0000012740_001_20250625075019738.jpg?type=w860"
        alt="대표 이미지"
      />
      <FlexColsm className="items-start justify-start">
        <Title>{productData.title}</Title>
        <BoldBigText>{productData['모인 금액']}</BoldBigText>
      </FlexColsm>
    </ProductInfo>
  );
};

export default ProductMiniInfo;
