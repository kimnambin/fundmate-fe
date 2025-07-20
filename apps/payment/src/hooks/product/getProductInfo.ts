import { useQuery } from '@tanstack/react-query';
import { getProductInfo } from '../../api/product';
import { ProductInfoProps } from '../../types/product/productInfo.model';

export const useGetProductInfo = (id: number) => {
  return useQuery<ProductInfoProps, Error>({
    queryKey: ['productInfo'],
    queryFn: async () => {
      const res = await getProductInfo(id);
      return res.data;
    },
    enabled: true,
  });
};
