import tw from 'tailwind-styled-components';

export const Wrapper = tw.div<{ $width?: string, $textSize?: string, $isError?: boolean }>`
    ${({ $width }) => $width ?? 'w-auto'}
    flex
    flex-col
    gap-[20px]
`;

export const InputStyle = tw.input<{ $textSize: string, $isError: boolean }>`
  border
  border-line
  rounded-[5px]
  py-[10px]
  px-[15px]
  placeholder-input-text
  focus:outline-none
  focus:border-main
  w-full
  
  ${({ $textSize }) => $textSize ?? 'text-[14px]'}
  ${({ $isError }) => $isError ? 'border-red' : 'border-gray-200'}
  
`;
