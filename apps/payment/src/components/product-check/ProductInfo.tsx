import tw from 'tailwind-styled-components';
import { FaRegHeart } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';

interface HasProps {
  ishas?: boolean;
}

interface ProductDataProps {
  [key: string]: string;
}

const productData: ProductDataProps = {
  title: '3D 미니 프런터기기',
  '모인 금액': '1,556,900원',
  '남은 시간': '8일',
  후원자: '10명',
};

const productPaymentData: ProductDataProps = {
  '목표 금액': '500,000원',
  '펀딩 기간': '2025.06.17 ~ 2025.08.20',
  결제: '목표 금액 달성 시 2025.08.20에 결제 진행',
  '예상 발송 및 시작일': '2025.08.20',
};

const ProductInfo = () => {
  return (
    <Wrapper>
      <Top ishas="true">
        {Object.entries(productData).map(([key, value]) => (
          <Top key={key}>
            {key !== 'title' && <KeyP>{key}</KeyP>}
            <ValueP ishas={key === 'title'}>{value}</ValueP>
          </Top>
        ))}
      </Top>
      <Divide />
      <Bottom>
        {Object.entries(productPaymentData).map(([key, value]) => (
          <BottomItems key={key}>
            <div className="w-[120px]">
              <KeyP className="text-left">{key}</KeyP>
            </div>
            <ValueP>{value}</ValueP>
          </BottomItems>
        ))}

        <IconBox>
          <IconGroup>
            <IconButton>
              <FaRegHeart className="w-7 h-7" />
              <span>75</span>
            </IconButton>
            <IconButton>
              <IoShareSocialOutline className="w-8 h-8" />
            </IconButton>
          </IconGroup>
          <DonateButton>후원하기</DonateButton>
        </IconBox>
      </Bottom>
    </Wrapper>
  );
};

export const Wrapper = tw.div`
  w-full
  h-[80%]
  flex
  flex-col
  gap-2
  mt-8
`;

const Top = tw.div<HasProps>`
    flex
    flex-col
    items-start
    justify-center
    ${({ ishas }) => (ishas ? 'gap-5' : '')}
`;

const KeyP = tw.p`
    text-[10px]
    text-[#7e7b7b]
`;

const ValueP = tw.p<HasProps>`
    font-bold
    ${({ ishas }) => (ishas ? 'text-[18px] ' : 'text-[14px]')} 
`;

const Divide = tw.div`
    h-[0.5px]
    bg-black
    my-5
`;

const Bottom = tw.div`
    flex
    flex-col
    gap-6
    `;

const BottomItems = tw.div`
    flex
    flex-row
    items-center
    justify-start
    w-full
`;

const IconBox = tw.div`
    flex
    flex-row
    items-center
    justify-start
    gap-3
    w-full
    `;

const IconGroup = tw.div`
  flex
  gap-4
`;

const IconButton = tw.button`
  flex
  flex-col
  items-center
  text-[10px]
`;

const DonateButton = tw.button`
  bg-[#5FBDFF]
  text-white
  w-full
  px-6
  py-3
  rounded-md
  text-base
  font-bold
  transition
  ml-3.5
`;

export default ProductInfo;
