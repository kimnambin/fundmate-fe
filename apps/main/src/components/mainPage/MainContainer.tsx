import { MainGrid } from "../../styles/MainContainer.style"
import { Banner } from "./Banner";
import { InterestingItems } from "./InterestingItems";
import { SwiperComponents } from "./SwiperComponent";
import { MainCategory } from "./MainCategory";
import { PopularItems } from "./PopularItems";


export const MainContainer = () => {
  return (
    <>
      <MainGrid>
        <Banner />
        <MainCategory />
        <InterestingItems />
        <PopularItems />
      </MainGrid>
      <div className="flex flex-col gap-20 mb-36">
        <SwiperComponents componentId={1} componentName="최근 본 프로젝트" />
        <SwiperComponents componentId={2} componentName="마감 임박 프로젝트" />
        <SwiperComponents componentId={3} componentName="신규 프로젝트" />
      </div>
    </>
  )
}
