import tw from 'tailwind-styled-components';

// export const Wrapper = tw.div`
//   w-[90%]
//   h-[80%]
//   flex
//   flex-col
//   items-start
//   gap-4
//   mt-8
// `;

// export const MainImg = tw.img`
//     w-full
//     h-[85%]
//     max-h-[600px]
//     object-cover
// `;

export const Wrapper = tw.div`
  w-[90%]
  h-[80%]
  flex
  flex-col
  items-start
  gap-4
  mt-8
  max-h-[600px]       /* 최대 높이 제한 */
  min-h-[200px]       /* 최소 높이 지정해서 너무 작아지는 것도 방지 */
`;

export const MainImg = tw.img`
  w-full
  h-[85%]
  max-h-[600px]
  object-cover
  rounded-md          /* 혹시 모서리 둥글게 */
  transition-all      /* 부드러운 크기 변화 */
`;
