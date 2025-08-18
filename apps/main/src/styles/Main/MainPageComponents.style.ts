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
  h-[55%]
`;

export const InterestingItemsGrid = tw.div`
  grid
  grid-cols-2 grid-rows-1
  lg:grid-cols-4 
  lg:grid-rows-2
  gap-3
  h-full
`;

//MainCategory
export const MainCategoryContainer = tw.div`
  flex
  flex-row
  justify-around
  items-center
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
  grid
  grid-rows-5
  gap-1.5
  h-full
`;
