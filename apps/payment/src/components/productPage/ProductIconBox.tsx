import { MainButton } from '@repo/ui/components';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {
  IconBox,
  IconButton,
  IconGroup,
} from '../styles/product-detail/productInfo.style';
import { useAddLike, useDeleteLike } from '../../hooks/useLike';

interface Props {
  projectId: string;
  likes: number;
}

const ProductIconBox = ({ projectId, likes }: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const { mutate: addLike } = useAddLike();
  const { mutate: deleteLike } = useDeleteLike();

  const handleLike = () => {
    if (isLiked) {
      deleteLike(projectId, {
        onSuccess: () => setIsLiked(false),
        onError: () => console.log('좋아요 취소 실패'),
      });
    } else {
      addLike(projectId, {
        onSuccess: () => setIsLiked(true),
        onError: () => console.log('좋아요 추가 실패'),
      });
    }
  };

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
        <IconButton onClick={handleLike}>
          {isLiked ? (
            <>
              <FaHeart className="w-7 h-7 text-red-600" />
              <span>{likes + 1}</span>
            </>
          ) : (
            <>
              <FaRegHeart className="w-7 h-7" />
              <span>{likes}</span>
            </>
          )}
        </IconButton>
        <IconButton onClick={copyClip}>
          <IoShareSocialOutline className="w-8 h-8" />
        </IconButton>
      </IconGroup>
      <Link to={`/payment?projectId=${projectId}`} className="w-full">
        <MainButton
          label={'후원하기'}
          textSize={'text-base'}
          textWeight={'font-bold'}
          className="w-72 px-6 py-3 ml-3.5  sm:w-full"
        />
      </Link>
    </IconBox>
  );
};

export default ProductIconBox;
