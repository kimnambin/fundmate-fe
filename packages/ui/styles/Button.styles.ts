import tw from "tailwind-styled-components";

export const CommonButton = tw.button<{ $isError?: boolean, $isVerificated?: boolean }>`
  bg-[#26AAFF]
  flex
  flex-row
  justify-center
  items-center
  text-white
  font-semibold
  py-3
  rounded-lg
  px-5
  transition-opacity

  ${(p) => p.$isError || p.$isVerificated ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
`
