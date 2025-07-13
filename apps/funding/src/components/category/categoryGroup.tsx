import type { Filter } from '../../types/createFunding.types';
import Category from './category';
import { CategoriesWrapper } from './category.styles';

interface Props {
  filters: Filter[];
  category: string | null;
  setCategory: (value: string) => void;
  gender: string | null;
  setGender: (value: string) => void;
  age: string | null;
  setAge: (value: string) => void;
}

const CategoryGroup = ({
  filters,
  category,
  setCategory,
  gender,
  setGender,
  age,
  setAge,
}: Props) => {
  return (
    <CategoriesWrapper>
      <Category
        title={filters[0].title}
        options={filters[0].options}
        selected={category}
        onSelect={setCategory}
      />
      <Category
        title={filters[1].title}
        options={filters[1].options}
        selected={gender}
        onSelect={setGender}
      />
      <Category
        title={filters[2].title}
        options={filters[2].options}
        selected={age}
        onSelect={setAge}
      />
    </CategoriesWrapper>
  );
};

export default CategoryGroup;
