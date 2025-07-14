import { useNavigate } from 'react-router-dom';
import {
  Box,
  GiftCard,
  GiftDesc,
  GiftItemTitle,
  GiftPrice,
  GiftSection,
  GiftTitle,
  ProfileCard,
  ProfileDesc,
  ProfileImg,
  ProfileInfo,
  ProfileInfos,
  SelectButton,
} from '../styles/product-detail/prdouctstyle.style';
import { useState } from 'react';

const PDBox = () => {
  // TODO : 임시 데이터

  interface CreatorData {
    imageUrl: string;
    name: string;
    isFollowing: boolean;
    description: string;
  }

  const creatorData: CreatorData = {
    imageUrl: '이미지 URL',
    name: '이름',
    isFollowing: false,
    description: '설명',
  };

  const gift = [
    {
      title: '기본 리워드',
      desc: '선물 없이 후원하기',
      price: '1,000',
    },
    {
      title: '스페셜 리워드',
      desc: '프린터 + 예비 부품 + 포스터',
      price: '75,000',
    },
    {
      title: '스페셜 리워드',
      desc: '프린터 + 예비 부품 + 포스터',
      price: '55,000',
    },
  ];

  const [isFollowing, setIsFollowing] = useState(false);
  const toggleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsFollowing((prev: boolean) => !prev);
  };

  const nav = useNavigate();

  return (
    <Box>
      {/* TODO 여기 잘되는 지 살펴보기 */}
      <GiftCard
        className="w-full hover:shadow-md cursor-pointer"
        onClick={() => nav('/supporter/profile')}
      >
        <ProfileInfo>
          <ProfileInfos>창작자 소개</ProfileInfos>
          <ProfileCard>
            <div className="flex flex-row items-center">
              <ProfileImg src={creatorData.imageUrl} alt="prifile" />
              <GiftItemTitle>{creatorData.name}</GiftItemTitle>
            </div>
            <button
              onClick={toggleFollow}
              className={`px-4 py-2 rounded border gap-1
          ${
            isFollowing
              ? 'bg-gray-100 text-gray-600 border-gray-300'
              : 'bg-white text-[#5FBDFF] border-[#5FBDFF]'
          }`}
            >
              {isFollowing ? '✔ 팔로잉' : '+ 팔로우'}
            </button>
          </ProfileCard>
          <ProfileDesc>{creatorData.description}</ProfileDesc>
        </ProfileInfo>
      </GiftCard>

      <GiftSection>
        <GiftTitle>리워드 목록</GiftTitle>
        {gift.map((Gift, idx) => (
          <GiftCard key={idx}>
            <ProfileCard className="my-0">
              <GiftPrice>{Gift.price}원</GiftPrice>
              <SelectButton>12개 남음</SelectButton>
            </ProfileCard>
            <GiftItemTitle>{Gift.title}</GiftItemTitle>
            <GiftDesc>{Gift.desc}</GiftDesc>
          </GiftCard>
        ))}
      </GiftSection>
    </Box>
  );
};

export default PDBox;
