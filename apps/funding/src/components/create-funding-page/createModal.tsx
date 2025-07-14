import { MainButton, Modal } from '@repo/ui/components';
import { MediumFont, Title } from '@repo/ui/styles';
import PointButton from '../point-button/pointButton';

interface Props {
  isSubmitOpen: boolean;
  setIsSubmitOpen: (value: boolean) => void;
  handleCreate: () => void;
}

const CreateModal = ({
  isSubmitOpen,
  setIsSubmitOpen,
  handleCreate,
}: Props) => {
  return (
    <Modal isOpen={isSubmitOpen} onClose={() => setIsSubmitOpen(false)}>
      <div className="flex flex-col gap-5 justify-center py-[20px] px-[30px] w-[70vw] sm:w-auto">
        <div className="text-center flex flex-col gap-[10px]">
          <Title>개설 시 수정이 불가능합니다.</Title>
          <MediumFont>개설하시겠습니까?</MediumFont>
        </div>

        <div className="flex gap-[20px] justify-center">
          <PointButton
            label="아니오"
            width="w-[200px]"
            onClick={() => setIsSubmitOpen(false)}
          />
          <MainButton label="예" width="w-[200px]" onClick={handleCreate} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
