import { VerticalCard } from '@repo/ui/components';
import {
  InterestingItemsContainer,
  InterestingItemsGrid,
} from '../../styles/Main/MainPageComponents.style';
import type { ProductType } from '../../types/ProductType';
import { commonApiInstance } from '@repo/ui/hooks';
import { useQuery } from '@tanstack/react-query';

const getMainPageData = async () => {
  const response = await commonApiInstance.get('/api/projects?limit=8');
  return response.data
}

export const InterestingItems = () => {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['InterestingItems'],
    queryFn: getMainPageData,
    staleTime: 1000 * 60,
  })

  return (
    <InterestingItemsContainer>
      <InterestingItemsGrid>
        {
          data?.map((item: ProductType) => (
            <VerticalCard key={item.imageId} title={item.title} description={item.shortDescription} isLoading={isLoading} />
          ))
        }
      </InterestingItemsGrid>
    </InterestingItemsContainer>
  );
};
