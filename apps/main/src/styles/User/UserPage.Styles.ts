import tw from "tailwind-styled-components";

export const UserLayout = tw.div`
  flex
  flex-row
  justify-center
  items-center
  my-10 sm:my-[100px]
`

export const UserContainer = tw.div`
  flex
  flex-col
  justify-between
  w-full max-w-[420px]
  lg:w-[30%] lg:min-w-[360px] lg:max-w-none
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
