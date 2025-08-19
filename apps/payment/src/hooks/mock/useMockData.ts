import { useEffect } from 'react';
import useMockStore from '../../store/useMockData';
import {
  mockPopularProducts,
  mockProducts,
  mockProductUserData,
  mockRecentlyProducts,
} from '@repo/ui/mocks';
import { useGetQueryString } from '../useGetQueryString';
import { ProductType } from '../../../../../packages/ui/types/productType';

const useProjectData = () => {
  const { setProjectId, setProductData, setUserData, productData, userData } =
    useMockStore();

  const projectId = useGetQueryString();
  const id = Number(projectId);

  useEffect(() => {
    setProjectId(id);

    const allProjects = [
      ...mockProducts,
      ...mockPopularProducts,
      ...mockRecentlyProducts,
    ];

    const foundProductData = allProjects.find(
      (item) => item.project_id === id
    ) as ProductType | undefined;

    setProductData(foundProductData || null);

    if (foundProductData) {
      const foundUserData = mockProductUserData.find((user) => user.id === id);
      setUserData(foundUserData || null);
    }
  }, [setProjectId, setProductData, setUserData]);

  return { id, productData, userData };
};

export default useProjectData;
