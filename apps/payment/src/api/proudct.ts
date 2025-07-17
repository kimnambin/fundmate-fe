import { commonApiInstance } from '@repo/ui/hooks';

export const getProductDetail = async (id: string) => {
  const response = await commonApiInstance.get(`/projects/${id}`);
  return response.data;
};
