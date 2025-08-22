import { useNavigate } from 'react-router-dom';
import { BoxRow, FlexCol, FlexColsm, FlexRowsm } from '../styles/layout.style';

import { BaseText, BoldBigText, BoldText } from '../styles/text.style';
import { MainButton } from '@repo/ui/components';
import { formatDate } from '../../utils/date';
import { formatPrice } from '@repo/ui/utils';
import { useDelSavePayment } from '../../hooks/payment/save/useDelSavePayment';
// import { useGetiInsertedId } from '../../hooks/useGetiInsertedId';
import { usePriceStore } from '../../store/mock/mockUpdatePrice';

interface PdBottom {
  code: string;
  amount: number;
  scheduleDate: string;
}

const PaymentDetailBottom = ({ code, amount, scheduleDate }: PdBottom) => {
  const updatedPrice = usePriceStore((state) => state.updatedPrice);

  const subTitle = ['결제 수단', '결제 금액', '결제 상태'];
  const content = [
    code,
    `${formatPrice(String(updatedPrice ?? amount))}원`,
    `${formatDate(scheduleDate)} 결제 예정`,
  ];
  const nav = useNavigate();

  // const id = useGetiInsertedId();

  const { mutate: deletePayment } = useDelSavePayment();

  const handleDelete = () => {
    const confirmed = window.confirm('정말로 결제 정보를 삭제하시겠습니까?');
    if (confirmed) {
      deletePayment();
    }
  };

  return (
    <FlexCol className="items-start">
      <BoldBigText>결제 정보</BoldBigText>
      <BoxRow className="justify-between items-start">
        <FlexColsm className="items-start">
          {subTitle.map((v, idx) => (
            <FlexRowsm
              key={v}
              className="w-full py-2 flex justify-between items-center"
            >
              <BaseText className="flex-1 mr-3 text-xs">
                {subTitle[idx]}
              </BaseText>

              <BoldText
                className={`flex text-left w-[240px] ${idx === 2 ? 'text-[#FB6565]' : 'text-black'}`}
              >
                {content[idx]}
              </BoldText>
            </FlexRowsm>
          ))}
        </FlexColsm>
        <MainButton
          label="취소하기"
          className="bg-[#E2E8F0] w-16 sm:w-[10%] p-2 text-xs text-black"
          textSize={'text-base'}
          textWeight={'font-bold'}
          onClick={handleDelete}
        />
      </BoxRow>

      <div className="flex justify-center w-full mt-4">
        <div className="flex items-center justify-center w-[50%] sm:w-[30%] p-2 mb-8">
          <MainButton
            label="다른 상품 살펴보기"
            className="ml-0 mt-4 w-full px-6 py-3"
            textSize={'text-base'}
            textWeight={'font-bold'}
            onClick={() => {
              nav('/');
            }}
          />
        </div>
      </div>
    </FlexCol>
  );
};

export default PaymentDetailBottom;
