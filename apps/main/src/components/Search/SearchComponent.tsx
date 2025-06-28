import { VerticalCard } from "@repo/ui/components"
import { SearchContainer } from "../../styles/SearchContainer.style"
import { range } from "../../utils/tempRange"
import { SearchHeader } from "./SearchHeader"
import { useSearchParams } from "react-router-dom"

export const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const queryKey = Array.from(searchParams.keys());
  const isCategory = queryKey.includes('category');
  let menuName;
  if (isCategory) {
    menuName = searchParams.get('category');
  }

  return (
    <>
      <SearchHeader isCategory={isCategory} menuName={menuName} />
      <SearchContainer>
        {
          range(50).map(i => (
            <div key={i}>
              <VerticalCard />
            </div>
          ))
        }
      </SearchContainer>
    </>
  )
}
