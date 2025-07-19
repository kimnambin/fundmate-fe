import { FollowingButton } from '@repo/ui/components';
import { useNavigate } from 'react-router-dom';

interface FollowingCardProps {
  userId: number;
  name: string;
  nickname: string; // 추가
  initial: string;
  isFollowing: boolean;
  onToggleFollow: (userId: number, nextFollow: boolean) => void;
}

export const FollowingCard = ({
  userId,
  name,
  nickname,
  initial,
  isFollowing,
  onToggleFollow,
}: FollowingCardProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/user/supporter/profile/${userId}`);
  };

  return (
    <div className="flex justify-between items-center w-full p-4 bg-white rounded shadow">
      {/* 프로필 클릭 영역 */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-[#5FBDFF] text-lg font-medium">
          {initial}
        </div>
        <div className="text-[18px] font-semibold">{name}</div>
      </div>

      {/* 팔로우 / 언팔 버튼 */}
      <FollowingButton
        following={isFollowing}
        setFollowing={(next) => onToggleFollow(userId, next)}
      />
    </div>
  );
};
