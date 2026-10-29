import { Link } from 'react-router-dom';
import { SwiperItems } from '../Swiper';
import { SwiperContainer, SwiperLayout } from '../../styles/Swiper.style';
import { MediumFont, Title } from '@repo/ui/styles';
import { GiNothingToSay } from 'react-icons/gi';

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
        {componentId === 2 ? (
          <div className="flex flex-col gap-4 px-6">
            <Title className="text-xl font-semibold">{componentName}</Title>
            {/* 큰 빈 박스 대신 한 줄짜리 보더 카드로 — 스크롤 중 불필요한 공백을 줄였다. */}
            <div className="flex w-full items-center gap-3 rounded-xl border border-dashed border-gray-200 px-6 py-4 text-gray-400">
              <GiNothingToSay className="text-[24px] shrink-0" />
              <MediumFont className="text-gray-400">마감 임박 프로젝트가 아직 없어요</MediumFont>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-row justify-between items-end px-6">
              <Title className="text-xl font-semibold">{componentName}</Title>
              {componentId !== 1 && (
                <Link to={viewFullNav} className="text-base text-gray-400">
                  전체보기
                </Link>
              )}
            </div>
            <div>
              <SwiperItems componentId={componentId} />
            </div>
          </>
        )}
      </SwiperContainer>
    </SwiperLayout>
  );
};
