import tw from 'tailwind-styled-components';
import ProductImg from '../components/product-check/ProductImg';
import ProductInfo from '../components/product-check/ProductInfo';
import ProductDetail from '../components/product-check/product-detail/ProductDetail';

function ProductPage() {
  return (
    <Wrapper>
      <Container>
        <FlexItem>
          <ProductImg />
        </FlexItem>
        <FlexItem>
          <ProductInfo />
        </FlexItem>
      </Container>
      <ProductDetail />
    </Wrapper>
  );
}

const Wrapper = tw.div`
    flex
    flex-col
    items-center
    w-full
    h-full
`;

const Container = tw.div`
    flex
    flex-row
    items-center
    justify-center
    w-full
    h-full
    mt-9
`;

const FlexItem = tw.div`
    w-1/2
    h-full
`;

export default ProductPage;
