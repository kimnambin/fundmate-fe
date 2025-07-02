import { VerticalCard } from '@repo/ui/components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules';
import { NavButton, NavigationContainer } from '../styles/Swiper.style';
import { range } from '../utils/tempRange';

interface SwiperItemsProps {
  componentId: number;
}

export const SwiperItems = ({ componentId }: SwiperItemsProps) => {
  return (
    <>
      <NavigationContainer $role='prev'>
        <NavButton $role='prev' $id={componentId.toString()}>
          <SlArrowLeft />
        </NavButton>
      </NavigationContainer>
      <NavigationContainer $role='next'>
        <NavButton $role='next' $id={componentId.toString()}>
          <SlArrowRight />
        </NavButton>
      </NavigationContainer>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        className='latestView'
        slidesPerGroup={5}
        speed={1000}
        navigation={{
          nextEl: `.custom-next-${componentId}`,
          prevEl: `.custom-prev-${componentId}`,
        }}
        modules={[Navigation]}
      >
        {
          range(componentId * 7).map(i => (
            <SwiperSlide key={i} ><VerticalCard /></SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
}


