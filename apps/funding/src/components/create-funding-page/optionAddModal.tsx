import { IoClose } from 'react-icons/io5';
import { Title } from '@repo/ui/styles';
import InputText from '../input-text/inputText';
import InputTextArea from '../input-text-area/inputTextArea';
import { MainButton, Modal } from '@repo/ui/components';
import { formatPrice } from '@repo/ui/utils';

interface Props {
  isAddOpen: boolean;
  setIsAddOpen: (value: boolean) => void;
  isAdd: boolean;
  optionTitle: string;
  setOptionTitle: (value: string) => void;
  optionContent: string;
  setOptionContent: (value: string) => void;
  optionPrice: string;
  setOptionPrice: (value: string) => void;
  handleAdd: () => void;
}

const OptionAddModal = ({
  isAddOpen,
  setIsAddOpen,
  isAdd,
  optionTitle,
  setOptionTitle,
  optionContent,
  setOptionContent,
  optionPrice,
  setOptionPrice,
  handleAdd,
}: Props) => {
  return (
    <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)}>
      <div className="flex justify-end">
        <IoClose
          size={24}
          className="cursor-pointer"
          onClick={() => setIsAddOpen(false)}
        />
      </div>
      <div className="flex flex-col gap-5  w-[70vw] sm:w-[440px]">
        <Title>상품 추가</Title>
        <InputText
          placeholder="상품명을 입력하세요."
          value={optionTitle}
          onChange={(e) => setOptionTitle(e.target.value)}
          isError={isAdd && optionTitle.trim().length === 0}
        />
        <InputTextArea
          placeholder="상품 내용을 입력하세요."
          rows={5}
          value={optionContent}
          onChange={(e) => setOptionContent(e.target.value)}
          isError={isAdd && optionContent.trim().length === 0}
        />
        <InputText
          placeholder="상품 금액을 입력하세요."
          value={optionPrice}
          onChange={(e) => setOptionPrice(formatPrice(e.target.value))}
          isError={isAdd && optionPrice.trim().length === 0}
        />
        <div className="flex justify-end">
          <MainButton
            label="상품 추가하기"
            width="w-[200px]"
            className="cursor-pointer hover:opacity-50"
            onClick={handleAdd}
          />
        </div>
      </div>
    </Modal>
  );
};

export default OptionAddModal;
