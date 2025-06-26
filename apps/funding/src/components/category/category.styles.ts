import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ width?: string }>`
    flex
    flex-col
    gap-1
`;

export const Title = tw.p`
    flex
    items-center
    gap-1
    text-main
    pr-8
`;

export const OptionsWrapper = tw.ul`
    
`;

export const Option = tw.ul`
    mb-1
    cursor-pointer
    hover:text-main
`;
