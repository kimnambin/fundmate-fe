import React from 'react';
import { Button } from '../ui/button';

type FollowingButtonProps = {
  following: boolean;
  setFollowing: React.Dispatch<React.SetStateAction<boolean>>;
};

/** shadcn Button(outline/secondary variant)으로 재구현한 팔로우 토글 버튼. */
export const FollowingButton = ({
  following,
  setFollowing,
}: FollowingButtonProps) => {
  const toggleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFollowing((prev) => !prev);
  };

  return (
    <Button
      variant={following ? 'secondary' : 'outline'}
      size="sm"
      onClick={toggleFollow}
      className="gap-1 rounded-full"
    >
      {following ? '✔ 팔로잉' : '+ 팔로우'}
    </Button>
  );
};
