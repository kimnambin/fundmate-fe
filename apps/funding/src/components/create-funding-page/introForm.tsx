import { lazy, Suspense } from 'react';
import { Label } from '../input-text/inputText.styles';
import { Wrapper } from './createFunding.styles';
import { WarningText } from '@repo/ui/styles';
import { MainButton } from '@repo/ui/components';
import FundiModal from './fundiModal';
import { useAiSummarize } from '../../hooks/useAiSummarize';

const MarkdownEditor = lazy(
  () => import('@uiw/react-md-editor/nohighlight'),
);

interface Props {
  description: string;
  setDescription: (value: string) => void;
  aiSummary: string;
  setAiSummary: (value: string) => void;
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
  aiSummary,
  setAiSummary,
  isSubmit,
  isFundiOpen,
  setIsFundiOpen,
  summaryRef,
  copied,
  handleCopy,
}: Props) => {
  const { mutate: aiSummarize } = useAiSummarize();

  const handleAISummarize = () => {
    aiSummarize(
      { message: description },
      {
        onSuccess: (res) => {
          setAiSummary(res.summary);
        },
        onError: (err) => {
          alert('ai 요약 실패');
          console.error('ai요약 실패: ', err);
        },
      },
    );
    setIsFundiOpen(true);
  };

  return (
    <Wrapper>
      <Label>프로젝트 소개</Label>
      <div data-color-mode="light">
        <Suspense fallback={<div className="h-[400px]" />}>
          <MarkdownEditor
            value={description}
            height="400px"
            textareaProps={{
              placeholder: '프로젝트(펀딩)에 대한 설명을 작성해주세요!',
            }}
            onChange={(value) => setDescription(value ?? '')}
          />
        </Suspense>
      </div>
      {isSubmit && description.trim().length === 0 && (
        <WarningText>프로젝트 소개를 작성해주세요.</WarningText>
      )}

      <div className="w-auto flex justify-end">
        <MainButton
          width="w-[200px]"
          label="AI 요약"
          onClick={handleAISummarize}
        />
      </div>

      <FundiModal
        isFundiOpen={isFundiOpen}
        setIsFundiOpen={setIsFundiOpen}
        description={description}
        aiSummary={aiSummary}
        summaryRef={summaryRef}
        copied={copied}
        handleCopy={handleCopy}
      />
    </Wrapper>
  );
};

export default IntroForm;
