import tw from "tailwind-styled-components";

export const CheckboxStyle = tw.label<{ $checked: boolean }>`
  flex
  items-center
  justify-center
  w-[30px]
  h-[30px]
  border-[2px]
  rounded-md
  cursor-pointer

  ${(p) => p.$checked ? 'bg-[#26aaff] border-[#26aaff]' : 'bg-transparent border-[#d9d9d9]'}
`
