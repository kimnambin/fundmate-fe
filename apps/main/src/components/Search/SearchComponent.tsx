import { VerticalCard } from "@repo/ui/components"
import { SearchContainer } from "../../styles/SearchContainer.style"
import { range } from "../../utils/tempRange"
import { SearchHeader } from "./SearchHeader"
import { useSearchParams } from "react-router-dom"

export const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const queryKey = Array.from(searchParams.keys());
  const isCategory = queryKey.includes('category');
  const isSearch = queryKey.includes('query');
  let queryValue;
  if (isCategory) {
    queryValue = searchParams.get('category');
  }
  if (isSearch) {
    queryValue = searchParams.get("query");
  }


  return (
    <>
      <SearchHeader isCategory={isCategory} isSearch={isSearch} queryValue={queryValue} />
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
