import { FlexColsm } from '../styles/layout.style';
import { BoldBigText } from '../styles/text.style';
import {
  ProductInfo,
  ProductImg,
  Title,
} from '../styles/paymentPage/Productinfo.style';
import { useGetQueryString } from '../../hooks/useGetQueryString';
import { useTmpLogin } from '../../hooks/user/useTmp';
import { useGetProductInfo } from '../../hooks/product/getProductInfo';

const ProductMiniInfo = () => {
  const projectId = useGetQueryString();

  useTmpLogin();
  const { data: productData } = useGetProductInfo(Number(projectId));
  return (
    <ProductInfo>
      <ProductImg
        src={`https://picsum.photos/id/${productData?.project.image_id}/300/200`}
        alt="대표 이미지"
      />
      <FlexColsm className="items-start justify-start">
        <Title>{productData?.project.title}</Title>
        <BoldBigText>후원 정보</BoldBigText>
      </FlexColsm>
    </ProductInfo>
  );
};

export default ProductMiniInfo;
