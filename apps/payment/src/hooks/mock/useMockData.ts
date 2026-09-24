import { useEffect } from 'react';
import useMockStore from '../../store/mock/mockDataStore';
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

  const defaultProductData: ProductType = {
    project_id: 0,
    image_url: '',
    title: '',
    short_description: '',
    goal_amount: 0,
    current_amount: 0,
    achievement: 0,
    remaining_day: 0,
  };

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

    setProductData(foundProductData ?? defaultProductData);

    if (foundProductData) {
      const foundUserData = mockProductUserData.find((user) => user.id === id);
      setUserData(
        foundUserData ?? {
          user: { image_url: '', nickname: '', content: null },
          options: [],
          description: '',
        }
      );
    }
  }, [id, setProjectId, setProductData, setUserData]);

  return { id, productData, userData };
};

export default useProjectData;
