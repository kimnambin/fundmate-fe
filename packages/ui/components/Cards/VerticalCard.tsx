import ProgressBar from "@ramonak/react-progress-bar"
import { VerticalCardContainer } from "../../styles/Card.style"
import { useNavigate } from "react-router-dom"

export const VerticalCard = () => {
  const navigate = useNavigate()
  return (
    <VerticalCardContainer onClick={() => navigate('/product')}>
      <div className="row-span-4">
        <img src="https://picsum.photos/id/40/300/300" className="w-full h-full rounded-xl object-cover" />
      </div>
      <div className="w-full @container/vertical">
        <span
          className="@[9rem]/vertical:text-base @[12rem]/vertical:text-xl truncate">
          이것은 상품의 이름입니다.
        </span>
        <span className="text-base text-gray-500 truncate">이것은 상품의 상세설명입니다.</span>
      </div>
      <div className="flex flex-col justify-end">
        <span className="text-base font-bold text-[#26AAFF]">100% 달성</span>
        <ProgressBar completed={100} height="5px" isLabelVisible={false} bgColor="#26AAFF" />
      </div>
    </VerticalCardContainer>
  )
}
