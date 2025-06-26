import InputDate from '../../components/input-date/inputDate';
import InputText from '../../components/input-text/inputText';
import InputTextArea from '../../components/input-text-area/inputTextArea';
import MainBtn from '../../components/main-button/mainButton';
import PointBtn from '../../components/point-button/pointButton';
import {
  CategoryWrapper,
  CreateFundingStyle,
  InputWrapper,
  Title,
} from './createFunding.styles';
import { Label } from '../../components/input-text/inputText.styles';
import Category from '../../components/category/category';

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
        <div className="flex flex-col gap-5">
          <Label>분류</Label>
          <CategoryWrapper>
            {filters.map((filter) => (
              <Category
                key={filter.title}
                title={filter.title}
                options={filter.options}
              />
            ))}
          </CategoryWrapper>
        </div>
      </InputWrapper>
    </CreateFundingStyle>
  );
}

export default CreateFunding;

// 임시 데이터
const filters = [
  {
    title: '카테고리',
    options: [
      '게임',
      '홈/리빙',
      '테크/가전',
      '향수/뷰티',
      '의류',
      '잡화',
      '디자인',
      '예술',
    ],
  },
  {
    title: '가구형태',
    options: ['1인 가구', '2인 가구', '다인 가구', '관계없음'],
  },
  { title: '성별', options: ['남성', '여성', '관계없음'] },
  {
    title: '연령',
    options: ['10대', '20대', '30대', '40대', '50대 이상'],
  },
];
