import tw from "tailwind-styled-components";

//Banner
export const BannerContainer = tw.div`
  col-span-4
  h-full
  row-span-2
`

//InterestingItems
export const InterestingItemsContainer = tw.div`
  col-start-1
  col-span-4
  row-span-5
`

export const InterestingItemsGrid = tw.div`
  grid
  grid-rows-2
  grid-cols-4
  gap-3
`

//MainCategory
export const MainCategoryContainer = tw.div`
  col-start-1
  col-span-4
  h-full
  flex
  flex-row
  justify-around
  items-center
`

//PopularItems
export const PopularItemsContainer = tw.div`
  row-span-9
  row-start-1
  col-start-5
  col-span-2
  flex
  flex-col
  gap-5
`

export const PopularItemsHeader = tw.div`
  flex
  flex-row
  justify-between
  items-start
`

export const PopularItemsGrid = tw.div`
  grid
  [grid-template-rows:repeat(auto-fit,minmax(0, 1fr))]
  items-start
  gap-1.5
`
