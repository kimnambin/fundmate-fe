import tw from "tailwind-styled-components";

export const VerticalCardContainer = tw.div`
  grid
  grid-flow-row
  grid-rows-6
  gap-3
  justify-between
  cursor-pointer
  rounded-xl
  transition-shadow
  bg-white
  p-3
  h-full
  w-full

  hover:shadow-md
`

export const HorizontalCardContainer = tw.div`
  grid
  grid-cols-12
  w-full
  h-full
  cursor-pointer
  rounded-xl  
  transition-shadow
  p-3
  bg-white

  hover:shadow-md
`
