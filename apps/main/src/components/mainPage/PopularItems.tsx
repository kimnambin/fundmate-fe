import { HorizontalCard } from "@repo/ui/mainPage/HorizontalCard"
import { range } from "../../utils/tempRange"
import { PopularItemsContainer, PopularItemsGrid, PopularItemsHeader } from "../../styles/MainPageComponents.style"

export const PopularItems = () => {
  return (
    <PopularItemsContainer>
      <PopularItemsHeader>
        <div className="flex flex-col items-start">
          <span className="text-xl font-semibold">인기 프로젝트</span>
          <span className="text-base text-gray-400">2025.06.17 00:00 기준</span>
        </div>
        <a href="#" className="text-base text-gray-400">전체보기</a>
      </PopularItemsHeader>
      <PopularItemsGrid>
        {
          range(9).map(i => (
            <HorizontalCard number={i.toString()} />
          ))
        }
      </PopularItemsGrid>
    </PopularItemsContainer>
  )
}
