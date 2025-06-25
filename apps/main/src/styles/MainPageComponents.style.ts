import tw from "tailwind-styled-components";

//Banner
export const BannerContainer = tw.div`
  col-span-2
  h-full
  row-span-3
  outline
  outline-emerald-800
`

//InterestingItems
export const InterestingItemsContainer = tw.div`
  col-start-1
  col-span-2
  row-span-5
  h-full
  interest outline 
  outline-blue-800
`

export const InterestingItemsGrid = tw.div`
  grid
  grid-rows-2
  grid-cols-4
  gap-5
`

//MainCategory
export const MainCategoryContainer = tw.div`
  col-start-1
  col-span-2
  h-full
  flex
  flex-row
  justify-around
  items-center
  outline
  outline-amber-800
`

//PopularItems
export const PopularItemsContainer = tw.div`
  row-span-9
  row-start-1
  col-start-3
  outline
  outline-purple-800
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
  grid-rows-9
  items-start
  gap-5
`
