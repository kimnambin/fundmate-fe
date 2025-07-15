import React from "react";

type FollowingButtonProps = {
  following: boolean;
  setFollowing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FollowingButton = ({ following, setFollowing }: FollowingButtonProps) => {
  const toggleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFollowing(prev => !prev);
  };

  return (
    <button
      onClick={toggleFollow}
      className={`px-6 py-4 rounded border flex items-center gap-1
          ${following
          ? 'bg-gray-100 text-gray-600 border-gray-300'
          : 'bg-white text-[#5FBDFF] border-[#5FBDFF]'
        }`}
    >
      {following ? '✔ 팔로잉' : '+ 팔로우'}
    </button>
  )
}
