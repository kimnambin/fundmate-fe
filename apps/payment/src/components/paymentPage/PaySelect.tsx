import { BoxCol, FlexRowsm } from '../styles/flex';
import { BaseText } from '../styles/text';
import tw from 'tailwind-styled-components';

const PaySelect = () => {
  return (
    <BoxCol className="items-start p-0">
      <FlexRowsm className="p-4">
        <Radio>
          <input
            type="radio"
            name="transfer"
            value="transfer"
            className="main-color"
          />
          <BaseText>계좌이체</BaseText>
        </Radio>
        <Radio>
          <input
            type="radio"
            name="payment"
            value="card"
            className="main-color"
          />
          <BaseText>카드결제</BaseText>
        </Radio>
      </FlexRowsm>
    </BoxCol>
  );
};

export const Radio = tw.label`
flex 
items-center 
space-x-2 
cursor-pointer 
mr-6`;

export default PaySelect;
