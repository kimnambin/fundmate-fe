import { MainImg, Wrapper } from '../styles/product-detail/ProductImg.style';

interface Props {
  imgUrl?: string;
}

const ProductImg = ({ imgUrl }: Props) => {
  return (
    <Wrapper>
      <MainImg
        src={imgUrl || 'https://picsum.photos/id/1/300/200'}
        alt="대표 이미지"
        loading="lazy"
        decoding="async"
      />
    </Wrapper>
  );
};

export default ProductImg;
