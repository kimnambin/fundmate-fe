import tw from "tailwind-styled-components";

export const VerticalCardContainer = tw.div`
  flex
  flex-col
  gap-3
  h-full
  justify-between
  aspect-[5/7]
  cursor-pointer
  rounded-xl
  transition-shadow
  p-3
  m-3

  hover:shadow-md
`

export const HorizontalCardContainer = tw.div`
  grid
  grid-cols-12
  aspect-[9/1]
  w-full
  cursor-pointer
  rounded-xl  
  transition-shadow
  p-3

  hover:shadow-md
`
