import { FaChevronDown } from 'react-icons/fa';
import { Option, CategoryTitle, Wrapper } from './category.styles';
import type { FilterOption } from '../../types/createFunding.types';

interface Props {
  title: string;
  options: FilterOption[];
  selected: number | null;
  onSelect: (value: number) => void;
}

const Category = ({ title, options, selected, onSelect }: Props) => {
  return (
    <Wrapper>
      <CategoryTitle>
        {title}
        <FaChevronDown fill="#000" size={10} />
      </CategoryTitle>

      <ul>
        {options.map((option) => (
          <Option
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={
              selected === option.id
                ? 'text-main font-bold'
                : 'text-text-active'
            }
          >
            {option.label}
          </Option>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Category;
