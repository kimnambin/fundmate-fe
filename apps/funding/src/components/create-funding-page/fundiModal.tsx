import { FundiIcon } from '@repo/ui/assets';
import { Modal } from '@repo/ui/components';
import { MediumFont, Title } from '@repo/ui/styles';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { HorizontalLine } from '../../pages/createFunding/createFunding.styles';

interface Props {
  isFundiOpen: boolean;
  setIsFundiOpen: (value: boolean) => void;
  description: string;
  summaryRef: React.RefObject<HTMLParagraphElement | null>;
  copied: boolean;
  handleCopy: () => void;
}

const FundiModal = ({
  isFundiOpen,
  setIsFundiOpen,
  description,
  summaryRef,
  copied,
  handleCopy,
}: Props) => {
  return (
    <Modal isOpen={isFundiOpen} onClose={() => setIsFundiOpen(false)}>
      <div className="flex justify-end">
        <IoClose
          size={24}
          className="cursor-pointer"
          onClick={() => setIsFundiOpen(false)}
        />
      </div>
      <div className="flex flex-col gap-5 min-w-[400px] max-w-[80vw]">
        <div className="flex flex-col gap-[10px]">
          <Title>내가 입력한 내용</Title>
          {description ? (
            <div
              data-color-mode="light"
              className="max-h-[200px] overflow-y-scroll relative custom-scroll"
            >
              <MarkdownEditor.Markdown source={description} />
            </div>
          ) : (
            <MediumFont className="text-sub-text">
              입력한 내용이 없습니다.
            </MediumFont>
          )}
        </div>
        <HorizontalLine />
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-2">
            <Title>펀디가 추천하는 한 줄 소개</Title>
            <img src={FundiIcon} width="20px" />
          </div>
          <MediumFont ref={summaryRef} className="break-words">
            펀디가 요약한 내용
          </MediumFont>
        </div>
        <div className="flex justify-end">
          {copied ? (
            <FiCheck size={24} className="text-main" />
          ) : (
            <FiCopy
              size={24}
              className=" text-main cursor-pointer hover:opacity-50"
              onClick={handleCopy}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FundiModal;
