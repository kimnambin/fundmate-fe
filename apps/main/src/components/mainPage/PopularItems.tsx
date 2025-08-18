import { HorizontalCard } from '@repo/ui/components';
import {
  PopularItemsContainer,
  PopularItemsGrid,
  PopularItemsHeader,
} from '../../styles/Main/MainPageComponents.style';
import { Link } from 'react-router-dom';
import { MediumFont, Title } from '@repo/ui/styles';
// import { commonApiInstance } from '@repo/ui/hooks';
// import { useQuery } from '@tanstack/react-query';
import type { ProductType } from '../../types/ProductType';
import { useState } from 'react';
import { GiNothingToSay } from 'react-icons/gi';
import { mockPopularProducts } from '@repo/ui/mocks';

// const getPopularData = async () => {
//   const response = await commonApiInstance.get('/api/projects/popular?limit=8');
//   return response.data;
// };

export const PopularItems = () => {
  const [lastUpdated] = useState('');

  // ============✔️TODO : 임시 데이터를 위한 주석===============
  // const { data, isLoading } = useQuery({
  //   queryKey: ['PopularItems'],
  //   queryFn: getPopularData,
  //   staleTime: 1000 * 60,
  //   refetchInterval: 1000 * 60 * 30,
  //   refetchIntervalInBackground: true,
  // });

  // useEffect(() => {
  //   if (data) {
  //     const now = new Date().toLocaleString();
  //     setLastUpdated(now);
  //   }
  // }, [data]);

  return (
    <PopularItemsContainer>
      <PopularItemsHeader>
        <div className="flex flex-col items-start">
          <Title>인기 프로젝트</Title>
          <MediumFont className="text-gray-400">{lastUpdated} 기준</MediumFont>
        </div>
        <Link to="/search?popular=1" className="text-base text-gray-400">
          <MediumFont>전체보기</MediumFont>
        </Link>
      </PopularItemsHeader>
      <PopularItemsGrid>
        {mockPopularProducts?.length ? (
          <>
            {mockPopularProducts?.map((item: ProductType, i: number) => (
              <HorizontalCard
                key={item.image_url}
                number={(i + 1).toString()}
                // isLoading={isLoading}
                title={item.title}
                description={item.short_description}
                id={item.project_id}
                imageUrl={item.image_url}
              />
            ))}
          </>
        ) : (
          <div className="row-span-8 flex flex-col items-center justify-center gep-10 opacity-20">
            <GiNothingToSay className="text-[70px]" />
            <Title>프로젝트가 없어요</Title>
          </div>
        )}
      </PopularItemsGrid>
    </PopularItemsContainer>
  );
};
