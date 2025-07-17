import { useQuery } from '@tanstack/react-query';
import { ProductDetail } from '../types/product';
import { getProductDetail } from '../api/proudct';

export const useGetProductDetail = (id: string) => {
  return useQuery<ProductDetail>({
    queryKey: ['productInfo', id],
    queryFn: async () => getProductDetail(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
