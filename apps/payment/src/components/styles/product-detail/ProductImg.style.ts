import tw from 'tailwind-styled-components';

export const Wrapper = tw.div`
  w-[90%]
  h-[80%]
  flex
  flex-col
  items-start
  gap-4
  mt-8
  max-h-[600px]      
  min-h-[200px]       
`;

export const MainImg = tw.img`
  w-full
  h-[85%]
  max-h-[600px]
  object-cover
  rounded-md          
  transition-all    
`;
