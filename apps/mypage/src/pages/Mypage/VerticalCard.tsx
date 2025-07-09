import { VerticalCardContainer } from "../../components/style/Card.style";
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { HeartButton } from "../../../../../packages/ui/components/Likes/HeartButton";

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
    <VerticalCardContainer className="relative w-[185px] h-[250px] p-2 rounded-lg shadow-sm bg-white">
      <div className="absolute top-1 right-2">
        <HeartButton isLiked={isLiked} onToggle={handleToggleLike} />
      </div>

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
        <span className="text-[14px] mb-2 font-semibold truncate">{title}</span>
        <span className="text-[13px] mb-4 text-gray-500 truncate">{description}</span>
      </div>

      {/* 진행률 */}
      <div className="mb-[14px] px-1">
        <span className="text-[20px] font-bold text-cyan-400">
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
