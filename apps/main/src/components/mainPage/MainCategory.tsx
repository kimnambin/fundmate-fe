import { MainCategoryContainer } from '../../styles/MainPageComponents.style';
import { SingleCategory } from './SingleCategory';
import { CategoryIcons } from '@repo/ui/assets'

export const MainCategory = () => {
  const { menu, ...mainPageCategoryIcons } = CategoryIcons;
  return (
    <MainCategoryContainer>
      {
        Object.entries(mainPageCategoryIcons).map(([name, { src, menuName }], i) => (
          <SingleCategory key={name} id={i} imgPath={src} name={menuName} />
        ))
      }
    </MainCategoryContainer>
  )
}

