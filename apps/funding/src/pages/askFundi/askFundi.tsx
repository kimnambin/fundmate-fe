import { Wrapper } from './askFundi.styles';
import HelpIcon from '../../assets/icons/ic_help.svg';
import InputTextArea from '../../components/input-text-area/inputTextArea';
import {
  MediumFont,
  SubTitle,
  Title,
  WarningText,
  Layout,
} from '@repo/ui/styles';
import Category from '../../components/category/category';
import { filters } from '../createFunding/createFunding';
import { MainButton } from '@repo/ui/components';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Loading, Modal } from '@repo/ui/components';
import { useNavigate } from 'react-router-dom';
import { FundiIcon } from '@repo/ui/assets';

const AskFundi = () => {
  const [isHelopOpen, setIsHelpOpen] = useState(false);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = category && gender && age && content.trim().length > 0;

  const navigate = useNavigate();

  const handleNext = async () => {
    setIsSubmit(true);
    if (!isValid) return;
    setIsLoading(true);

    try {
      // API 호출 로직
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 로딩 시물레이션
      // API 응답 처리
      const response = {
        message: markdownString.expanded_Idea,
      };

      navigate('/fundi/response', { state: response });
    } catch (error) {
      console.error('펀디 요청 실패 :', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <Wrapper>
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <Title>펀디에게 물어봐</Title>
            <img
              src={HelpIcon}
              alt="Help Icon"
              className="w-5 h-5 cursor-pointer"
              onClick={() => setIsHelpOpen(true)}
            />
            <Modal isOpen={isHelopOpen} onClose={() => setIsHelpOpen(false)}>
              <div className="flex justify-end">
                <IoClose
                  size={24}
                  className="cursor-pointer"
                  onClick={() => setIsHelpOpen(false)}
                />
              </div>
              <div className="flex flex-col gap-[30px] items-center my-[40px] mx-[140px]">
                <Title>펀디를 소개합니다!</Title>
                <img src={FundiIcon} alt="Fundi Icon" className="w-20 h-20" />
                <div className="flex flex-col gap-[10px]">
                  <MediumFont>
                    <span className="text-main font-bold">펀디</span>는 펀딩을
                    도와주는 당신의 든든한 친구예요!
                  </MediumFont>
                  <MediumFont>• 프로젝트 타겟층에 맞는 분석도 척척!</MediumFont>
                  <MediumFont>
                    • 궁금한 점을 물어보면 쉽고 친절하게 설명해요.
                  </MediumFont>
                  <MediumFont>
                    • 누구나 쉽게 펀딩에 도전할 수 있도록 도와드릴게요.
                  </MediumFont>
                </div>
              </div>
            </Modal>
          </div>
          <InputTextArea
            placeholder="내용을 입력하세요."
            width="w-full"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {isSubmit && content.trim().length === 0 && (
            <WarningText>내용을 입력하세요.</WarningText>
          )}
        </div>

        <div className="flex flex-col gap-[20px]">
          <SubTitle>카테고리와 타겟층을 선택하세요</SubTitle>
          <div className="flex gap-[20px]">
            <Category
              title={filters[0].title}
              options={filters[0].options}
              selected={category}
              onSelect={setCategory}
            />
            <Category
              title={filters[1].title}
              options={filters[1].options}
              selected={gender}
              onSelect={setGender}
            />
            <Category
              title={filters[2].title}
              options={filters[2].options}
              selected={age}
              onSelect={setAge}
            />
          </div>
          {isSubmit && (!category || !gender || !age) && (
            <WarningText>카테고리와 타켓층을 선택하세요.</WarningText>
          )}
        </div>

        <div className="flex justify-end">
          <MainButton label="다음" width="w-[200px]" onClick={handleNext} />
        </div>
      </Wrapper>
    </Layout>
  );
};

export default AskFundi;

// 임시 데이터
const markdownString = {
  expanded_Idea:
    '# 🐶 20대 1인 가구 여성을 위한 펀딩 아이디어 \n### 20세대들을 위한 반려동물 장난감에 대한 펀딩 아이디어야. 강아지가 물어뜯어도 튼튼하고 고장나지 않는 장난감 아이디어를 찾고싶어에서 핵심 키워드 추출하여 제목으로\n\n---\n\n## 📈 1. 시장 동향 및 성장성 \n- 20세대의 반려동물 문화가 확산 중인 트렌드에 힘입어 관련 시장 규모가 확대될 전망\n- 2025년까지 반려동물 시장 규모는 15조원에 달할 것으로 예측\n\n## 🧪 2. 관련 특허 아이디어 \n- 강아지의 물어뜯음에 저항하는 반려동물 장난감 관련 특허 (예: 특허번호 10-2020-0123456)\n\n## 🌟 3. 세부 펀딩 아이디어 \n### A. 제품 아이디어 A - 튼튼한 강아지 장난감 "강이지" \n- 강아지의 물어뜯음을 고려한 튼튼한 재료 사용\n- 다양한 모양과 크기 제공\n### B. 제품 아이디어 B - 교감형 강아지 장난감 "파워펫" \n- 강아지와 소통하는 교감형 인터페이스 제공\n- 강아지의 심리 상태를 고려한 스타일러 제공\n\n## 🎯 4. 타깃 전략 \n- 20대 1인 가구 여성의 라이프 스타일에 맞춤된 디자인 및 사용 편의성 제공\n- SNS를 통한 마케팅 및 소셜 미디어 영향력자와의 협업\n\n## 📊 5. 통계 기반 타당성 \n- 1인 가구 비중이 35%에 달하는 현재의 주거 형태에 맞춤된 제품 제공\n- 20대 여성의 70%가 반려동물을 키우는 것으로 조사됨\n\n## ✅ 6. 추진 일정 \n| 단계 | 주요 내용 |\n|------|----------|\n| 리서치 | 시장 조사, 타깃 조사 등 |\n| 디자인 | 프로토타입 설계, 제품 디자인 등 |\n| 테스트 | 사용자 피드백, 제품 테스트 등 |\n| 캠페인 | SNS, 마케팅, 인플루언서와의 협업 등 |\n\n---\n\n## 💡 요약 \n- 20대 1인 가구 여성의 라이프 스타일에 맞춤된 튼튼한 강아지 장난감 제공\n- 시장성, 제품성, 실행 가능성까지 고려한 펀딩 아이디어 제안',
};
