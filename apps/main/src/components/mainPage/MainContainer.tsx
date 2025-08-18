import { MainFlex } from '../../styles/Main/MainPageComponents.style';
import { Banner } from './Banner';
import { InterestingItems } from './InterestingItems';
import { MainCategory } from './MainCategory';
import { PopularItems } from './PopularItems';

export const MainContainer = () => {
  return (
    <MainFlex className="flex-col lg:flex-row">
      <div className="flex flex-col gap-10 shrink grow">
        <Banner isLoading={false} />
        <MainCategory />
        <InterestingItems />
      </div>
      <div className="flex shrink-0 grow-0 basis-[450px]">
        <PopularItems />
      </div>
    </MainFlex>
  );
};
