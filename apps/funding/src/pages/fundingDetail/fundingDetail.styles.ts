import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ width?: string }>`
    flex
    gap-[20px]
    w-full
    mt-[30px]
`;

export const ItemTitleWrapper = tw.div`
    flex
    w-full
    gap-[35px]
`;

export const ItemTitleTextWrapper = tw.div`
    flex flex-col gap-[30px] grow
`;

export const InfoWrapperVertical = tw.div`
  flex flex-col gap-[5px]
`;

export const InfoLabel = tw.p`
  text-[10px] text-sub-text w-[70px]
`;

export const InfoWrapperHorizontal = tw.div`
  flex gap-[40px] items-center
  `;

export const ButtonWrapper = tw.div`
    flex 
    items-start
    gap-[10px]
`;
