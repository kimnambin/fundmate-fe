import tw from 'tailwind-styled-components';

export const Wrapper = tw.button<{
  width?: string;
  textSize?: string;
  textWeight?: string;
}>`
    ${({ width }) => width ?? 'w-auto'}
    flex
    px-[16px]
    py-2
    justify-center
    items-center
    gap-[10px]
    rounded-[6px]
    text-white
    cursor-pointer
    bg-main
    hover:opacity-50
    ${({ textSize }) => textSize ?? 'text-[14px]'}
    ${({ textWeight }) => textWeight ?? 'font-normal'}
`;
