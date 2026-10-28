import { Banner } from './Banner';
import { InterestingItems } from './InterestingItems';
import { MainCategory } from './MainCategory';
import { PopularItems } from './PopularItems';

export const MainContainer = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <Banner isLoading={false} />
      <MainCategory />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        <div className="min-w-0 flex-1">
          <InterestingItems />
        </div>
        <div className="w-full lg:w-[420px] lg:shrink-0">
          <PopularItems />
        </div>
      </div>
    </div>
  );
};
