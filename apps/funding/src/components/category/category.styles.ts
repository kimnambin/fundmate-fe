import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ width?: string }>`
    flex
    flex-col
    gap-1
`;

export const CategoryTitle = tw.p`
    flex
    items-center
    gap-1
    text-main
    pr-8
`;

export const Option = tw.ul`
    mb-1
    cursor-pointer
    hover:text-main
`;
