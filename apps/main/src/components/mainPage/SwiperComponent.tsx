import { Link } from "react-router-dom";
import { SwiperItems } from "../Swiper"

interface SwiperComponentsProps {
  componentId: number;
  componentName: string;
}

export const SwiperComponents = ({ componentId, componentName }: SwiperComponentsProps) => {
  let viewFullNav = '/'
  if (componentId === 2) viewFullNav = '/search?deadline=1';
  if (componentId === 3) viewFullNav = '/search?new=1';

  return (
    <div className='relative flex flex-col gap-[20px]'>
      <div className="flex flex-row justify-between px-6">
        <span className="text-xl font-semibold">{componentName}</span>
        {
          componentId === 1 ? '' : <Link to={viewFullNav} className="text-base text-gray-300">전체보기</Link>
        }
      </div>
      <div>
        <SwiperItems componentId={componentId} />
      </div>
    </div>
  )
}
