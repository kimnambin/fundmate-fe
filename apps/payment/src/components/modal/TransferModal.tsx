import { MainButton, Modal } from '@repo/ui/components';
import { ModalContainer } from '../styles/modal/modal.style';
import {
  Wrapper,
  BankBox,
  BankTitle,
  BankBtn,
  Label,
  Input,
  BottomWrapper,
} from '../styles/modal/tansfetModal.style';
import { PaymentProps } from '../../types/payement/modal.model';
import PayConfirmModal from './confirm/PayConfirmModal';
import { useTransferForm } from '../../hooks/payment/save/useTransferForm';

export default function TransferModal({
  addressData,
  method,
  setIsModalOpen,
  setShowLoading,
  setSavedPaymentId,
}: PaymentProps) {
  const bankList = ['KB', 'NH', 'SH', 'IBK', 'TOSS'];

  const {
    register,
    handleTransfer,
    confirmPayment,
    handleClose,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    errors,
    isValid,
  } = useTransferForm({
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
          title={'transfer'}
          setIsModalOpen={function (): void {
            throw new Error('Function not implemented.');
          }}
          addAmount={0}
        />
      ) : (
        <ModalContainer>
          <Wrapper>
            <BankBox>
              <BankTitle>은행계좌 등록</BankTitle>
              <BankBtn onClick={handleClose}>&times;</BankBtn>
            </BankBox>

            <Label>결제 은행</Label>
            <select
              className="w-full border rounded-md p-2 mb-4"
              {...register('bank', { required: '은행을 선택해주세요' })}
            >
              <option value="">은행을 선택하세요</option>
              {bankList.map((v, i) => (
                <option key={i} value={v}>
                  {v}
                </option>
              ))}
            </select>
            {errors.bank && (
              <p className="text-red-500 text-sm">{errors.bank.message}</p>
            )}

            <Label>계좌번호</Label>
            <Input
              placeholder="공백, - 없이 입력해주세요."
              type="text"
              inputMode="numeric"
              maxLength={12}
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              {...register('number', {
                required: '계좌번호를 입력해주세요',
                pattern: {
                  value: /^[0-9]{8,12}$/,
                  message: '숫자 8~12자리로 입력해주세요',
                },
              })}
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number.message}</p>
            )}

            <BottomWrapper>
              <div className="w-1/2">
                <Label>예금주명</Label>
                <input
                  type="text"
                  placeholder="예금주 명을 입력해주세요."
                  className="w-full border rounded-md p-2"
                  {...register('owner', {
                    required: '예금주명을 입력해주세요',
                    minLength: {
                      value: 2,
                      message: '2자 이상 입력해주세요',
                    },
                  })}
                />
                {errors.owner && (
                  <p className="text-red-500 text-sm">{errors.owner.message}</p>
                )}
              </div>

              <div className="w-1/2">
                <Label>예금주 생년월일</Label>
                <input
                  type="text"
                  placeholder="예) 920101"
                  className="w-full border rounded-md p-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  inputMode="numeric"
                  maxLength={6}
                  {...register('birthDate', {
                    required: '생년월일을 입력해주세요',
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: '숫자 6자리로 입력해주세요',
                    },
                  })}
                />
                {errors.birthDate && (
                  <p className="text-red-500 text-sm">
                    {errors.birthDate.message}
                  </p>
                )}
              </div>
            </BottomWrapper>

            <MainButton
              label="저장"
              className="ml-0 w-full"
              textSize="text-base"
              textWeight="font-bold"
              onClick={handleTransfer}
              disabled={!isValid}
              isError={!isValid}
            />
          </Wrapper>
        </ModalContainer>
      )}
    </Modal>
  );
}
