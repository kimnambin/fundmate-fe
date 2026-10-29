import React from 'react';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

type FollowingButtonProps = {
  following: boolean;
  setFollowing: React.Dispatch<React.SetStateAction<boolean>>;
};

/** MUI Button(outlined/contained toggle)으로 재구현한 팔로우 토글 버튼. */
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
      variant={following ? 'contained' : 'outlined'}
      color={following ? 'inherit' : 'primary'}
      size="small"
      startIcon={following ? <CheckIcon fontSize="small" /> : <AddIcon fontSize="small" />}
      onClick={toggleFollow}
      sx={{ borderRadius: 999 }}
    >
      {following ? '팔로잉' : '팔로우'}
    </Button>
  );
};
