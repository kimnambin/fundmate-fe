import { Link } from 'react-router-dom';
import {
  CategoryImage,
  SingleCategoryContainer,
} from '../../styles/Category/SingleCategory.style';
import { SubTitle } from '@repo/ui/styles';
import { useIsMobile } from '@repo/ui/hooks';

interface SingleCategoryProps {
  imgPath: string;
  name: string;
  location: 'main' | 'bar';
  id: number;
}

export const SingleCategory = ({
  imgPath,
  name,
  location,
  id,
}: SingleCategoryProps) => {
  const isMobile = useIsMobile();

  return (
    <Link to={`/search?category=${id + 1}`} state={{ menuName: name }}>
      <SingleCategoryContainer>
        <CategoryImage src={imgPath} $location={location} />
        {isMobile ? (
          <></>
        ) : (
          <SubTitle className="text-[0px] lg:text-[16px]">{name}</SubTitle>
        )}
      </SingleCategoryContainer>
    </Link>
  );
};
