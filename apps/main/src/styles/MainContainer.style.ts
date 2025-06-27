import tw from "tailwind-styled-components";

export const MainGrid = tw.div`
  grid
  [grid-template-columns:repeat(auto-fit,minmax(250px, 1fr))]
  gap-8
  py-[40px]
  max-w-[calc(100vw-240px)]
  mx-auto
`
