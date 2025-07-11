import ProgressBar from "@ramonak/react-progress-bar";
import { HorizontalCardContainer } from "../../styles/Card.style";
import { useNavigate } from "react-router-dom";
import { HeartButton } from "../Likes/HeartButton";
import { MediumFont, SubTitle } from "../../styles";
import CardProps from "../../types/cardType";

export const HorizontalCard = ({ number, isLoading }: CardProps) => {
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <HorizontalCardContainer className='shadow-lg animate-pulse'>
        <div className="bg-gray-200 rounded-xl relative flex shrink-0 grow-0 basis-[120px]">
        </div>
        <div className="flex flex-col shrink-1 grow-1 items-start justify-between py-2 min-w-0 w-full">
          <div className="flex flex-col w-full gap-2">
            <div className='h-[20px] bg-gray-100 rounded-md'></div>
            <div className='h-[20px] bg-gray-100 rounded-md'></div>
          </div>
          <div className="w-full">
            <div className='h-[20px] bg-gray-100 rounded-md'></div>
          </div>
        </div>
      </HorizontalCardContainer>
    )
  }
  return (
    <HorizontalCardContainer onClick={() => navigate('/product')}>
      <div className="relative flex shrink-0 grow-0 basis-[120px]">
        <img src="https://picsum.photos/id/30/100/100" className="w-auto h-full object-cover rounded-xl" />
        <HeartButton />
      </div>
      <div className="flex justify-center py-2 shrink-0 grow-0 basis-[10px]">
        <span className="font-bold text-[#26AAFF]">{number}</span>
      </div>
      <div className="flex flex-col shrink-1 grow-1 items-start justify-between py-2 min-w-0 w-full">
        <div className="flex flex-col w-full">
          <MediumFont className='truncate whitespace-nowrap'>이것은 상품의 제목입니다.</MediumFont>
          <MediumFont className="text-gray-500">이것은 상품의 상세설명입니다.</MediumFont>
        </div>
        <div className="w-full">
          <SubTitle className="text-[#26AAFF]">100% 달성</SubTitle>
          <ProgressBar completed={100} height="5px" isLabelVisible={false} bgColor="#26AAFF" />
        </div>
      </div>
    </HorizontalCardContainer>
  )
}
