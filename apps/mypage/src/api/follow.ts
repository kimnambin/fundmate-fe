import axios from 'axios';

export const getFollowingUsers = async () => {
  const res = await axios.get('/users/mypage/following', {
    withCredentials: true,
  });
  return res.data.following;
};

export const getFollowerUsers = async () => {
  const res = await axios.get('/users/mypage/follower', {
    withCredentials: true,
  });
  return res.data.follower;
};

export const followUser = async (userId: number) => {
  const res = await axios.post(`/api/follow/${userId}`, {}, {
    withCredentials: true,
  });
  return res.data;
};

export const unfollowUser = async (userId: number) => {
  const res = await axios.delete(`/api/follow/${userId}`, {
    withCredentials: true,
  });
  return res.data;
};
