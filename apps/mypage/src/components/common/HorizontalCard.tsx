import ProgressBar from "@ramonak/react-progress-bar";
import { HorizontalCardContainer } from "../../../../../packages/ui/styles/Card.style";

interface HorizontalCardProps {
  imageUrl: string;
  title: string;
  description: string;
  number: string | number;
}

export const HorizontalCard = ({
  imageUrl,
  title,
  description,
  number,
}: HorizontalCardProps) => {
  return (
    <HorizontalCardContainer>
      {/* 이미지 */}
      <div className="col-span-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* 숫자 */}
      <div className="col-span-1 flex justify-center py-2">
        <span className="font-bold text-cyan-400">{number}</span>
      </div>

      {/* 제목, 설명, 진행률 */}
      <div className="col-span-6 flex flex-col items-start justify-between py-2">
        <div className="flex flex-col">
          <span className="text-lg">{title}</span>
          <span className="text-base text-gray-500">{description}</span>
        </div>
        <div className="w-full">
          <span className="font-bold text-cyan-400">100% 달성</span>
          <ProgressBar
            completed={100}
            height="5px"
            isLabelVisible={false}
            bgColor="#26C6DA"
          />
        </div>
      </div>
    </HorizontalCardContainer>
  );
};
