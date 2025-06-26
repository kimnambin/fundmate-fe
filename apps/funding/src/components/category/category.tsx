import { Wrapper, Title, Option } from './category.styles';
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
        <FaChevronDown fill="#000" size={10} />
      </Title>

      <ul>
        {options.map((option) => (
          <Option key={option}>{option}</Option>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Category;
