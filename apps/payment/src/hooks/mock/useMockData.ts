import { useEffect, useMemo } from 'react';
import useMockStore from '../../store/mock/mockDataStore';
import {
  mockPopularProducts,
  mockProducts,
  mockProductUserData,
  mockRecentlyProducts,
} from '@repo/ui/mocks';
import { useGetQueryString } from '../useGetQueryString';
import { ProductType } from '@repo/ui/types';
import { ProductDetailProps } from '../../components/product-detail/PDLeft';

const useProjectData = () => {
  const { setProjectId, setProductData, setUserData } = useMockStore();

  const projectId = useGetQueryString();
  const id = Number(projectId);

  // 첫 렌더부터 값이 있어야 NotFound가 깜빡이거나 남지 않는다. (스토어는 effect 이후에야 채워진다)
  const { productData, userData } = useMemo(() => {
    const allProjects = [
      ...mockProducts,
      ...mockPopularProducts,
      ...mockRecentlyProducts,
    ];

    const foundProductData = allProjects.find(
      (item) => item.project_id === id
    ) as ProductType | undefined;

    if (!foundProductData) {
      return { productData: null, userData: null };
    }

    const foundUserData = mockProductUserData.find((user) => user.id === id);
    const userData: ProductDetailProps = foundUserData ?? {
      user: { image_url: '', nickname: '', content: null },
      options: [],
      description: '',
    };

    return { productData: foundProductData, userData };
  }, [id]);

  // 스토어를 직접 읽는 컴포넌트(PaymentFinal 등)를 위해 동기화한다.
  useEffect(() => {
    setProjectId(id);
    setProductData(productData);
    setUserData(userData);
  }, [id, productData, userData, setProjectId, setProductData, setUserData]);

  return { id, productData, userData };
};

export default useProjectData;
