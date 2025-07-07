import { HorizontalCard } from "@repo/ui/components"
import { range } from "../../utils/tempRange"
import { PopularItemsContainer, PopularItemsGrid, PopularItemsHeader } from "../../styles/Main/MainPageComponents.style"
import { Link } from "react-router-dom"
import { MediumFont, Title } from "@repo/ui/styles"

export const PopularItems = () => {
  return (
    <PopularItemsContainer>
      <PopularItemsHeader>
        <div className="flex flex-col items-start">
          <Title>인기 프로젝트</Title>
          <MediumFont className="text-gray-400">2025.06.17 00:00 기준</MediumFont>
        </div>
        <Link to='/search?popular=1' className="text-base text-gray-400">
          <MediumFont>
            전체보기
          </MediumFont>
        </Link>
      </PopularItemsHeader>
      <PopularItemsGrid>
        {
          range(9).map(i => (
            <div key={i}>
              <HorizontalCard number={i.toString()} />
            </div>
          ))
        }
      </PopularItemsGrid>
    </PopularItemsContainer>
  )
}
