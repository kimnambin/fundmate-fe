export const VerticalCard = () => {
  return (
    <div className="flex flex-col gap-3 outline outline-black-500 h-full justify-between">
      <div className="h-[240px]">
        <img src="https://picsum.photos/id/40/300/300" className="w-full h-full rounded-xl object-cover" />
      </div>
      <span className="text-xl">이것은 엄청난 상품 상세정보인데요</span>
      <span className="text-base font-bold text-cyan-400">100% 달성</span>
    </div>
  )
}
