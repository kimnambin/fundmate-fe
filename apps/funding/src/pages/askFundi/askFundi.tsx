import { Wrapper } from './askFundi.styles';
import HelpIcon from '../../assets/icons/ic_help.svg';
import InputTextArea from '../../components/input-text-area/inputTextArea';
import {
  MediumFont,
  SubTitle,
  Title,
  WarningText,
} from '../../style/typography';
import Category from '../../components/category/category';
import { filters } from '../createFunding/createFunding';
import MainButton from '../../components/main-button/mainButton';
import Modal from '../../components/modal/modal';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Loading } from '@repo/ui/components';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../style/layout';
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
        message: markdownString,
      };

      navigate('/ask-fundi/result', { state: response });
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
const markdownString =
  '## 🎯 사용자 입력 (예시)\n' +
  '- **카테고리**: 의류\n' +
  '- **타겟층**: 20대 여성, 1인 가구\n' +
  '- **초기 아이디어**:\n' +
  '> “퇴근하고 집에서 간편하게 입을 수 있는 홈웨어 브랜드 런칭. 감성 디자인과 편안함을 추구.”\n\n' +
  '---\n\n' +
  '## 🔎 공공데이터 기반 분석 결과 & 아이디어 고도화\n\n' +
  '### 1️⃣ 타겟층 인구 분포 (출처: KOSIS, 통계청)\n' +
  '**20대 여성 1인 가구 비율 상위 지역:**\n' +
  '- 서울 관악구 (22.1%)\n' +
  '- 서울 마포구 (18.5%)\n' +
  '- 경기 고양시 일산동구 (15.3%)\n\n' +
  '💡 **전략 제안**:\n' +
  '타겟층 밀집 지역인 관악구, 마포구 근방에서 오프라인 팝업스토어를 먼저 운영하거나, 지역 한정 프로모션 실행\n' +
  '→ *"서울 1인가구 여성 전용 홈웨어 체험존"* 등\n\n' +
  '---\n\n' +
  '### 2️⃣ 생활 습관 및 소비 성향 데이터\n' +
  '*(출처: 서울 열린데이터광장, 통계청 1인가구 라이프스타일 조사)*\n\n' +
  '**20대 여성 1인 가구의 주요 특징:**\n' +
  '- 배달 이용률 높음\n' +
  '- 거주 공간이 협소함 (원룸·오피스텔 중심)\n' +
  '- 홈카페/홈인테리어 소비 성향 있음\n' +
  '- 세탁 빈도가 낮고 관리가 쉬운 옷 선호\n\n' +
  '💡 **제품 개선 제안**:\n' +
  '- 구김 적고 건조 빠른 소재의 홈웨어  → *"세탁기 돌려도 늘어지지 않는 데일리 세트"*\n' +
  '- 보관이 쉬운 미니멀 접이형 포장  → *"1인실 수납 최적화 패키지"*\n' +
  '- 홈카페 컨셉과 연결한 디자인  → *"바닐라라떼 파자마"*, *"오트밀 체크세트"*\n\n' +
  '---\n\n' +
  '### 3️⃣ 의류 관련 유사 특허 검색 (출처: KIPRIS Plus)\n\n' +
  '**유사 특허 1:**\n' +
  '- **제목**: 냉감 기능성 실내복\n' +
  '- **요약**: 통기성 원단에 항균 처리를 추가한 실내용 의류\n\n' +
  '**유사 특허 2:**\n' +
  '- **제목**: 반려동물 털 방지 홈웨어\n' +
  '- **요약**: 정전기 방지 및 털 부착 방지 섬유로 제작된 의류\n\n' +
  '💡 **특허 회피 & 확장 제안**:\n' +
  '- 소재 차별화: 기존 특허는 항균/냉감 위주 → **보풀 방지·무자극 라인 런칭 가능**\n' +
  '- 기능성 확대: **반려동물 유무에 따라 선택 가능한 소재 옵션 제시**\n\n' +
  '---\n\n' +
  '## 🔧 최종 고도화된 펀딩 제안\n\n' +
  '### 📌 제목\n' +
  '**“좁은 방에도 잘 어울리는, 20대 여성 1인 가구를 위한 미니멀 홈웨어 브랜드 [LoungeYou]”**\n\n' +
  '### 💎 핵심 차별점\n' +
  '- 공간절약형 패키징\n' +
  '- 원룸 환경 고려한 통기성과 내구성\n' +
  '- 생활패턴 기반 스타일 분류 (아침형/밤형 세트)\n' +
  '- 펫유저용 라인과 비펫유저용 라인 분리\n';
