import ProgressBar from "@ramonak/react-progress-bar"
import { VerticalCardContainer } from "../../styles/Card.style"
import { useNavigate } from "react-router-dom"

export const VerticalCard = () => {
  const navigate = useNavigate()
  return (
    <VerticalCardContainer onClick={() => navigate('/product')}>
      <div className="flex flex-col gap-2">
        <div className="h-full">
          <img src="https://picsum.photos/id/40/300/300" className="w-full h-full rounded-xl object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl">이것은 상품의 이름입니다.</span>
          <span className="text-base text-gray-500">이것은 상품의 상세설명입니다.</span>
        </div>
      </div>
      <div>
        <span className="text-base font-bold text-[#26AAFF]">100% 달성</span>
        <ProgressBar completed={100} height="5px" isLabelVisible={false} bgColor="#26AAFF" />
      </div>
    </VerticalCardContainer>
  )
}
