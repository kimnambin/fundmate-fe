import { commonApiInstance } from '@repo/ui/hooks';

export const addLike = async (id: string) => {
  const response = await commonApiInstance.post(`/users/likes/${id}`);
  return response.data;
};

export const deleteLike = async (id: string) => {
  const response = await commonApiInstance.delete(`/users/likes/${id}`);
  return response.data;
};
