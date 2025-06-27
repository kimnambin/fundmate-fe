import { Header, VerticalCard } from "@repo/ui/components"
import { CategoryBar } from "../components/Search/CategoryBar"
import { SearchHeader } from "../components/Search/SearchHeader"
import { Layout } from "../styles/Layout.style"
import { SearchContainer } from "../styles/SearchContainer.style"
import { range } from "../utils/tempRange"

export const CategorySearch = () => {
  return (
    <>
      <Header />
      <Layout>
        <CategoryBar />
        <SearchHeader />
        <SearchContainer>
          {
            range(50).map(i => (
              <div key={i}>
                <VerticalCard />
              </div>
            ))
          }
        </SearchContainer>
      </Layout>
    </>
  )
}
