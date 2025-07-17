import { useSearchParams } from 'react-router-dom';
import FundDetailMobile from '../components/mobile/MbProduct';
import ProductDetail from '../components/product-detail/PDLeft';
import ProductIconBox from '../components/productPage/ProductIconBox';
import ProductImg from '../components/productPage/ProductImg';
import ProductInfo from '../components/productPage/ProductInfo';
import { FlexCol, FlexItem, FlexRow } from '../components/styles/layout.style';
import { useIsMobile } from '../hooks/useMobile';
import { useGetProductDetail } from '../hooks/useProduct';
import { useEffect } from 'react';
import { tempLogin } from '../api/tempLogin.api';

function ProductPage() {
  // 로그인 임시 연동 코드
  useEffect(() => {
    const autoLogin = async () => {
      try {
        await tempLogin('g@mail.com', 'zzz111');
        console.log('임시 로그인');
      } catch (err) {
        console.log('로그인 실패: ', err);
      }
    };
    autoLogin();
  }, []);

  const isMobile = useIsMobile();

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');

  const { data } = useGetProductDetail(projectId!);

  if (!projectId || !data) return;
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
          <ProductIconBox projectId={projectId} likes={data.project.likes} />
        </>
      )}
    </FlexCol>
  );
}

export default ProductPage;
