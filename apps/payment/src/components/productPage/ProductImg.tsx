import { MainImg, Wrapper } from '../styles/product-detail/ProductImg.style';

interface Props {
  imgUrl?: string;
}

const ProductImg = ({ imgUrl }: Props) => {
  console.log('ProductImg rendered with imgUrl:', imgUrl);

  return (
    <Wrapper>
      <MainImg src={imgUrl || 'https://picsum.photos/id/1/300/200'} />
    </Wrapper>
  );
};

export default ProductImg;
