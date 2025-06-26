import { Price, Wrapper } from './addedItem.styles';
import { IoClose } from 'react-icons/io5';

interface Props {
  price: string;
  title: string;
  content: string;
}

const AddedItem = ({ price, title, content }: Props) => {
  return (
    <Wrapper>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Price>{price}</Price>
          <IoClose size={20} className="cursor-pointer" />
        </div>
        <p>{title}</p>
      </div>
      <p className="text-sub-text">{content}</p>
    </Wrapper>
  );
};

export default AddedItem;
