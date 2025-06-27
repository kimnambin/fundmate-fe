import { BaseText, BoldBigText, LightColor } from '../styles/text';
import { BoxRow, FlexColsm, FlexRowsm } from '../styles/flex';
import tw from 'tailwind-styled-components';

// TODO : 임시
const PaymentMid = ({ subText }: any) => {
  return (
    <div className="w-full">
      <BoldBigText>{subText[0]}</BoldBigText>
      <BoxRow>어쩌구 저쩌구 정보가 담길 예정</BoxRow>
      <BoldBigText className="mt-6">{subText[1]}</BoldBigText>
      <Box>
        <BaseText>후원금</BaseText>
        <MoneyBox>
          <Input type="number" placeholder="금액" />
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

const Box = tw.div` 
  flex
  flex-row
  justify-between 
  items-center
  w-full
  p-3
  border border-silver
  rounded-md
`;

const MoneyBox = tw.div`
  flex 
  items-center 
  border 
  border-gray-300 
  rounded-md 
  p-2 
  w-fit 
  bg-white 
  relative
`;

const Span = tw.span`
  text-lg 
  text-gray-800 
  bg-gray-200 
  px-2 
  rounded-r-md 
  absolute 
  right-0 
  h-full 
  w-12 
  flex 
  items-center 
  justify-center
`;

const Input = tw.input`
  border-none 
  text-lg 
  pl-2 
  w-full 
  focus:outline-none
`;

export default PaymentMid;
