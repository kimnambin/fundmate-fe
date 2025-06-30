import { CategoryIcons } from "@repo/ui/assets"
import { SingleCategory } from "../mainPage/SingleCategory"
import { CategoryBarContainer } from "../../styles/Category/CategoryBar.style"

export const CategoryBar = () => {
  return (
    <CategoryBarContainer>
      {
        Object.entries(CategoryIcons).map(([name, { src, menuName }], i) => (
          <SingleCategory id={i} key={i} imgPath={src} name={menuName} location="bar" />
        ))
      }
    </CategoryBarContainer>
  )
}
