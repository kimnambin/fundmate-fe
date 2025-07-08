import tw from "tailwind-styled-components";

export const CheckboxStyle = tw.label<{ $checked: boolean }>`
  flex
  items-center
  justify-center
  w-6
  h-6
  border-[2px]
  rounded-[5px]
  cursor-pointer

  ${(p) => p.$checked ? 'bg-[#26aaff] border-[#26aaff]' : 'bg-transparent border-[#d9d9d9]'}
`
