import tw from "tailwind-styled-components";

export const UserLayout = tw.div`
  flex
  flex-row
  justify-center
  items-center
  my-[100px]
`

export const UserContainer = tw.div`
  flex
  flex-col
  justify-between
  w-[30%]
  gap-7
`

export const UserNaigater = tw.div`
  flex
  flex-row
  justify-end
  items-center
  gap-7
  w-full
  text-gray-500
  underline
`

export const HorizonLine = tw.hr`
  outline-b
  outline-1
  outline-gray-200
  w-full
`
