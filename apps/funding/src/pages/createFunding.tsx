import InputDate from '../components/input/InputDate';
import InputText from '../components/input/InputText';
import InputTextArea from '../components/input/InputTextArea';
import MainBtn from '../components/button/MainBtn';
import PointBtn from '../components/button/PointBtn';
import {
  CreateFundingStyle,
  InputWrapper,
  Title,
} from '../style/page/createFunding.styles';
import { Label } from '../style/input/inputText.styles';

function CreateFunding() {
  return (
    <CreateFundingStyle>
      <Title>프로젝트(펀딩) 개설</Title>

      <div className="flex flex-col gap-5">
        <Label>이미지</Label>
        <div className="flex gap-5 items-center">
          <div className="w-32 h-32 bg-[#D9D9D9] rounded-lg" />
          <PointBtn label="대표 이미지 선택" />
        </div>
      </div>

      <InputWrapper>
        <InputText
          width="w-[350px]"
          label="프로젝트 제목"
          placeholder="제목을 입력하세요."
        />
        <InputText
          width="w-[350px]"
          label="목표 금액"
          placeholder="목표 금액을 입력하세요."
        />
        <div className="flex flex-col gap-[20px]">
          <InputDate
            width="w-[350px]"
            label="프로젝트 기간"
            placeholder="펀딩 시작일을 입력하세요."
          />
          <InputDate
            width="w-[350px]"
            placeholder="펀딩 종료일을 입력하세요."
          />
        </div>
        <InputDate
          width="w-[350px]"
          label="상품 배송일"
          placeholder="예상 상품 배송일을 입력하세요."
        />
        <InputTextArea
          label="프로젝트 소개"
          placeholder="프로젝트(펀딩)에 대한 설명을 작성해 주세요!"
          rows={10}
        />
        <div className="flex gap-5 justify-end">
          <MainBtn width="w-[200px]" label="AI 요약" />
        </div>
        <InputTextArea
          label="한 줄 소개"
          placeholder="한 줄 소개를 입력하세요."
          maxLength={50}
          width="w-[350px]"
        />
      </InputWrapper>
    </CreateFundingStyle>
  );
}

export default CreateFunding;
