import { apiClient } from '@repo/ui/api-client';

export interface FollowUserResponse {
  userId: number;
  nickname: string;
  imageUrl?: string | null;
}

export const getFollowingUsers = async (): Promise<FollowUserResponse[]> => {
  const res = await apiClient.get("/api/users/mypage/following");
  return res.data?.following ?? [];
};

export const getFollowerUsers = async (): Promise<FollowUserResponse[]> => {
  const res = await apiClient.get("/api/users/mypage/follower");
  return res.data?.follower ?? []; 
};

export const followUser = async (userId: number) => {
  const res = await apiClient.post(
    "/api/users/following",
    { following_id: userId }
  );
  return res.data;
};

export const unfollowUser = async (userId: number) => {
  const res = await apiClient.delete("/api/users/following", {
    data: { following_id: userId }, 
  });
  return res.data;
};
