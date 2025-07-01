import { Wrapper } from './askFundi.styles';
import HelpIcon from '../../assets/icons/ic_help.svg';
import InputTextArea from '../../components/input-text-area/inputTextArea';
import { SubTitle, Title } from '../../style/typography';
import Category from '../../components/category/category';
import { filters } from '../createFunding/createFunding';
import MainButton from '../../components/main-button/mainButton';
import Modal from '../../components/modal/modal';
import { useState } from 'react';
import FundiIcon from '../../assets/icons/ic_fundi.svg';
import { IoClose } from 'react-icons/io5';

const AskFundi = () => {
  const [isHelopOpen, setIsHelpOpen] = useState(false);

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
                <p>
                  <span className="text-main font-bold">펀디</span>는 펀딩을
                  도와주는 당신의 든든한 친구예요!
                </p>
                <p>• 프로젝트 타겟층에 맞는 분석도 척척!</p>
                <p>• 궁금한 점을 물어보면 쉽고 친절하게 설명해요.</p>
                <p>• 누구나 쉽게 펀딩에 도전할 수 있도록 도와드릴게요.</p>
              </div>
            </div>
          </Modal>
        </div>
        <InputTextArea
          placeholder="내용을 입력하세요."
          width="w-full"
          rows={5}
        />
      </div>

      <div className="flex flex-col gap-[20px]">
        <SubTitle>카테고리와 타겟층을 선택하세요</SubTitle>
        <div className="flex gap-[20px]">
          {filters.map((filter) => (
            <Category
              key={filter.title}
              title={filter.title}
              options={filter.options}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <MainButton label="다음" width="w-[200px]" />
      </div>
    </Wrapper>
  );
};

export default AskFundi;
