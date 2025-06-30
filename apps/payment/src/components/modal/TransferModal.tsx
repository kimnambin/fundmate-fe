import { ModalContainer } from '../styles/modal/modal.style';
import {
  Wrapper,
  BankBox,
  BankTitle,
  BankBtn,
  Label,
  Input,
  EtxDiv,
  BottomWrapper,
  Box,
} from '../styles/modal/tansfetModal.style';
import { BaseButton } from '../styles/product-detail/productInfo.style';
import { useTransferForm } from '../../hooks/useForm';

export interface TransferProps {
  addAmount: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TransferModal({
  addAmount,
  setIsModalOpen,
}: TransferProps) {
  const bankList = ['KB국민은행', '농협', '신한', 'IBK', '토스'];

  const {
    accountNumber,
    accountHolder,
    birthDate,
    isBusinessAccount,
    setAccountNumber,
    setAccountHolder,
    setBirthDate,
    handleTransfer,
    setIsBusinessAccount,
    isFormValid,
    handleClose,
  } = useTransferForm({
    addAmount,
    setIsModalOpen,
  });

  return (
    <ModalContainer>
      <Wrapper>
        <BankBox>
          <BankTitle>은행계좌 등록</BankTitle>
          <BankBtn onClick={handleClose}>&times;</BankBtn>
        </BankBox>

        <Label>결제 은행</Label>
        <select className="w-full border rounded-md p-2 mb-4">
          {bankList.map((v, i) => (
            <option key={i}>{v}</option>
          ))}
        </select>

        <Label>계좌번호</Label>
        <Input
          type="text"
          placeholder="공백, - 없이 입력해주세요."
          maxLength={12}
          value={accountNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAccountNumber(e.target.value)
          }
        />

        <EtxDiv>
          <input
            id="biz"
            type="checkbox"
            className="mr-2"
            checked={isBusinessAccount}
            onChange={() => setIsBusinessAccount(!isBusinessAccount)}
          />
          <label htmlFor="biz" className="text-sm">
            사업자 계좌입니다.
          </label>
        </EtxDiv>

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
              className="w-full border rounded-md p-2"
              maxLength={6}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </BottomWrapper>

        <Box>
          <input
            id="default-pay"
            type="checkbox"
            className="mr-2"
            defaultChecked
          />
          <label htmlFor="default-pay" className="text-sm">
            기본 결제수단으로 등록
          </label>
        </Box>

        <BaseButton
          className={`ml-0 ${!isFormValid ? 'bg-gray-400' : 'ml-0 mt-4'}`}
          onClick={handleTransfer}
          disabled={!isFormValid}
        >
          이체하기
        </BaseButton>
      </Wrapper>
    </ModalContainer>
  );
}
