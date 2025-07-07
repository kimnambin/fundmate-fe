import tw from "tailwind-styled-components";

export const ButtonWrapper = tw.button<{
  $isError?: boolean,
  $isVerificated?: boolean,
  $width?: string,
  textSize?: string,
  textWeight?: string
}>`
  flex
  justify-center
  items-center
  px-1
  py-2
  gap-[10px]
  rounded-[6px]
  text-white
  bg-main
  cursor-pointer

  hover:opacity-50
  
  ${({ $isError, $isVerificated }) => ($isError || $isVerificated) && 'opacity-50 cursor-not-allowed'}
  ${({ $width }) => $width ?? 'w-auto'}
  ${({ $textSize }) => $textSize ?? 'text-[14px]'}
  ${({ $textWeight }) => $textWeight ?? 'font-normal'}
`;
