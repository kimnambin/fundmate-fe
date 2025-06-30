import { CategoryImage, CategoryText, SingleCategoryContainer } from "../../styles/Category/SingleCategory.style";

interface SingleCategoryProps {
  id: number;
  imgPath: string;
  name: string;
  location: 'main' | 'bar';
}

export const SingleCategory = ({ id, imgPath, name, location }: SingleCategoryProps) => {
  return (
    <SingleCategoryContainer id={id.toString()}>
      <CategoryImage src={imgPath} $location={location} />
      <CategoryText>{name}</CategoryText>
    </SingleCategoryContainer>

  )
}
