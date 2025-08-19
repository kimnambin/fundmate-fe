import { FlexColsm } from '../styles/layout.style';
import { BoldBigText } from '../styles/text.style';
import {
  ProductInfo,
  ProductImg,
  Title,
} from '../styles/paymentPage/Productinfo.style';
import { UserDefault } from '@repo/ui/assets';
// import { useGetQueryString } from '../../hooks/useGetQueryString';
// // import { useTmpLogin } from '../../hooks/user/useTmp';
// import { useGetProductInfo } from '../../hooks/product/getProductInfo';

interface ProductMiniInfoProps {
  title: string;
  imgUrl: string;
}

const ProductMiniInfo = ({ title, imgUrl }: ProductMiniInfoProps) => {
  // const projectId = useGetQueryString();

  // useTmpLogin();
  // const { data: productData } = useGetProductInfo(Number(projectId));
  return (
    <ProductInfo>
      <ProductImg src={imgUrl ? imgUrl : UserDefault} alt="대표 이미지" />
      <FlexColsm className="items-start justify-start">
        <Title>{title}</Title>
        <BoldBigText>후원 정보</BoldBigText>
      </FlexColsm>
    </ProductInfo>
  );
};

export default ProductMiniInfo;
