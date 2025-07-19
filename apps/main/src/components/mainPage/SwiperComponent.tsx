import { Link } from 'react-router-dom';
import { SwiperItems } from '../Swiper';
import { SwiperContainer, SwiperLayout } from '../../styles/Swiper.style';
import { Title } from '@repo/ui/styles';

interface SwiperComponentsProps {
  componentId: number;
  componentName: string;
}

export const SwiperComponents = ({
  componentId,
  componentName,
}: SwiperComponentsProps) => {
  let viewFullNav = '/';
  if (componentId === 2) viewFullNav = '/search?deadline=1';
  if (componentId === 3) viewFullNav = '/search?new=1';

  return (
    <SwiperLayout $id={componentId}>
      <SwiperContainer>
        <div className="flex flex-row justify-between items-end px-6">
          <Title className="text-xl font-semibold">{componentName}</Title>
          {componentId === 1 ? (
            ''
          ) : (
            <Link to={viewFullNav} className="text-base text-gray-400">
              전체보기
            </Link>
          )}
        </div>
        <div>
          <SwiperItems componentId={componentId} />
        </div>
      </SwiperContainer>
    </SwiperLayout>
  );
};
