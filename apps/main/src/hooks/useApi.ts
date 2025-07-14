import { axiosInstance } from '@repo/ui/hooks'

export const getPosts = async (page: number) => {
  try {
    const response = await axiosInstance.get(`/text?page=${page}`);
    return response.data;
  } catch (err) {
    console.error('Error fetching posts:', err);
    throw err;
  }
}
