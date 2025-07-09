import { VerticalCard } from "@repo/ui/components"
import { SearchContainer } from "../../styles/Search/SearchContainer.style"
import { range } from "../../utils/tempRange"
import { SearchHeader } from "./SearchHeader"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

export const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const queryKey = Array.from(searchParams.keys());
  const isCategory = queryKey.includes('category');
  const isSearch = queryKey.includes('query');
  let queryValue;
  if (isCategory) {
    queryValue = searchParams.get('category');
  } else if (isSearch) {
    queryValue = searchParams.get("query");
  }

  useEffect(() => {
    console.log(queryKey);
  }, [queryKey])


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
