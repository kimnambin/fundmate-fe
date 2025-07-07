import ProductImg from '../components/productPage/ProductImg';
import ProductInfo from '../components/productPage/ProductInfo';
import ProductDetail from '../components/product-detail/ProductDetail';
import { FlexCol, FlexItem, FlexRow } from '../components/styles/layout.style';
import ProductIconBox from '../components/productPage/ProductIconBox';
import { useIsMobile } from '../hooks/useMobile';
import FundDetailMobile from '../components/mobile/MbProduct';

function ProductPage() {
  const isMobile = useIsMobile();
  return (
    <FlexCol className="px-auto sm:px-[120px]">
      {!isMobile ? (
        <>
          <FlexRow className="items-start">
            <FlexItem>
              <ProductImg />
            </FlexItem>
            <FlexItem>
              <ProductInfo />
            </FlexItem>
          </FlexRow>
          <ProductDetail />
        </>
      ) : (
        <>
          <FundDetailMobile />
          <ProductDetail />
          <ProductIconBox />
        </>
      )}
    </FlexCol>
  );
}

export default ProductPage;
