import tw from 'tailwind-styled-components';

export const MainFlex = tw.div`
  flex
  flex-row
  justify-stretch
  gap-10
  w-full
`;

//InterestingItems
export const InterestingItemsContainer = tw.div`
  flex
  flex-col
  gap-5
  w-full
`;

export const InterestingItemsGrid = tw.div`
  grid
  grid-cols-2
  md:grid-cols-3
  gap-4
`;

//MainCategory
export const MainCategoryContainer = tw.div`
  grid
  grid-cols-4
  lg:grid-cols-8
  justify-items-center
  items-start
  gap-x-3
  gap-y-6
`;

//PopularItems
export const PopularItemsContainer = tw.div`
  flex
  flex-col
  gap-5
  w-full
`;

export const PopularItemsHeader = tw.div`
  flex
  flex-row
  justify-between
  items-start
`;

export const PopularItemsGrid = tw.div`
  flex
  flex-col
  gap-3
`;
