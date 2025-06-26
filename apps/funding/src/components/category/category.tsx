import { Wrapper, Title, Option, OptionsWrapper } from './category.styles';
import { FaChevronDown } from 'react-icons/fa';

interface Props {
  title: string;
  options: string[];
}

const Category = ({ title, options }: Props) => {
  return (
    <Wrapper>
      <Title>
        {title}
        <FaChevronDown fill="#000" size={12} />
      </Title>
      <OptionsWrapper>
        {options.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </OptionsWrapper>
    </Wrapper>
  );
};

export default Category;
