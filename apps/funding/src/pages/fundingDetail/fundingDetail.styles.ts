import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ width?: string }>`
    flex flex-col
    gap-[20px]
    w-full
    mt-[30px]
`;

export const ItemTitleWrapper = tw.div`
    flex flex-col
    w-full
    gap-[35px]
    sm:flex-row
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

export const FundingDetailTab = tw.div`
  flex
  -mx-[120px] pl-[120px] py-[25px] mt-[40px]
  gap-[30px]
  border-b-[1px] border-line
  border-t-[1px] border-line
  `;
