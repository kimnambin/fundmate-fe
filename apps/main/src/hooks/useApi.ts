import { axiosInstance } from '@repo/ui/hooks'

export const useGetPosts = (page: number) => {
  try {
    axiosInstance.get('/text')
      .then(response => response.data)
      .catch(error => console.log(error))
  } catch (err) {
    console.log(err)
  }
}
