import tw from 'tailwind-styled-components';
import { HasProps } from './Product.style';

export const Wrapper = tw.div`
  w-full
  h-[80%]
  flex
  flex-col
  gap-2
  mt-8
`;

export const Top = tw.div`
    flex
    flex-col
    items-start
    justify-center
    gap-1
`;

export const KeyP = tw.p`
    text-sm
`;

export const ValueP = tw.p<HasProps>`
    font-bold
    mb-3
    ${({ ishas }) => (ishas ? 'text-[19px]' : 'text-[17px]')} 
`;

export const Divide = tw.div`
    h-[0.5px]
    bg-black
    my-5
`;

export const Bottom = tw.div`
    flex
    flex-col
    gap-6
    `;

export const BottomItems = tw.div`
    flex
    flex-row
    items-center
    justify-start
    w-full
`;

export const IconBox = tw.div`
  flex
  flex-row
  items-center
  justify-start
  gap-3
  w-full
  p-6
  border
  border-t-gray-600
  fixed 
  bottom-0 
  left-0 
  right-0 
  bg-white 
  z-50
  sm:static 
  sm:bottom-auto 
  sm:left-auto 
  sm:right-auto
  sm:p-0
  sm:border-none
`;

export const IconGroup = tw.div`
  flex
  gap-4
`;

export const IconButton = tw.button`
  flex
  flex-col
  items-center
  text-[10px]
`;

export const BaseButton = tw.button`
  bg-[#5FBDFF]
  text-white
  w-full
  px-6
  py-3
  rounded-md
  text-base
  font-bold
  transition
  ml-3.5
`;

export const ReviewCard = tw.div`
  bg-white
  rounded-lg
  p-4
  mb-4
  shadow-md
`;

export const ReviewerName = tw.h4`
  m-0
  text-lg
  font-bold
`;

export const ReviewDate = tw.p`
  m-1
  text-xs
  text-gray-600
`;

export const ReviewContent = tw.p`
  text-sm
  leading-relaxed
`;
