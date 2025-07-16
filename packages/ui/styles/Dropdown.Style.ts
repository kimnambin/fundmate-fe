import tw from "tailwind-styled-components";

export const Menu = tw.div`
  relative
  inline-block
  text-left
`

export const MenuButton = tw.button`
  inline-flex
  w-full
  justify-center
  gap-x-1.5
  rounded-md
  bg-white
  px-3
  py-2
  text-sm
  font-semibold
  text-gray-900
  shadow-sm
  ring-1
  ring-inset
  ring-gray-300
  hover:bg-gray-50
`

export const MenuItems = tw.div`
  absolute
  left-0
  z-[200]
  mt-2
  w-36
  origin-top-right
  rounded-md
  bg-white
  shadow-lg
  ring-1
  ring-black/5
  focus:outline-none
`

export const MenuItem = tw.button`
  text-left
  w-full
  block
  px-4
  py-2
  text-sm
  text-gray-700

  hover:bg-gray-100
  hover:text-gray-900

  focus:bg-gray-100
  focus:text-gray-900
  focus:outline-none
`
