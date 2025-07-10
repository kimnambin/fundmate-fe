import tw from 'tailwind-styled-components';

export const Container = tw.div`
  flex
  flex-row
  w-full
  items-center
  px-[120px]
  overflow-hidden
`;

export const SpaceContainer = tw.div`
  flex
  flex-row
  justify-between
  items-center
  w-full
  px-[120px]
`

export const InputDiv = tw.div`
  relative
  h-10
  w-[40rem]
`;

export const LoginButton = tw.button`
  flex
  flex-row
  gap-5
  rounded-lg
  items-center
  px-5
  py-4
  border
  border-gray-100
`;

export const FundiButton = tw.button`
  flex
  flex-row
  gap-2 
  text-lg
  bg-main
  font-semibold
  text-white
  px-5
  py-1
  rounded-lg
`
