import { MainImg, Wrapper } from '../styles/product-detail/ProductImg.style';

const ProductImg = ({ imgId }: { imgId: number }) => {
  return (
    <Wrapper>
      <MainImg
        src={
          // TODO :임시로 넣었습니다
          typeof imgId === 'string'
            ? `https://picsum.photos/id/10/300/200`
            : `https://picsum.photos/id/${imgId}/300/200`
        }
      />
    </Wrapper>
  );
};

export default ProductImg;
