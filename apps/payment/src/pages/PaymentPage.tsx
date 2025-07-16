import { FlexCol, FlexRow } from '../components/styles/layout.style';
import { Blank } from '../components/styles/product-detail/prdouctstyle.style';
import Productinfos from '../components/paymentPage/ProductMiniInfo';
import PaymentMid from '../components/paymentPage/PaymentMid';
import PaySelect from '../components/paymentPage/PaySelect';
import PaymentFinal from '../components/paymentPage/PaymentFinal';
import { useState } from 'react';
import { useIsMobile } from '../hooks/useMobile';
import { useTmpLogin } from '../hooks/useTmp';

const PaymentPage = () => {
  const subText = ['선물 정보', '추가 후원금', '후원자 정보', '결제 수단'];
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [addAmount, setAddAmount] = useState<number>(1000);
  const isMobile = useIsMobile();
  useTmpLogin();
  return (
    <>
      {!isMobile ? (
        <FlexRow className="items-start justify-between px-[120px]">
          <FlexCol className="w-[55%] items-start gap-4">
            <Productinfos />
            <PaymentMid
              subText={subText}
              addAmount={addAmount}
              setAddAmount={setAddAmount}
            />
            <PaySelect setSelectedPayment={setSelectedPayment} />
            <Blank></Blank>
          </FlexCol>
          <FlexCol className="w-[40%] mt-0 h-auto">
            <PaymentFinal
              selectedPayment={selectedPayment}
              addAmount={addAmount}
            />
          </FlexCol>
        </FlexRow>
      ) : (
        <FlexCol>
          <FlexCol className="w-full items-start gap-4 px-6">
            <Productinfos />
            <PaymentMid
              subText={subText}
              addAmount={addAmount}
              setAddAmount={setAddAmount}
            />
            <PaySelect setSelectedPayment={setSelectedPayment} />
            <Blank></Blank>
          </FlexCol>
          <FlexCol className="w-full mt-0 h-auto px-6 sm:px-0">
            <PaymentFinal
              selectedPayment={selectedPayment}
              addAmount={addAmount}
            />
          </FlexCol>
        </FlexCol>
      )}
    </>
  );
};

export default PaymentPage;
