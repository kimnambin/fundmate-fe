import { useState } from 'react';
import { Wrapper, Title, Option } from './category.styles';
import { FaChevronDown } from 'react-icons/fa';

interface Props {
  title: string;
  options: string[];
}

const Category = ({ title, options }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

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
            onClick={() => setSelected(option)}
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
