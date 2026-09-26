import ProductImg from '../components/productPage/ProductImg';
import ProductInfo from '../components/productPage/ProductInfo';
import ProductDetail from '../components/product-detail/PDLeft';
import { FlexCol, FlexItem, FlexRow } from '../components/styles/layout.style';

// import { useGetProductInfo } from '../hooks/product/getProductInfo';

// import { Layout } from '@repo/ui/styles';
// import { Loading } from '@repo/ui/components';
import { useIsMobile } from '@repo/ui/hooks';

// import { ProductInfoProps } from '../types/product/productInfo.model';
import { sevenWeeksLaterFormatted, todayDateFormatted } from '../utils/date';
import { UserDefault } from '@repo/ui/assets';

import { NotFound } from '@repo/ui/components';
import useMockData from '../hooks/mock/useMockData';
import ProductIconBox from '../components/productPage/ProductIconBox';
import { FundDetailMobile } from '../components/mobile/MbProduct';

function ProductPage() {
  const isMobile = useIsMobile();

  // ============✔️TODO : 임시 데이터를 위한 주석===============
  // const {
  //   data: productData,
  //   isLoading,
  //   // isError,
  // } = useGetProductInfo(Number(projectId));

  // if (isLoading) {
  //   <Layout>
  //     <Loading />
  //   </Layout>;
  // }

  // if (!productData) {
  //   return (
  //     <Layout>
  //       <p>404</p>
  //     </Layout>
  //   );
  // }

  const { id, productData, userData } = useMockData();

  if (!productData) {
    return <NotFound />;
  }

  if (!userData) {
    return <NotFound />;
  }


  return (
    <FlexCol className="px-auto sm:px-[120px]">
      {!isMobile ? (
        <>
          <FlexRow className="items-start mt-0">
            <FlexItem>
              <ProductImg imgUrl={productData?.image_url ?? UserDefault} />
            </FlexItem>
            <FlexItem>
              {productData && (
                <ProductInfo
                  title={productData.title}
                  currentPrice={productData.current_amount}
                  remainingDay={productData.remaining_day}
                  goalAmount={productData.goal_amount}
                  startDate={todayDateFormatted()}
                  endDate={sevenWeeksLaterFormatted()}
                  deliveryDate={String(productData.remaining_day)}
                  projectId={String(id)}
                />
              )}
            </FlexItem>
          </FlexRow>
          {userData && (
            <ProductDetail
              user={userData.user}
              options={userData.options}
              description={userData.description ?? '설명이 없습니다.'}
            />
          )}
        </>
      ) : (
        <>
          {productData && (
            <FundDetailMobile
              title={productData.title}
              currentPrice={productData.current_amount}
              remainingDay={productData.remaining_day}
              goalAmount={productData.goal_amount}
              startDate={todayDateFormatted()}
              endDate={sevenWeeksLaterFormatted()}
              deliveryDate={String(productData.remaining_day)}
              projectId={String(id)}
              img_url={
                id ? `https://picsum.photos/id/${id * 10}/350/300` : UserDefault
              }
            />
          )}
          {userData?.user && userData?.options && (
            <ProductDetail
              user={userData.user}
              options={userData.options}
              description={userData.description ?? '설명이 없습니다.'}
            />
          )}

          <ProductIconBox projectId={String(id)} />
        </>
      )}
    </FlexCol>
  );
}

export default ProductPage;
