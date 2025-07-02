import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ width?: string }>`
    flex flex-col
    gap-[30px] pb-[30px]
    w-full h-[calc(100vh-270px)]
    overflow-y-scroll [&::-webkit-scrollbar]:hidden
`;

export const Bottom = tw.div`
    flex justify-end 
    pt-[24px] -mb-[6px] -mx-[120px]
    border-t border-line
`;
