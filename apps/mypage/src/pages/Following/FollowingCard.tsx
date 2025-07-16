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

  const toggleFollow = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
      setIsFollowing((prev) => !prev);
    } catch (err) {
      console.error("팔로우/언팔로우 실패", err);
      alert("요청 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

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
      <button
        onClick={toggleFollow}
        disabled={loading}
        className={`px-6 py-4 rounded border flex items-center gap-1
          ${
            isFollowing
              ? 'bg-gray-100 text-gray-600 border-gray-300'
              : 'bg-white text-[#5FBDFF] border-[#5FBDFF]'
          }`}
      >
        {isFollowing ? '✔ 팔로잉' : '+ 팔로우'}
      </button>
    </div>
  );
};
