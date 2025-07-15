import { BoxCol, FlexRowsm } from '../styles/layout.style';
import { Radio } from '../styles/paymentPage/Address.style';
import { BaseText } from '../styles/text.style';

interface PaySelectProps {
  setSelectedPayment: React.Dispatch<React.SetStateAction<string>>;
}

const PaySelect: React.FC<PaySelectProps> = ({ setSelectedPayment }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <BoxCol className="items-start p-0">
      <FlexRowsm className="p-4">
        <Radio>
          <input
            type="radio"
            name="payment"
            value="vBANK"
            onChange={handleChange}
            className="text-main"
          />
          <BaseText>계좌이체</BaseText>
        </Radio>
        <Radio>
          <input
            type="radio"
            name="payment"
            value="CARD"
            onChange={handleChange}
            className="text-main"
          />
          <BaseText>카드결제</BaseText>
        </Radio>
      </FlexRowsm>
    </BoxCol>
  );
};

export default PaySelect;
