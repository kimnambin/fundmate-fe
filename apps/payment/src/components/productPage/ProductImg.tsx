import { MainImg, Wrapper } from '../styles/product-detail/ProductImg.style';

interface Props {
  imgUrl?: string;
}

const ProductImg = ({ imgUrl }: Props) => {
  return (
    <Wrapper>
      <MainImg src={imgUrl || 'https://picsum.photos/id/1/300/200'} />
    </Wrapper>
  );
};

export default ProductImg;
