import { useState } from 'react'
import { IoMdHeart } from 'react-icons/io';
import { IoHeartOutline } from 'react-icons/io5';
export const HeartButton = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const turnHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  }

  return (
    <button
      type='button'
      onClick={(e) => turnHeart(e)}
      className='absolute top-0 right-0 p-3 text-3xl z-[100]'
    >
      {isLiked ? <IoMdHeart className='text-[#ef4444]' /> : <IoHeartOutline className='text-white' />}
    </button>
  )
}
