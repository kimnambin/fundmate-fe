import { FollowingButton } from '@repo/ui/components';
import { useState } from 'react';
import { followUser, unfollowUser } from '../../api/follow';

interface FollowingCardProps {
  userId: number;
  name: string;
  initial: string;
  isFollowing: boolean;
}

export const FollowingCard = ({
  userId,
  name,
  initial,
  isFollowing: initialFollowing,
}: FollowingCardProps) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-between items-center w-full p-4 bg-white rounded shadow">
      <div className="flex items-center gap-4">
        {/* 아바타 */}
        <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-[#5FBDFF] text-lg font-medium">
          {initial}
        </div>
        <div className="text-[18px] font-semibold">{name}</div>
      </div>

      {/* 팔로우/팔로잉 버튼 */}
      <FollowingButton following={isFollowing} setFollowing={setIsFollowing} />
    </div>
  );
};
