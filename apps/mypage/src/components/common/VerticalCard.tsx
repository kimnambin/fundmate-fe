import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ProgressBar from "@ramonak/react-progress-bar";
import { VerticalCardContainer } from "../style/Card.style";

interface VerticalCardProps {
  thumbnailUrl: string;
  title: string;
  description: string;
  progress: number;
}

export const VerticalCard = ({
  thumbnailUrl,
  title,
  description,
  progress,
}: VerticalCardProps) => {
  // 하트 상태 (화면 확인용)
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <VerticalCardContainer className="relative h-[310px]">
      {/* 하트 버튼 */}
      <button
        onClick={handleToggleLike}
        className="absolute top-[45px] right-[30px] text-3xl"
      >
        {isLiked ? (
          <AiFillHeart className="text-red-500" />
        ) : (
          <AiOutlineHeart className="text-white/80" />
        )}
      </button>

      {/* 썸네일 */}
      <div className="w-[280px] h-[280px] mt-[20px]" >
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-[180px] rounded-xl object-cover"
        />
      </div>

      {/* 제목 및 설명 */}
      <div className="flex flex-col">
        <span className="text-[14px] font-semibold">{title}</span>
        <span className="text-[12px] text-gray-500">{description}</span>
      </div>

      {/* 진행률 */}
      <div className="mt-1 mb-10">
        <span className="text-base font-bold text-cyan-400">
          {progress}% 달성
        </span>
        <ProgressBar
          completed={progress}
          height="5px"
          isLabelVisible={false}
          bgColor="#26C6DA"
        />
      </div>
    </VerticalCardContainer>
  );
};
