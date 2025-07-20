import type { Filter } from '../../types/createFunding.types';
import Category from './category';
import { CategoriesWrapper } from './category.styles';

interface CategoryConfig {
  filter: Filter;
  value: number | null;
  onSelect: (val: number) => void;
}

interface Props {
  configs: CategoryConfig[];
}

const CategoryGroup = ({ configs }: Props) => {
  return (
    <CategoriesWrapper>
      {configs.map(({ filter, value, onSelect }) => (
        <Category
          key={filter.title}
          title={filter.title}
          options={filter.options}
          selected={value}
          onSelect={onSelect}
        />
      ))}
    </CategoriesWrapper>
  );
};

export default CategoryGroup;
