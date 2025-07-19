import { create } from 'zustand';

interface statisticsStoreProps {
  isKeywordDataSubmitted: boolean;
  isOptionDataSubmitted: boolean;
  setKeywordDataSubmitState: (value: boolean) => void;
  setOptionDataSubmitState: (value: boolean) => void;
}

export const statisticsStore = create<statisticsStoreProps>()((set) => ({
  isKeywordDataSubmitted: false,
  isOptionDataSubmitted: false,
  setKeywordDataSubmitState: (value) => set({ isKeywordDataSubmitted: value }),
  setOptionDataSubmitState: (value) => set({ isOptionDataSubmitted: value }),
}));

interface dataTypeStoreProps {
  dataType: 'keyword' | 'option';
  setDataType: (type: 'keyword' | 'option') => void;
}

export const dataTypeStore = create<dataTypeStoreProps>()((set) => ({
  dataType: 'keyword',
  setDataType: (type) => set({ dataType: type }), // 올바르게 사용
}));
