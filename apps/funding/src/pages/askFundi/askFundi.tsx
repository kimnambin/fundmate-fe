import { FundiIcon } from '@repo/ui/assets';
import { Loading, MainButton, Modal } from '@repo/ui/components';
import {
  Layout,
  MediumFont,
  SubTitle,
  Title,
  WarningText,
} from '@repo/ui/styles';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import HelpIcon from '../../assets/icons/ic_help.svg';
import CategoryGroup from '../../components/category/categoryGroup';
import InputTextArea from '../../components/input-text-area/inputTextArea';
import { useCategoryConfigs } from '../../hooks/useCategoryConfigs';
import { Wrapper } from './askFundi.styles';
import { useAiRequest } from '../../hooks/useAiRequest';
import type {
  Age,
  aiRequestData,
  Category,
  Gender,
} from '../../types/aiRequest.types';

const AskFundi = () => {
  const [isHelopOpen, setIsHelpOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    configs,
    category,
    gender,
    age,
    categoryLabel,
    genderLabel,
    ageLabel,
  } = useCategoryConfigs();
  const { mutateAsync: aiRequest } = useAiRequest();

  const isValid = category && gender && age && content.trim().length > 0;

  const navigate = useNavigate();

  const handleNext = async () => {
    setIsSubmit(true);
    if (!isValid) return;
    setIsLoading(true);
    if (isError) setIsError(false);

    try {
      const requestData: aiRequestData = {
        input_text: content,
        category: categoryLabel as Category,
        gender: genderLabel as Gender,
        age_ground: ageLabel as Age,
      };

      const response = await aiRequest(requestData);
      const idea = response.expanded_Idea?.trim();

      if (idea && !idea.includes('아이디어를 제대로 입력해주세요')) {
        navigate('/fundi/response', {
          state: { message: idea },
        });
      } else {
        setIsError(true);
      }
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
          {isError && (
            <WarningText>아이디어를 제대로 입력해주세요.</WarningText>
          )}
        </div>

        <div className="flex flex-col gap-[20px]">
          <SubTitle>카테고리와 타겟층을 선택하세요</SubTitle>
          <CategoryGroup configs={configs} />
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
