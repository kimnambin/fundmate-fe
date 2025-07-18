import { Link } from "react-router-dom";
import { CategoryImage, SingleCategoryContainer } from "../../styles/Category/SingleCategory.style";
import { SubTitle } from "@repo/ui/styles";

interface SingleCategoryProps {
  imgPath: string;
  name: string;
  location: 'main' | 'bar';
  id: number;
}

export const SingleCategory = ({ imgPath, name, location, id }: SingleCategoryProps) => {
  return (
    <Link to={`/search?category=${id}`} state={{ menuName: name }}>
      <SingleCategoryContainer>
        <CategoryImage src={imgPath} $location={location} />
        <SubTitle>{name}</SubTitle>
      </SingleCategoryContainer>
    </Link>

  )
}
