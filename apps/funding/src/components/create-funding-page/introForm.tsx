import MarkdownEditor from '@uiw/react-markdown-editor';
import { Label } from '../input-text/inputText.styles';
import { Wrapper } from './createFunding.styles';
import { WarningText } from '@repo/ui/styles';
import { MainButton } from '@repo/ui/components';
import FundiModal from './fundiModal';

interface Props {
  description: string;
  setDescription: (value: string) => void;
  isSubmit: boolean;
  isFundiOpen: boolean;
  setIsFundiOpen: (value: boolean) => void;
  summaryRef: React.RefObject<HTMLParagraphElement | null>;
  copied: boolean;
  handleCopy: () => void;
}

const IntroForm = ({
  description,
  setDescription,
  isSubmit,
  isFundiOpen,
  setIsFundiOpen,
  summaryRef,
  copied,
  handleCopy,
}: Props) => {
  return (
    <Wrapper>
      <Label>프로젝트 소개</Label>
      <div data-color-mode="light">
        <MarkdownEditor
          value={description}
          height="400px"
          placeholder={'프로젝트(펀딩)에 대한 설명을 작성해주세요!'}
          onChange={setDescription}
        />
      </div>
      {isSubmit && description.trim().length === 0 && (
        <WarningText>프로젝트 소개를 작성해주세요.</WarningText>
      )}

      <div className="w-auto flex justify-end">
        <MainButton
          width="w-[200px]"
          label="AI 요약"
          onClick={() => setIsFundiOpen(true)}
        />
      </div>

      <FundiModal
        isFundiOpen={isFundiOpen}
        setIsFundiOpen={setIsFundiOpen}
        description={description}
        summaryRef={summaryRef}
        copied={copied}
        handleCopy={handleCopy}
      />
    </Wrapper>
  );
};

export default IntroForm;
