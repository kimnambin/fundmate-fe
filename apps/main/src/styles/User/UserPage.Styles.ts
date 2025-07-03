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

export const UserInput = tw.input<{ $isError?: boolean }>`
  outline
  rounded-md
  p-1.5
  indent-2
  text-lg
  w-full
  transition-all
  
  focus:outline-cyan-400
  focus:outline-2

  ${(p) => p.$isError ? 'outline-2 outline-red-500' : 'outline-1 outline-gray-200'}
`

export const UserNaigater = tw.div`
  flex
  flex-row
  justify-end
  items-center
  gap-7
  w-full
  text-lg
  text-gray-500
  underline
`

export const HorizonLine = tw.hr`
  outline-b
  outline-1
  outline-gray-200
  w-full
`
