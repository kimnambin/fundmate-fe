import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ width?: string }>`
    flex flex-col
    gap-[15px]
    p-[25px]
    border border-line rounded-[5px]
`;

export const Price = tw.p`
    text-[18px]
    font-bold
`;
