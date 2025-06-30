import { SwiperItems } from "../Swiper"

interface SwiperComponentsProps {
  componentId: number;
  componentName: string;
}

export const SwiperComponents = ({ componentId, componentName }: SwiperComponentsProps) => {
  return (
    <div className='mx-[120px] relative flex flex-col gap-[20px]'>
      <span className="text-xl font-semibold">{componentName}</span>
      <div>
        <SwiperItems componentId={componentId} />
      </div>
    </div>
  )
}
