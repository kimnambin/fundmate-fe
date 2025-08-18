import { VerticalCard } from '@repo/ui/components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { NavButton, NavigationContainer } from '../styles/Swiper.style';
// import { commonApiInstance } from '@repo/ui/hooks';
// import { useQuery } from '@tanstack/react-query';
import type { ProductType } from '../types/ProductType';
import { GiNothingToSay } from 'react-icons/gi';
import { Title } from '@repo/ui/styles';
import { mockProducts } from '@repo/ui/mocks';

interface SwiperItemsProps {
  componentId: number;
}

// const getSwiperItems = async (id: number) => {
//   let pathname;
//   if (id === 1) {
//     pathname = '/api/projects/recent';
//   } else if (id === 2) {
//     pathname = '/api/projects/deadline';
//   } else if (id === 3) {
//     pathname = '/api/projects/new';
//   } else {
//     return;
//   }

//   // const response = await commonApiInstance.get(pathname);
//   // return response.data;
// };

export const SwiperItems = ({ componentId }: SwiperItemsProps) => {
  // ============✔️TODO : 임시 데이터를 위한 주석===============
  // const { data, isLoading } = useQuery({
  //   queryKey: [`swiper${componentId}`],
  //   queryFn: () => getSwiperItems(componentId),
  //   staleTime: 1000 * 60,
  // });

  return (
    <>
      {mockProducts?.length !== 0 ? (
        <>
          <Swiper
            spaceBetween={20}
            className="latestView !py-2"
            speed={1000}
            navigation={{
              nextEl: `.custom-next-${componentId}`,
              prevEl: `.custom-prev-${componentId}`,
            }}
            modules={[Navigation]}
            breakpoints={{
              320: { slidesPerView: 1, slidesPerGroup: 1 },
              640: { slidesPerView: 2, slidesPerGroup: 2 },
              768: { slidesPerView: 3, slidesPerGroup: 3 },
              1024: { slidesPerView: 4, slidesPerGroup: 4 },
              1280: { slidesPerView: 5, slidesPerGroup: 5 },
            }}
          >
            {mockProducts?.map((item: ProductType) => (
              <SwiperSlide key={item.image_url}>
                <VerticalCard
                  id={item.project_id}
                  title={item.title}
                  description={item.short_description}
                  imageUrl={item.image_url}
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
