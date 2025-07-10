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
import { useTransferForm } from '../../hooks/useForm';
import { TransferProps } from '../../types/modal.model';
import PayConfirmModal from './confirm/PayConfirmModal';

export default function TransferModal({
  addAmount,
  addressData,
  setIsModalOpen,
}: TransferProps) {
  const bankList = ['KB국민은행', '농협', '신한', 'IBK', '토스'];

  const {
    selectedBank,
    accountNumber,
    accountHolder,
    birthDate,
    handleBankChange,
    setAccountNumber,
    setAccountHolder,
    setBirthDate,
    isFormValid,
    handleClose,
    handleTransfer,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    confirmPayment,
  } = useTransferForm({ addAmount, addressData, setIsModalOpen });

  return (
    <Modal isOpen={true} onClose={() => setIsModalOpen(false)}>
      {isConfirmModalOpen ? (
        <PayConfirmModal
          addAmount={addAmount}
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
              value={selectedBank}
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
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none 
            [&::-webkit-outer-spin-button]:appearance-none"
              value={accountNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const onlyNums = e.target.value.replace(/\D/g, '');
                setAccountNumber(onlyNums.slice(0, 12));
              }}
            />

            <BottomWrapper>
              <div className="w-1/2">
                <Label>예금주명</Label>
                <input
                  type="text"
                  placeholder="예금주 명을 입력해주세요."
                  className="w-full border rounded-md p-2"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <Label>예금주 생년월일</Label>
                <input
                  type="text"
                  placeholder="예) 920101"
                  className="w-full border rounded-md p-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none 
                [&::-webkit-outer-spin-button]:appearance-none"
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
              label="결제하기"
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
