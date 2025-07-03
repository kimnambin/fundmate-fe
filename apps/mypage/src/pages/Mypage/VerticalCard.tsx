import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import ProgressBar from "@ramonak/react-progress-bar";
import { VerticalCardContainer } from "../../components/style/Card.style";

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
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <VerticalCardContainer className="relative w-[140px] h-[250px] p-2 rounded-lg shadow-sm bg-white">
      {/* 하트 버튼 */}
      <button
        onClick={handleToggleLike}
        className="absolute top-4 right-5 text-[25px]"
      >
        {isLiked ? (
          <AiFillHeart className="text-red-500" />
        ) : (
          <AiOutlineHeart className="text-white/80" />
        )}
      </button>

      {/* 썸네일 */}
      <div className="w-full h-[120px] mb-[10px] mt-[0px] rounded-md overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 제목 및 설명 */}
      <div className="flex flex-col px-1">
        <span className="text-[13px] font-semibold truncate">{title}</span>
        <span className="text-[11px] text-gray-500 truncate">{description}</span>
      </div>

      {/* 진행률 */}
      <div className="mb-[10px] px-1">
        <span className="text-xs font-bold text-cyan-400">
          {progress}% 달성
        </span>
        <ProgressBar
          completed={progress}
          height="4px"
          isLabelVisible={false}
          bgColor="#26C6DA"
        />
      </div>
    </VerticalCardContainer>
  );
};
