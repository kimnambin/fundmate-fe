import { VerticalCard } from '@repo/ui/components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { NavButton, NavigationContainer } from '../styles/Swiper.style';
import { commonApiInstance } from '@repo/ui/hooks';
import { useQuery } from '@tanstack/react-query';
import type { ProductType } from '../types/ProductType';
import { GiNothingToSay } from 'react-icons/gi';
import { Title } from '@repo/ui/styles';

interface SwiperItemsProps {
  componentId: number;
}

const getSwiperItems = async (id: number) => {
  let pathname;
  if (id === 1) {
    pathname = '/api/projects/recent';
  } else if (id === 2) {
    pathname = '/api/projects/deadline';
  } else if (id === 3) {
    pathname = '/api/projects/new';
  } else {
    return;
  }

  const response = await commonApiInstance.get(pathname);
  return response.data;
};

export const SwiperItems = ({ componentId }: SwiperItemsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [`swiper${componentId}`],
    queryFn: () => getSwiperItems(componentId),
    staleTime: 1000 * 60,
  });

  return (
    <>
      {data?.length !== 0 ? (
        <>
          <NavigationContainer $role="prev">
            <NavButton $role="prev" $id={componentId.toString()}>
              <SlArrowLeft />
            </NavButton>
          </NavigationContainer>
          <NavigationContainer $role="next">
            <NavButton $role="next" $id={componentId.toString()}>
              <SlArrowRight />
            </NavButton>
          </NavigationContainer>
          <Swiper
            slidesPerView={5}
            spaceBetween={20}
            className="latestView !py-2"
            slidesPerGroup={5}
            speed={1000}
            navigation={{
              nextEl: `.custom-next-${componentId}`,
              prevEl: `.custom-prev-${componentId}`,
            }}
            modules={[Navigation]}
          >
            {data?.map((item: ProductType, i: number) => (
              <SwiperSlide key={i}>
                <VerticalCard
                  id={item.project_id}
                  isLoading={isLoading}
                  title={item.title}
                  description={item.short_description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[200px] opacity-20 gap-7">
          <GiNothingToSay className="text-[70px]" />
          <Title>프로젝트가 없어요</Title>
        </div>
      )}
    </>
  );
};
