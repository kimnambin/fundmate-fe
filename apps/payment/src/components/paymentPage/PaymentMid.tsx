import { BaseText, BoldBigText, LightColor } from '../styles/text.style';
import { Box, BoxRow, FlexColsm, FlexRowsm } from '../styles/layout.style';
import { Input, MoneyBox, Span } from '../styles/paymentPage/PaymentMid.style';
import { formatPrice } from '@repo/ui/utils';

const PaymentMid = ({
  subText,
  addAmount,
  setAddAmount,
}: {
  subText: string[];
  addAmount: number;
  setAddAmount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="w-full">
      <BoldBigText>{subText[0]}</BoldBigText>
      <BoxRow>기본리워드</BoxRow>
      <BoldBigText className="mt-6">{subText[1]}</BoldBigText>
      <Box>
        <BaseText>후원금</BaseText>
        <MoneyBox>
          <Input
            type="text"
            placeholder="기본 1,000원"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
              setAddAmount(Number(onlyNumbers));
            }}
            value={formatPrice(String(addAmount))}
          />

          <Span>원</Span>
        </MoneyBox>
      </Box>
      <BoldBigText className="mt-6">{subText[2]}</BoldBigText>
      <BoxRow>
        <FlexColsm className="items-start">
          <FlexRowsm className="py-2 justify-between">
            <LightColor className="text-sm mr-6">연락처</LightColor>
            <BaseText>010-</BaseText>
          </FlexRowsm>
          <FlexRowsm className="py-2">
            <LightColor className="text-sm mr-6">이메일</LightColor>
            <BaseText>test@naver.com</BaseText>
          </FlexRowsm>
        </FlexColsm>
      </BoxRow>
      <BoldBigText className="mt-6">{subText[3]}</BoldBigText>
    </div>
  );
};

export default PaymentMid;
