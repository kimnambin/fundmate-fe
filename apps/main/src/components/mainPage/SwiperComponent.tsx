import { SwiperItems } from "../Swiper"

interface SwiperComponentsProps {
  componentId: number;
  componentName: string;
}

export const SwiperComponents = ({ componentId, componentName }: SwiperComponentsProps) => {
  return (
    <div className='relative flex flex-col gap-[20px]'>
      <div className="flex flex-row justify-between">
        <span className="text-xl font-semibold">{componentName}</span>
        <span className="text-base text-gray-300">전체보기</span>
      </div>
      <div>
        <SwiperItems componentId={componentId} />
      </div>
    </div>
  )
}
