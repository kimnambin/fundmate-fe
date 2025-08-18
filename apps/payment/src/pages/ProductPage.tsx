import ProductImg from '../components/productPage/ProductImg';
import ProductInfo from '../components/productPage/ProductInfo';
import ProductDetail from '../components/product-detail/PDLeft';
import { FlexCol, FlexItem, FlexRow } from '../components/styles/layout.style';
import ProductIconBox from '../components/productPage/ProductIconBox';
import { useIsMobile } from '../../../../packages/ui/hooks/isMobile';
import FundDetailMobile from '../components/mobile/MbProduct';
import { useGetProductInfo } from '../hooks/product/getProductInfo';
import { useTmpLogin } from '../hooks/user/useTmp';
import { useGetQueryString } from '../hooks/useGetQueryString';
import { Layout } from '@repo/ui/styles';
import { Loading } from '@repo/ui/components';

function ProductPage() {
  const isMobile = useIsMobile();
  const projectId = useGetQueryString();

  useTmpLogin();
  const {
    data: productData,
    isLoading,
    // isError,
  } = useGetProductInfo(Number(projectId));

  if (isLoading) {
    <Layout>
      <Loading />
    </Layout>;
  }

  if (!productData) {
    return (
      <Layout>
        <p>404</p>
      </Layout>
    );
  }

  return (
    <FlexCol className="px-auto sm:px-[120px]">
      {!isMobile ? (
        <>
          <FlexRow className="items-start mt-0">
            <FlexItem>
              <ProductImg imgUrl={productData.project.image_url} />
            </FlexItem>
            <FlexItem>
              <ProductInfo
                title={productData.project.title}
                currentPrice={productData.project.current_price}
                remainingDay={productData.project.remaining_day}
                goalAmount={productData.project.goal_amount}
                startDate={productData.project.start_date}
                endDate={productData.project.end_date}
                deliveryDate={productData.project.delivery_date}
                description={productData.project.description}
                projectId={projectId}
              />
            </FlexItem>
          </FlexRow>
          <ProductDetail
            user={productData.users}
            options={productData.options}
            description={productData.project.description}
          />
        </>
      ) : (
        <>
          <FundDetailMobile />
          <ProductDetail
            user={productData.users}
            options={productData.options}
            description={productData.project.description}
          />
          <ProductIconBox />
        </>
      )}
    </FlexCol>
  );
}

export default ProductPage;
