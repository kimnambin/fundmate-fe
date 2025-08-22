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
// import { useCardPayForm } from '../../hooks/payment/save/usePostPaymentSave';
import {
  CardFormValues,
  useCardPayForm,
} from '../../hooks/payment/save/useCardForm';

const CardPaymentModal = ({
  addressData,
  method,
  setIsModalOpen,
  setShowLoading,
  setSavedPaymentId,
}: PaymentProps) => {
  const placeholders = randomPlaceholder();
  const {
    register,
    errors,
    isValid,
    handleClose,
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

  const keyMap: Record<number, keyof CardFormValues> = {
    0: 'cardNumber0',
    1: 'cardNumber1',
    2: 'cardNumber2',
    3: 'cardNumber3',
  };

  return (
    <Modal isOpen={true} onClose={() => setIsModalOpen(false)}>
      {isConfirmModalOpen ? (
        <PayConfirmModal
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          confirmPayment={confirmPayment}
          title={'card'}
          setIsModalOpen={function (): void {
            throw new Error('Function not implemented.');
          }}
          addAmount={0}
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
              loading="lazy"
              decoding="async"
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
                placeholder={text}
                {...register(keyMap[index], {
                  required: true,
                  pattern: /^[0-9]{4}$/,
                })}
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
                <Select {...register('expiryMonth', { required: true })}>
                  <option value="">MM</option>
                  {monthList().map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>

                <Select {...register('expiryYear', { required: true })}>
                  <option value="">YY</option>
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
                type="text"
                inputMode="numeric"
                maxLength={3}
                {...register('cvc', {
                  required: true,
                  pattern: /^[0-9]{3}$/,
                })}
              />

              <IoCardOutline className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 mt-2" />
            </SecBox>
          </ExpiryBox>

          <Label htmlFor="card-name">카드 소유자 이름</Label>
          <Input
            type="text"
            placeholder="J. Smith"
            {...register('cardName', {
              required: '이름을 입력해주세요',
              minLength: 2,
            })}
          />
          {errors.cardName && (
            <p className="text-red-500 text-sm">{errors.cardName.message}</p>
          )}

          <MainButton
            label="저장"
            className="ml-0 w-full"
            textSize="text-base"
            textWeight="font-bold"
            onClick={handleCardPay}
            disabled={!isValid}
            isError={!isValid}
          />
        </div>
      )}
    </Modal>
  );
};

export default CardPaymentModal;
