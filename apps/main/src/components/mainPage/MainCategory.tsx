import { MainCategoryContainer } from '../../styles/MainPageComponents.style';
import categoryData from '../../utils/mainPageCategory.json'
import { SingleCategory } from './SingleCategory';

const icons = import.meta.glob('../../assets/icons/mainPageCategory/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const MainCategory = () => {
  return (
    <MainCategoryContainer>
      {
        categoryData.map((v, i) => {
          const imgPath = icons[`../../assets/icons/mainPageCategory/${v.imgName}`]
          return (
            <SingleCategory id={i} imgPath={imgPath} name={v.name} />
          )
        })
      }
    </MainCategoryContainer>
  )
}
