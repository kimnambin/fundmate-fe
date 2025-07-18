import { formatPrice } from '@repo/ui/utils';
import InputText from '../input-text/inputText';
import { Wrapper } from './createFunding.styles';
import InputDate from '../input-date/inputDate';
import { WarningText } from '@repo/ui/styles';

interface Props {
  title: string;
  setTitle: (value: string) => void;
  isSubmit: boolean;
  targetAmount: string;
  setTargetAmount: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  isInvalidDate: (startDate: string, endDate: string) => boolean;
  deliveryDate: string;
  setDeliveryDate: (value: string) => void;
}

const InfoForm = ({
  title,
  setTitle,
  isSubmit,
  targetAmount,
  setTargetAmount,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isInvalidDate,
  deliveryDate,
  setDeliveryDate,
}: Props) => {
  return (
    <Wrapper>
      <InputText
        width="sm:w-[350px]"
        label="프로젝트 제목"
        placeholder="제목을 입력하세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        isError={isSubmit && title.trim().length === 0}
      />

      <InputText
        width="sm:w-[350px]"
        label="목표 금액"
        placeholder="목표 금액을 입력하세요."
        value={targetAmount}
        onChange={(e) => setTargetAmount(formatPrice(e.target.value))}
        isError={isSubmit && targetAmount.trim().length === 0}
      />

      <div className="flex flex-col gap-[10px]">
        <InputDate
          width="sm:w-[350px]"
          label="프로젝트 기간"
          placeholder="펀딩 시작일을 입력하세요."
          value={startDate}
          onChange={setStartDate}
          isError={isSubmit && startDate.trim().length === 0}
        />
        <InputDate
          width="sm:w-[350px]"
          placeholder="펀딩 종료일을 입력하세요."
          value={endDate}
          onChange={setEndDate}
          isError={
            (isSubmit && endDate.trim().length === 0) ||
            isInvalidDate(startDate, endDate)
          }
        />
        {isInvalidDate(startDate, endDate) && (
          <WarningText>종료일은 시작일보다 이후여야 합니다.</WarningText>
        )}
      </div>

      <InputDate
        width="sm:w-[350px]"
        label="상품 배송일"
        placeholder="예상 상품 배송일을 입력하세요."
        value={deliveryDate}
        onChange={setDeliveryDate}
        isError={isSubmit && deliveryDate.trim().length === 0}
      />
    </Wrapper>
  );
};

export default InfoForm;
