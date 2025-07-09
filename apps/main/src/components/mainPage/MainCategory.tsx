import { MainCategoryContainer } from '../../styles/Main/MainPageComponents.style';
import { SingleCategory } from './SingleCategory';
import { CategoryIcons } from '@repo/ui/assets'

export const MainCategory = () => {
  const { menu: _, ...mainPageCategoryIcons } = CategoryIcons;
  return (
    <MainCategoryContainer>
      {
        Object.entries(mainPageCategoryIcons).map(([name, { src, menuName }]) => (
          <SingleCategory key={name} imgPath={src} name={menuName} location='main' />
        ))
      }
    </MainCategoryContainer>
  )
}

