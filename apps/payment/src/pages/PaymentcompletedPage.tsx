import {
  Container,
  FlexColsm,
  FlexRowsm,
  GridCol6,
} from '../components/styles/layout.style';
import { BaseText, BoldBigText } from '../components/styles/text.style';
import { Link } from 'react-router-dom';
// import { useGetQueryString } from '../hooks/useGetQueryString';
import { VerticalCard } from '@repo/ui/components';
import { Blank } from '../components/styles/product-detail/Product.style';
// import { useGetProductInfo } from '../hooks/product/getProductInfo';
import { useGetQueryString } from '../hooks/useGetQueryString';
import { useGetiInsertedId } from '../hooks/useGetiInsertedId';
import {
  mockProducts,
  mockPopularProducts,
  mockRecentlyProducts,
} from '@repo/ui/mocks';
import useMockData from '../hooks/mock/useMockData';

const PaymentcompletedPage = () => {
  const projectId = useGetQueryString();
  // const { data: productData } = useGetProductInfo(Number(projectId));

  const id = useGetiInsertedId();

  const { productData } = useMockData();

  let allToProducts = [
    ...mockProducts,
    ...mockPopularProducts,
    ...mockRecentlyProducts,
  ];

  return (
    <Container className="mt-[10%] px-6 items-start sm:px-0">
      <FlexColsm className="w-full">
        <BoldBigText className="text-main">
          {/* 축하합니다. {productData?.project.sponsor}번째 */}
          축하합니다. {productData?.achievement}번째
        </BoldBigText>
        <BoldBigText>공식 후원자가 되셨습니다!</BoldBigText>
        <FlexRowsm className="mt-6">
          <BaseText className="text-xs mr-1.5 sm:text-base">
            * 후원 내역 변경은
          </BaseText>
          <Link
            to={`/payment/${projectId}/detail?id=${id}`}
            className="text-main underline"
          >
            후원상세
          </Link>
          <BaseText>에서 하실 수 있습니다.</BaseText>
        </FlexRowsm>
        <div className="mt-[15%] w-full">
          <BoldBigText className="pl-3 ml-3">
            이런 프로젝트도 좋아하실거에요
          </BoldBigText>

          <GridCol6 className="w-full">
            {allToProducts.map((data, index) => {
              try {
                return (
                  <VerticalCard
                    key={index}
                    id={data.project_id}
                    imageUrl={data.image_url}
                    title={data.title}
                    description={data.short_description}
                  />
                );
              } catch (error) {
                console.error('Card 오류:', error);
                return <div key={index}>오류 발생</div>;
              }
            })}
          </GridCol6>
        </div>
        <Blank></Blank>
      </FlexColsm>
    </Container>
  );
};

export default PaymentcompletedPage;
