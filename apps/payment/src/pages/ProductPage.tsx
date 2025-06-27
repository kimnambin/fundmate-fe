import tw from 'tailwind-styled-components';
import ProductImg from '../components/product-check/ProductImg';
import ProductInfo from '../components/product-check/ProductInfo';
import ProductDetail from '../components/product-check/product-detail/ProductDetail';
import { FlexCol, FlexRow } from '../components/styles/flex';

function ProductPage({}) {
  return (
    <FlexCol>
      <FlexRow>
        <FlexItem>
          <ProductImg />
        </FlexItem>
        <FlexItem>
          <ProductInfo />
        </FlexItem>
      </FlexRow>
      <ProductDetail />
    </FlexCol>
  );
}

const FlexItem = tw.div`
    w-1/2
`;

export default ProductPage;
