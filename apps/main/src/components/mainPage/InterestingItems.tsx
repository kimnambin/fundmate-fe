import { VerticalCard } from '@repo/ui/components';
import { range } from '../../utils/tempRange';
import {
  InterestingItemsContainer,
  InterestingItemsGrid,
} from '../../styles/Main/MainPageComponents.style';

export const InterestingItems = () => {
  const isLoading = false;
  return (
    <InterestingItemsContainer>
      <InterestingItemsGrid>
        {range(8).map((i) => (
          <VerticalCard key={i} isLoading={isLoading} />
        ))}
      </InterestingItemsGrid>
    </InterestingItemsContainer>
  );
};
