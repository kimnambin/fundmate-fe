import { useSearchParams } from 'react-router-dom';
import FundDetailMobile from '../components/mobile/MbProduct';
import ProductDetail from '../components/product-detail/PDLeft';
import ProductIconBox from '../components/productPage/ProductIconBox';
import ProductImg from '../components/productPage/ProductImg';
import ProductInfo from '../components/productPage/ProductInfo';
import { FlexCol, FlexItem, FlexRow } from '../components/styles/layout.style';
import { useIsMobile } from '../hooks/useMobile';
import { useGetProductDetail } from '../hooks/useProduct';

function ProductPage() {
  const isMobile = useIsMobile();

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');

  const { data } = useGetProductDetail(projectId!);

  if (!projectId) return;
  return (
    <FlexCol className="px-auto sm:px-[120px]">
      {!isMobile ? (
        <>
          <FlexRow className="items-start">
            <FlexItem>
              <ProductImg />
            </FlexItem>
            <FlexItem>
              <ProductInfo data={data} projectId={projectId} />
            </FlexItem>
          </FlexRow>
          <ProductDetail />
        </>
      ) : (
        <>
          <FundDetailMobile data={data} />
          <ProductDetail />
          <ProductIconBox projectId={projectId} />
        </>
      )}
    </FlexCol>
  );
}

export default ProductPage;
