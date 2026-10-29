import { Banner } from './Banner';
import { InterestingItems } from './InterestingItems';
import { MainCategory } from './MainCategory';
import { PopularItems } from './PopularItems';

export const MainContainer = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <Banner isLoading={false} />
      <MainCategory />
      {/* 좌우 분할(추천 3개 vs 인기 5개) 대신 세로로 쌓아 섹션 간 높이 불균형을 없앴다. */}
      <InterestingItems />
      <PopularItems />
    </div>
  );
};
