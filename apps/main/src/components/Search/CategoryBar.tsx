import { CategoryIcons } from "@repo/ui/assets"
import { SingleCategory } from "../mainPage/SingleCategory"
import { CategoryBarContainer } from "../../styles/Category/CategoryBar.style"

export const CategoryBar = () => {
  return (
    <CategoryBarContainer>
      {
        Object.entries(CategoryIcons).map(([name, { src, menuName }], i) => (
          <SingleCategory key={name} imgPath={src} name={menuName} id={i} location="bar" />
        ))
      }
    </CategoryBarContainer>
  )
}
