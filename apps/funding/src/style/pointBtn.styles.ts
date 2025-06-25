import tw from 'tailwind-styled-components';

export const Wrapper = tw.button`
    flex
    px-3
    py-[6px]
    items-start
    gap-[10px]
    rounded-[3px]
    border
    border-main
    text-main
    cursor-pointer
    hover:bg-main
    hover:text-white
`;
