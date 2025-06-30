import tw from 'tailwind-styled-components';

export const Wrapper = tw.button<{ width?: string }>`
    ${({ width }) => width ?? 'w-auto'}
    flex
    px-[16px]
    py-2
    justify-center
    items-center
    gap-[10px]
    rounded-[6px]
    border border-main
    text-main
    cursor-pointer
    hover:bg-main
    hover:text-white
`;
