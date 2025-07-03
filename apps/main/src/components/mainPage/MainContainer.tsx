import { MainGrid } from "../../styles/Main/MainContainer.style"
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
    </>
  )
}
