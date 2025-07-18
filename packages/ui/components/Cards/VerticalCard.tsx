import ProgressBar from '@ramonak/react-progress-bar';
import { VerticalCardContainer } from '../../styles/Card.style';
import { useNavigate } from 'react-router-dom';
import { HeartButton } from '../Likes/HeartButton';
import { MediumFont, SubTitle } from '../../styles';
import type { CardProps } from '../../types/cardType';
import { useState } from 'react';

export const VerticalCard = ({
  isLoading,
  id,
  imageUrl,
  title,
  description,
  progress,
}: CardProps) => {
  const imgSrc = imageUrl ?? 'https://picsum.photos/id/40/300/300';
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardTitle = title ?? '이것은 상품의 제목입니다.';
  const cardDescription = description ?? '이것은 상품의 상세설명입니다.';
  const cardProgress = progress ?? 100;

  const navigate = useNavigate();
  if (isLoading) {
    return (
      <VerticalCardContainer className="shadow-lg">
        <div className="flex flex-col h-full justify-between animate-pulse @[1px]/vertical:gap-3 @[250px]/vertical:gap-5 @[270px]/vertical:gap-7">
          <div className="flex flex-col gap-3 h-full">
            <div className="@[1px]/vertical:h-[200px] @[270px]/vertical:h-[250px] @[310px]/vertical:h-[290px] rounded-xl bg-gray-100 "></div>
            <div className="bg-gray-100 rounded-md h-[20px] w-[50%]"></div>
            <div className="bg-gray-100 rounded-md h-[20px]"></div>
          </div>
          <div className="bg-gray-100 rounded-md h-[20px]"></div>
        </div>
      </VerticalCardContainer>
    );
  }

  return (
    <VerticalCardContainer onClick={() => navigate(`/product/${id}`)}>
      <div className="flex flex-col h-full justify-between @[1px]/vertical:gap-3 @[200px]/vertical:gap-5 @[270px]/vertical:gap-7">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <img
              src={imgSrc}
              className={
                imageLoaded
                  ? `w-full h-auto rounded-xl object-cover`
                  : 'w-full @[1px]/vertical:h-[200px] @[270px]/vertical:h-[250px] @[310px]/vertical:h-[290px] rounded-xl bg-gray-100'
              }
              onLoad={() => setImageLoaded(true)}
            />
            <HeartButton />
          </div>
          <div className="w-full min-w-200 overflow-hidden">
            <MediumFont className="@[1px]/vertical:text-sm @[200px]/vertical:text-[16px] truncate">
              {cardTitle}
            </MediumFont>
            <MediumFont className="text-gray-500 @[1px]/vertical:text-sm @[200px]/vertical:text-[16px] truncate">
              {cardDescription}
            </MediumFont>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <SubTitle className="text-[#26AAFF]">{cardProgress}% 달성</SubTitle>
          <ProgressBar
            completed={100}
            height="5px"
            isLabelVisible={false}
            bgColor="#26AAFF"
          />
        </div>
      </div>
    </VerticalCardContainer>
  );
};
