import tw from "tailwind-styled-components";

interface CategoryContainerProps {
  isOpen: boolean;
}

export const CateogoryContainer = tw.div<CategoryContainerProps>`
  ${p => p.$isOpen ? 'visible' : 'invisible'}
  absolute
  top-full
  left-0
  w-44
  bg-white
  rounded-lg
  shadow-lg
  p-3
  flex
  flex-col
  gap-1
`
