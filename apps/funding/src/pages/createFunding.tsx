import InputDate from '../components/InputDate';
import InputText from '../components/InputText';
import InputTextArea from '../components/InputTextArea';
import MainBtn from '../components/MainBtn';
import PointBtn from '../components/PointBtn';
import {
  CreateFundingStyle,
  InputWrapper,
  Title,
} from '../style/createFunding.styles';
import { Label } from '../style/inputText.styles';

function CreateFunding() {
  return (
    <CreateFundingStyle>
      <Title>프로젝트(펀딩) 개설</Title>

      <div className="flex flex-col gap-5">
        <Label>이미지</Label>
        <div className="flex gap-5 items-center">
          <div className="w-32 h-32 bg-slate-400 rounded-lg" />
          <PointBtn label="대표 이미지 선택" />
        </div>
      </div>

      <InputWrapper>
        <InputText label="프로젝트 제목" placeholder="제목을 입력하세요." />
        <InputText label="목표 금액" placeholder="목표 금액을 입력하세요." />
        <div className="flex flex-col gap-[20px]">
          <InputDate
            label="프로젝트 기간"
            placeholder="펀딩 시작일을 입력하세요."
          />
          <InputDate placeholder="펀딩 종료일을 입력하세요." />
        </div>
        <InputDate
          label="상품 배송일"
          placeholder="예상 상품 배송일을 입력하세요."
        />
        <InputTextArea
          label="프로젝트 소개"
          placeholder="프로젝트(펀딩)에 대한 설명을 작성해 주세요!"
        />
        <div className="flex gap-5 justify-end">
          <MainBtn width="w-[200px]" label="AI 요약" />
          <MainBtn width="w-[200px]" label="다시쓰기" />
        </div>
      </InputWrapper>
    </CreateFundingStyle>
  );
}

export default CreateFunding;
