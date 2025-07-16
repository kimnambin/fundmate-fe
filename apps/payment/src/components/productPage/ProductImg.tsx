import { MainImg, Wrapper } from '../styles/product-detail/ProductImg.style';

const ProductImg = ({ imgId }: { imgId: number }) => {
  return (
    <Wrapper>
      <MainImg src={`https://picsum.photos/id/${imgId}/300/200`} />
    </Wrapper>
  );
};

export default ProductImg;
