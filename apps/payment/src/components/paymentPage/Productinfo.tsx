import { FlexColsm } from '../styles/flex';
import tw from 'tailwind-styled-components';
import { BoldBigText } from '../styles/text';

const Productinfos = () => {
  return (
    <ProductInfo>
      <ProdusctImg src={'sss'} alt="대표 이미지" />
      <FlexColsm className="items-start justify-start">
        <Title>책이 쌓일수록 귀엽다</Title>
        <BoldBigText>1,556,900원</BoldBigText>
      </FlexColsm>
    </ProductInfo>
  );
};

export default Productinfos;

const ProductInfo = tw.div`
    flex
    flex-row
    items-center
    mb-7
`;
export const ProdusctImg = tw.img`
    w-24
    h-24
  bg-slate-400
    rounded-md
    mr-6
    ${({ ishas }) => (ishas ? 'border border-main-color' : '')}
`;
const Title = tw.h3`
    text-base
`;
