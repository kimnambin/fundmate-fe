import { MainButton } from '@repo/ui/components';
import { BoxRow, FlexCol, FlexColsm, FlexRowsm } from '../styles/layout.style';
import { BoldBigText, BoldText, LightColor } from '../styles/text.style';
import { formatDate } from '../../utils/date';
import { useDelPayment } from '../../hooks/payment/useDelPayment';
import { useGetiInsertedId } from '../../hooks/useGetiInsertedId';

interface PdBoxProps {
  paymentInfoId: number;
  createdAt: string;
  scheduleDate: string;
}

const PaymentDetailBox = ({
  paymentInfoId,
  createdAt,
  scheduleDate,
}: PdBoxProps) => {
  const payInfo = [
    '상품 상태',
    '후원 상태',
    '후원 번호',
    '후원 날짜',
    '종료일',
  ];

  const resPayInfo = [
    '펀딩 진행 중',
    '후원 예약',
    paymentInfoId,
    formatDate(createdAt),
    formatDate(scheduleDate),
  ];

  const id = useGetiInsertedId();

  const { mutate: deletePayment } = useDelPayment();

  const handleDelete = () => {
    const confirmed = window.confirm('정말로 후원을 취소하시겠습니까??');
    if (confirmed) {
      deletePayment(Number(id));
    }
  };

  return (
    <FlexCol className="items-start">
      <BoldBigText>후원정보</BoldBigText>
      <BoxRow className="justify-between items-start">
        <FlexColsm className="items-start">
          {payInfo.map((v, idx) => (
            <FlexRowsm
              key={v}
              className="w-full py-2 flex items-center justify-normal"
            >
              <LightColor className="flex-1 mr-3 text-xs text-left">
                {payInfo[idx]}
              </LightColor>
              <BoldText
                className={`flex-2 w-[320px] text-left ${idx === 0 || idx === 1 ? 'text-[#FB6565]' : 'text-black'}`}
              >
                {resPayInfo[idx]}
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
    </FlexCol>
  );
};

export default PaymentDetailBox;
