import { FaRegHeart } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import {
  BaseButton,
  Bottom,
  BottomItems,
  Divide,
  IconBox,
  IconButton,
  IconGroup,
  KeyP,
  Top,
  ValueP,
  Wrapper,
} from '../styles/product-detail/productInfo.style';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useQueryString from '../../hooks/useQueryString';

// TODO : 화면 구상용 더미 데이터

export interface ProductDataProps {
  [key: string]: string;
}

export const productData: ProductDataProps = {
  title: '3D 미니 프런터기기',
  '모인 금액': '1,556,900원',
  '남은 시간': '8일',
  후원자: '10명',
};

export const productPaymentData: ProductDataProps = {
  '목표 금액': '500,000원',
  '펀딩 기간': '2025.06.17 ~ 2025.08.20',
  결제: '목표 금액 달성 시 2025.08.20에 결제 진행',
  '예상 발송 및 시작일': '2025.08.20',
};

const ProductInfo = () => {
  const [click, setClick] = useState<boolean>(false);

  useQueryString(productData.title);

  const copyClip = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('해당 페이지가 복사되었습니다.');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Wrapper>
      <Top>
        {Object.entries(productData).map(([key, value]) => (
          <Top key={key}>
            {key !== 'title' && <KeyP>{key}</KeyP>}
            <ValueP $ishas={key === 'title'}>{value}</ValueP>
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
            <IconButton onClick={() => setClick(!click)}>
              {click ? (
                <>
                  <FaRegHeart className="w-7 h-7 text-red-600" />
                  <span>1</span>
                </>
              ) : (
                <>
                  <FaRegHeart className="w-7 h-7" />
                  <span>0</span>
                </>
              )}
            </IconButton>
            <IconButton onClick={copyClip}>
              <IoShareSocialOutline className="w-8 h-8" />
            </IconButton>
          </IconGroup>
          <Link to={`/payment?title=${productData.title}`} className="w-full">
            <BaseButton>후원하기</BaseButton>
          </Link>
        </IconBox>
      </Bottom>
    </Wrapper>
  );
};

export default ProductInfo;
