import { useQuery } from '@tanstack/react-query';
import { userInfo } from '../../api/user';
import { UserInfoProps } from '../../types/user/userInfo.model';

export const useGetUserInfo = () => {
  return useQuery<UserInfoProps, Error>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await userInfo();
      return res.data;
    },
  });
};
