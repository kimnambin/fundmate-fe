interface HorizontalCardProps {
  number: string;
}

export const HorizontalCard = ({ number }: HorizontalCardProps) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <img src="https://picsum.photos/id/30/100/100" className="w-full h-full object-cover rounded-xl" />
      </div>
      <div className="col-span-1 flex justify-center py-2">
        <span className="font-bold text-cyan-400">{number}</span>
      </div>
      <div className="col-span-6 flex flex-col items-start justify-between py-2">
        <span className="text-lg">이것은 엄청난 상품 상세정보인데요</span>
        <span className="font-bold text-cyan-400">100% 달성</span>
      </div>
    </div>
  )
}
