import { VerticalCard } from '@repo/ui/components';
import {
  InterestingItemsContainer,
  InterestingItemsGrid,
} from '../../styles/Main/MainPageComponents.style';
import type { ProductType } from '../../types/ProductType';
// import { commonApiInstance } from '@repo/ui/hooks';
// import { useQuery } from '@tanstack/react-query';
import { GiNothingToSay } from 'react-icons/gi';
import { Title } from '@repo/ui/styles';
import { mockProducts } from '@repo/ui/mocks';

// const getMainPageData = async () => {
//   const response = await commonApiInstance.get('/api/projects?limit=8');
//   return response.data;
// };

export const InterestingItems = () => {
  // ============✔️TODO : 임시 데이터를 위한 주석===============
  // const { data, isLoading } = useQuery({
  //   queryKey: ['InterestingItems'],
  //   queryFn: getMainPageData,
  //   staleTime: 1000 * 60,
  // });

  return (
    <InterestingItemsContainer>
      <InterestingItemsGrid>
        {mockProducts?.length ? (
          <>
            {mockProducts?.map((item: ProductType) => (
              <VerticalCard
                id={item.project_id}
                key={item.project_id}
                title={item.title}
                description={item.short_description}
                imageUrl={item.image_url}
                // isLoading={isLoading}
              />
            ))}
          </>
        ) : (
          <div className="col-span-4 row-span-2 h-[600px] w-full flex flex-col items-center justify-center gap-7 opacity-20">
            <GiNothingToSay className="text-[70px]" />
            <Title>프로젝트가 없습니다</Title>
          </div>
        )}
      </InterestingItemsGrid>
    </InterestingItemsContainer>
  );
};
