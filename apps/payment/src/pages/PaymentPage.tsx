import { FlexCol, FlexRow } from '../components/styles/layout.style';
import { Blank } from '../components/styles/product-detail/Product.style';
import Productinfos from '../components/paymentPage/ProductMiniInfo';
import PaymentMid from '../components/paymentPage/PaymentMid';
import PaySelect from '../components/paymentPage/PaySelect';
import PaymentFinal from '../components/paymentPage/PaymentFinal';
import { useState } from 'react';
import { useIsMobile } from '../../../../packages/ui/hooks/isMobile';
// import { useTmpLogin } from '../hooks/user/useTmp';
// import { useGetUserInfo } from '../hooks/user/useGetUserInfo';
import useMockData from '../store/mock/mockDataStore';
import { NotFound } from '@repo/ui/components';
// import { useGetQueryString } from '../hooks/useGetQueryString';
// import { useGetProductInfo } from '../hooks/product/getProductInfo';

const PaymentPage = () => {
  const subText = ['선물 정보', '추가 후원금', '후원자 정보', '결제 수단'];
  // const { data: productData } = useGetProductInfo(Number(projectId));

  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const isMobile = useIsMobile();
  // useTmpLogin();

  // const { data } = useGetUserInfo();

  const { productData, userData } = useMockData();

  if (!productData || !userData) {
    return <NotFound />;
  }

  // const optionData = userData?.options[0];

  const [addAmount, setAddAmount] = useState<number>(0);

  return (
    <>
      {!isMobile ? (
        <FlexRow className="items-start justify-between px-[120px]">
          <FlexCol className="w-[55%] items-start gap-4">
            <Productinfos
              title={productData?.title}
              imgUrl={productData?.image_url}
            />

            <PaymentMid
              subText={subText}
              addAmount={addAmount}
              setAddAmount={setAddAmount}
              nickname={userData?.user.nickname ?? '알수없음'}
              email={userData?.user.content ?? ''}
            />
            <PaySelect setSelectedPayment={setSelectedPayment} />
            <Blank></Blank>
          </FlexCol>
          <FlexCol className="w-[40%] mt-0 h-auto">
            <PaymentFinal
              selectedPayment={selectedPayment}
              addAmount={addAmount}
              setAddAmount={setAddAmount}
            />
          </FlexCol>
        </FlexRow>
      ) : (
        <FlexCol>
          <FlexCol className="w-full items-start gap-4 px-6">
            <Productinfos
              title={productData?.title}
              imgUrl={productData?.image_url}
            />
            <PaymentMid
              subText={subText}
              addAmount={addAmount}
              setAddAmount={setAddAmount}
              nickname={userData?.user.nickname ?? '알수없음'}
              email={userData?.user.content ?? ''}
            />
            <PaySelect setSelectedPayment={setSelectedPayment} />
            <Blank></Blank>
          </FlexCol>
          <FlexCol className="w-full mt-0 h-auto px-6 sm:px-0">
            <PaymentFinal
              selectedPayment={selectedPayment}
              addAmount={addAmount}
              setAddAmount={setAddAmount}
            />
          </FlexCol>
        </FlexCol>
      )}
    </>
  );
};

export default PaymentPage;
