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
} from '../styles/product-detail/Product.style';
import { useState } from 'react';
import { FollowingButton } from '@repo/ui/components';
import { Option, User } from './PDLeft';
import { UserDefault } from '@repo/ui/assets';

interface ProductDetailProps {
  user: User;
  options: Option[];
  selectedOption?: number;
  setSelectedOption?: (index: number) => void;
}

const PDBox: React.FC<ProductDetailProps> = ({
  user,
  options,
  setSelectedOption,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const nav = useNavigate();

  return (
    <Box>
      <GiftCard
        className="w-full hover:shadow-md cursor-pointer"
        onClick={() => nav('/supporter/profile')}
      >
        <ProfileInfo>
          <ProfileInfos>창작자 소개</ProfileInfos>
          <ProfileCard>
            <div className="flex flex-row items-center">
              <ProfileImg
                src={user.image_url ? user.image_url : UserDefault}
                alt="prifile"
              />
              <GiftItemTitle>{user.nickname}</GiftItemTitle>
            </div>
            <FollowingButton
              following={isFollowing}
              setFollowing={setIsFollowing}
            />
          </ProfileCard>
          <ProfileDesc>{user.content}</ProfileDesc>
        </ProfileInfo>
      </GiftCard>

      <GiftSection>
        <GiftTitle>리워드 목록</GiftTitle>
        {options.map((Gift, idx) => (
          <GiftCard
            className="w-full hover:shadow-md cursor-pointer"
            key={idx}
            onClick={() => {
              if (setSelectedOption) {
                const isConfirmed = confirm('해당 리워드를 선택하시겠습니까??');
                if (isConfirmed) {
                  setSelectedOption(idx);
                  alert(`${Gift.title} 선택 완료!`);
                  nav(`?optionid=${idx}`);
                }
              }
            }}
          >
            <ProfileCard className="my-0">
              <GiftPrice>{Gift.price}원</GiftPrice>
              <SelectButton>12개 남음</SelectButton>
            </ProfileCard>
            <GiftItemTitle>{Gift.title}</GiftItemTitle>
            <GiftDesc>{Gift.description}</GiftDesc>
          </GiftCard>
        ))}
      </GiftSection>
    </Box>
  );
};

export default PDBox;
