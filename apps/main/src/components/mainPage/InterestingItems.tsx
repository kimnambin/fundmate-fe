import { VerticalCard } from '@repo/ui/components';
import { range } from '../../utils/tempRange';
import {
  InterestingItemsContainer,
  InterestingItemsGrid,
} from '../../styles/Main/MainPageComponents.style';

export const InterestingItems = () => {
  return (
    <InterestingItemsContainer>
      <InterestingItemsGrid>
        {range(8).map((i) => (
          <VerticalCard key={i} />
        ))}
      </InterestingItemsGrid>
    </InterestingItemsContainer>
  );
};
