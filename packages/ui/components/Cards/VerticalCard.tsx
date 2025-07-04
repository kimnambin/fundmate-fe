import ProgressBar from "@ramonak/react-progress-bar"
import { VerticalCardContainer } from "../../styles/Card.style"
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import { HeartButton } from "../Likes/HeartButton"

export const VerticalCard = () => {
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const turnHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  }
  return (
    <VerticalCardContainer onClick={() => navigate('/product')}>
      <div className="flex flex-col @[250px]/vertical:gap-5 @[270px]/vertical:gap-7">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <img src="https://picsum.photos/id/40/300/300" className="w-full h-auto rounded-xl object-cover" />
            <HeartButton />
          </div>
          <div className="w-full min-w-200 overflow-hidden">
            <span
              className="@[1rem]/vertical:text-sm @[9rem]/vertical:text-base @[12rem]/vertical:text-xl truncate w-full block">
              이것은 상품의 이름입니다.
            </span>
            <span className="@[1rem]/vertical:text-sm @[250px]/vertical:text-base text-gray-500 truncate w-full block">이것은 상품의 상세설명입니다.</span>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <span className="text-base font-bold text-[#26AAFF]">100% 달성</span>
          <ProgressBar completed={100} height="5px" isLabelVisible={false} bgColor="#26AAFF" />
        </div>
      </div>
    </VerticalCardContainer>
  )
}
