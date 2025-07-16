import { randomPlaceholder } from '../../utils/numbers';
import { IoCardOutline } from 'react-icons/io5';
import {
  CardInput,
  CardInputContainer,
  CardType,
  ExpiryBox,
  H2,
  ImgBox,
  Input,
  Label,
  MouthBox,
  SecBox,
  Select,
} from '../styles/modal/modal.style';
import { monthList, yearList } from '../../utils/date';
import { BankBtn } from '../styles/modal/tansfetModal.style';
import { FlexRowsm } from '../styles/layout.style';
import { PaymentProps } from '../../types/payement/modal.model';
import { MainButton, Modal } from '@repo/ui/components';
import PayConfirmModal from './confirm/PayConfirmModal';
import { useCardPayForm } from '../../hooks/payment/usePaymentSave';

const CardPaymentModal = ({
  addressData,
  method,
  setIsModalOpen,
  setShowLoading,
  setSavedPaymentId,
}: PaymentProps) => {
  const placeholders = randomPlaceholder();
  const {
    number,
    setNumber,
    expiryDate,
    setExpiryDate,
    cvc,
    setCvc,
    cardName,
    setCardName,
    handleClose,
    isFormValid,
    handleCardPay,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    confirmPayment,
  } = useCardPayForm({
    addressData,
    method,
    setIsModalOpen,
    setShowLoading,
    setSavedPaymentId,
  });

  return (
    <Modal isOpen={true} onClose={() => setIsModalOpen(false)}>
      {isConfirmModalOpen ? (
        <PayConfirmModal
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          confirmPayment={confirmPayment}
          title={'card'}
        />
      ) : (
        <div className="max-w-md mx-auto">
          <FlexRowsm className="justify-between items-center">
            <H2>결제방법</H2>
            <BankBtn className="mb-4" onClick={handleClose}>
              &times;
            </BankBtn>
          </FlexRowsm>
          <CardType>
            <input
              type="radio"
              id="credit-card"
              name="payment-method"
              value="credit"
              defaultChecked
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/633/633611.png"
              alt="신용카드 아이콘"
              className="w-6 h-6"
            />
            <label htmlFor="credit-card" className="ml-2">
              신용카드
            </label>
          </CardType>
          <Label htmlFor="card-number">카드 번호</Label>
          <CardInputContainer>
            {placeholders.map((text, index) => (
              <CardInput
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={number[index]}
                placeholder={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const onlyNums = e.target.value.replace(/\D/g, '');
                  const inputNum = [...number];
                  inputNum[index] = onlyNums.slice(0, 4);
                  setNumber(inputNum);
                }}
              />
            ))}
          </CardInputContainer>

          <ImgBox>
            <img
              src="https://img.icons8.com/color/48/visa.png"
              alt="VISA"
              className="h-6 border border-gray-300"
            />
            <img
              src="https://img.icons8.com/color/48/mastercard-logo.png"
              alt="MasterCard"
              className="h-6 border border-gray-300"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/633/633611.png"
              alt="신용카드 아이콘"
              className="h-6 border border-gray-300"
            />
          </ImgBox>

          <ExpiryBox>
            <div className="w-[48%]">
              <Label htmlFor="expiry-date">만료일</Label>
              <MouthBox>
                <Select
                  id="expiry-month"
                  required
                  className="mr-2"
                  value={expiryDate}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setExpiryDate(e.target.value)
                  }
                >
                  <option value="" disabled>
                    MM
                  </option>

                  {monthList().map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
                <Select
                  id="expiry-year"
                  required
                  value={expiryDate}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setExpiryDate(e.target.value)
                  }
                >
                  <option value="" disabled>
                    YY
                  </option>
                  {yearList().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Select>
                <IoCardOutline className="absolute right-2 w-6 h-6 mb-3" />
              </MouthBox>
            </div>
            <SecBox>
              <Label htmlFor="cvv">보안 코드</Label>
              <Input
                id="cvv"
                type="number"
                inputMode="numeric"
                placeholder="3자리"
                value={cvc}
                required
                pattern="[0-9]*"
                maxLength={3}
                className="pr-8 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const onlyNums = e.target.value.replace(/\D/g, '');
                  setCvc(onlyNums.slice(0, 3));
                }}
              />
              <IoCardOutline className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 mt-2" />
            </SecBox>
          </ExpiryBox>

          <Label htmlFor="card-name">카드 소유자 이름</Label>
          <Input
            id="card-name"
            type="text"
            placeholder="J. Smith"
            value={cardName}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCardName(e.target.value)
            }
          />
          <MainButton
            label="저장"
            className="ml-0 w-full"
            textSize={'text-base'}
            textWeight={'font-bold'}
            onClick={handleCardPay}
            isVerificated={!isFormValid}
            isError={!isFormValid}
          />
        </div>
      )}
    </Modal>
  );
};

export default CardPaymentModal;
