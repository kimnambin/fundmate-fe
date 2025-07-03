import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
    flex flex-col
    gap-[30px] mb-[30px]
    w-full h-[calc(100vh-270px)]
`;

export const ResultWrapper = tw.div<{ isCapture: boolean }>`
    flex flex-col
    gap-[30px] pb-[30px]
    w-full h-[calc(100vh-270px)]
    overflow-y-scroll [&::-webkit-scrollbar]:hidden
    ${({ isCapture }) => (isCapture ? 'h-auto overflow-visible px-12' : 'px-0')}
    break-inside-avoid	
`;

export const Bottom = tw.div`
    flex justify-end 
    pt-[24px] -mb-[6px] -mx-[120px]
    border-t border-line
`;
