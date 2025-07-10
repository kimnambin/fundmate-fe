import { Link } from 'react-router-dom';
import { BoxRow, FlexCol, FlexColsm, FlexRowsm } from '../styles/layout.style';

import { BaseText, BoldBigText, BoldText } from '../styles/text.style';
import { MainButton } from '@repo/ui/components';

const PaymentDetailBottom = () => {
  const subTitle = ['결제 수단', '결제 금액', '결제 상태'];
  const content = ['국민은행', '1,000원', '2025.06.20 결제 예정'];

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
                className={`flex-1 text-left ${idx === 2 ? 'text-[#FB6565]' : 'text-black'}`}
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
        />
      </BoxRow>

      <div className="flex justify-center w-full mt-4">
        <Link
          to="/payment/list"
          className="flex items-center justify-center w-[50%] sm:w-[30%] p-2 mb-8"
        >
          <MainButton
            label="후원 목록 보기"
            className="ml-0 mt-4 w-full px-6 py-3"
            textSize={'text-base'}
            textWeight={'font-bold'}
          />
        </Link>
      </div>
    </FlexCol>
  );
};

export default PaymentDetailBottom;
