import tw from 'tailwind-styled-components';

const ProductImg = () => {
  return (
    <Wrapper>
      <MainImg src="https://imgnews.pstatic.net/image/094/2025/06/25/0000012740_001_20250625075019738.jpg?type=w860" />
    </Wrapper>
  );
};

export const Wrapper = tw.div`
  w-[90%]
  h-[80%]
  flex
  flex-col
  items-center
  gap-4
  mt-8
`;

const MainImg = tw.img`
    w-full
    h-[85%]
    object-cover
`;

export default ProductImg;
