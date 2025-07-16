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
import { useTransferForm } from '../../hooks/payment/usePaymentSave';

export default function TransferModal({
  addressData,
  method,
  setIsModalOpen,
  setShowLoading,
  setSavedPaymentId,
}: PaymentProps) {
  const bankList = ['KB', 'NH', 'SH', 'IBK', 'TOSS'];

  const {
    bank,
    number,
    setNumber,
    owner,
    setOwner,
    birthDate,
    handleBankChange,
    setBirthDate,
    isFormValid,
    handleClose,
    handleTransfer,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    confirmPayment,
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
              onChange={handleBankChange}
              value={bank}
            >
              <option value="">은행을 선택하세요</option>
              {bankList.map((v, i) => (
                <option key={i} value={v}>
                  {v}
                </option>
              ))}
            </select>

            <Label>계좌번호</Label>
            <Input
              placeholder="공백, - 없이 입력해주세요."
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              value={number}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const onlyNums = e.target.value.replace(/\D/g, '');
                setNumber(onlyNums.slice(0, 12));
              }}
            />

            <BottomWrapper>
              <div className="w-1/2">
                <Label>예금주명</Label>
                <input
                  type="text"
                  placeholder="예금주 명을 입력해주세요."
                  className="w-full border rounded-md p-2"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <Label>예금주 생년월일</Label>
                <input
                  type="text"
                  placeholder="예) 920101"
                  className="w-full border rounded-md p-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={birthDate}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, '');
                    setBirthDate(onlyNums.slice(0, 6));
                  }}
                />
              </div>
            </BottomWrapper>

            <MainButton
              label="저장"
              className="ml-0 w-full"
              textSize={'text-base'}
              textWeight={'font-bold'}
              onClick={handleTransfer}
              isVerificated={!isFormValid}
              isError={!isFormValid}
            />
          </Wrapper>
        </ModalContainer>
      )}
    </Modal>
  );
}
