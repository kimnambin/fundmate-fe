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
import FundiIcon from '../../assets/icons/ic_fundi.svg';
import { IoClose } from 'react-icons/io5';
import { Loading } from '@repo/ui/Loading';

const AskFundi = () => {
  const [isHelopOpen, setIsHelpOpen] = useState(false);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [family, setFamily] = useState<string | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = category && family && age && content.trim().length > 0;

  const handleNext = async () => {
    setIsSubmit(true);
    if (!isValid) return;
    setIsLoading(true);

    try {
      // API 호출 로직
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 로딩 시물레이션
      // API 응답 처리
    } catch (error) {
      console.error('펀디 요청 실패 :', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
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
            selected={family}
            onSelect={setFamily}
          />
          <Category
            title={filters[2].title}
            options={filters[2].options}
            selected={age}
            onSelect={setAge}
          />
        </div>
        {isSubmit && (!category || !family || !age) && (
          <WarningText>카테고리와 타켓층을 선택하세요.</WarningText>
        )}
      </div>

      <div className="flex justify-end">
        <MainButton label="다음" width="w-[200px]" onClick={handleNext} />
      </div>
    </Wrapper>
  );
};

export default AskFundi;
