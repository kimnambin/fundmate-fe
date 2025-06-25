import { MainGrid } from "../../styles/MainContainer.style"
import { Banner } from "./Banner";
import { InterestingItems } from "./InterestingItems";
import { LatestItems } from "./LatestItems";
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
      <LatestItems />
    </>
  )
}
