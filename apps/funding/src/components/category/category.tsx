import { FaChevronDown } from 'react-icons/fa';
import { Option, Title, Wrapper } from './category.styles';

interface Props {
  title: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

const Category = ({ title, options, selected, onSelect }: Props) => {
  return (
    <Wrapper>
      <Title>
        {title}
        <FaChevronDown fill="#000" size={10} />
      </Title>

      <ul>
        {options.map((option) => (
          <Option
            key={option}
            onClick={() => onSelect(option)}
            className={
              selected === option ? 'text-main font-bold' : 'text-text-active'
            }
          >
            {option}
          </Option>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Category;
