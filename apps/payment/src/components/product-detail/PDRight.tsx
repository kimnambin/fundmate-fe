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
  ProfileImg,
  ProfileInfo,
  ProfileInfos,
  SelectButton,
} from '../styles/product-detail/prdouctstyle.style';
import { useState } from 'react';
import { FollowingButton } from '@repo/ui/components';
import { ProductDetailProps } from './PDLeft';

const PDBox: React.FC<ProductDetailProps> = ({ user, options }) => {
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
                src={`https://picsum.photos/id/${user.image_id}/300/200`}
                alt="prifile"
              />
              <GiftItemTitle>{user.content}</GiftItemTitle>
            </div>
            <FollowingButton
              following={isFollowing}
              setFollowing={setIsFollowing}
            />
          </ProfileCard>
        </ProfileInfo>
      </GiftCard>

      <GiftSection>
        <GiftTitle>리워드 목록</GiftTitle>
        {options.map((Gift, idx) => (
          <GiftCard key={idx}>
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
