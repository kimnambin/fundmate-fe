import { useState } from "react";

interface FollowingCardProps {
  id: number;
  name: string; // 닉네임
  initial: string;
  isFollowing: boolean;
}

export const FollowingCard = ({
  name,
  initial,
  isFollowing: initialFollowing,
}: FollowingCardProps) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center w-[900px] p-4 bg-white rounded shadow">
      <div className="flex items-center gap-4">
        {/* 아바타 */}
        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-[#5FBDFF] text-lg font-medium">
          {initial}
        </div>
        <div className="text-[14px] font-semibold">{name}</div>
      </div>

      {/* 팔로우/팔로잉 버튼 */}
      <button
        onClick={toggleFollow}
        className={`px-4 py-2 rounded border flex items-center gap-1
          ${isFollowing
            ? "bg-gray-100 text-gray-600 border-gray-300"
            : "bg-white text-[#5FBDFF] border-[#5FBDFF]"
          }`}
      >
        {isFollowing ? "✔ 팔로잉" : "+ 팔로우"}
      </button>
    </div>
  );
};
