import { FaRegHeart } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import {
  BaseButton,
  IconBox,
  IconButton,
  IconGroup,
} from '../styles/product-detail/productInfo.style';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useQueryString from '../../hooks/useQueryString';
import { productData } from './ProductInfo';

const ProductIconBox = () => {
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
    <IconBox className="px-3 sm:px-0">
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
        <BaseButton className="w-72 sm:w-full">후원하기</BaseButton>
      </Link>
    </IconBox>
  );
};

export default ProductIconBox;
