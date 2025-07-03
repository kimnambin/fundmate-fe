import { MediumFont } from '../../style/typography';
import { Price, Wrapper } from './addedItem.styles';
import { IoClose } from 'react-icons/io5';

interface Props {
  price: string;
  title: string;
  content: string;
  onRemove: () => void;
}

const AddedItem = ({ price, title, content, onRemove }: Props) => {
  return (
    <Wrapper>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Price>{price}</Price>
          <IoClose size={20} className="cursor-pointer" onClick={onRemove} />
        </div>
        <MediumFont>{title}</MediumFont>
      </div>
      <MediumFont className="text-sub-text whitespace-pre-line">
        {content}
      </MediumFont>
    </Wrapper>
  );
};

export default AddedItem;
