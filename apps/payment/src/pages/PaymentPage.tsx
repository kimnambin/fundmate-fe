import { FlexCol, FlexRow } from '../components/styles/flex';
import type { ProductDataProps } from '../App';
import { Blank } from '../components/styles/product-detail/prdouctstyle';
import Productinfos from '../components/paymentPage/Productinfo';
import PaymentMid from '../components/paymentPage/PaymentMid';
import PaySelect from '../components/paymentPage/PaySelect';
import PaymentFinal from '../components/paymentPage/PaymentFinal';

const PaymentPage = ({ productData }: ProductDataProps) => {
  const subText = ['선물 정보', '추가 후원금', '후원자 정보', '결제 수단'];

  return (
    <FlexRow className="items-start justify-between">
      <FlexCol className="w-[55%] items-start gap-4">
        <Productinfos />
        <PaymentMid subText={subText} />
        <PaySelect />
        <Blank></Blank>
      </FlexCol>
      <FlexCol className="w-[40%] mt-0">
        <PaymentFinal />
      </FlexCol>
    </FlexRow>
  );
};

export default PaymentPage;
