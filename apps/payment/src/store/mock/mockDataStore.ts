import { create } from 'zustand';
import { ProductDetailProps } from '../../components/product-detail/PDLeft';
import { ProductType } from '../../../../../packages/ui/types/productType';

interface StoreState {
  projectId: number | null;
  productData: ProductType | null;
  userData: ProductDetailProps | null;
  setProjectId: (id: number | null) => void;
  setProductData: (data: ProductType | null) => void;
  setUserData: (data: ProductDetailProps | null) => void;
}

const useMockStore = create<StoreState>((set) => ({
  projectId: null,
  productData: null,
  userData: null,
  setProjectId: (id) => set({ projectId: id }),
  setProductData: (data) => set({ productData: data }),
  setUserData: (data) => set({ userData: data }),
}));

export default useMockStore;
