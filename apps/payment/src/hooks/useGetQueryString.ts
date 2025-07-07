import { useLocation } from 'react-router-dom';

export const useGetQueryString = () => {
  const location = useLocation();
  const currentSearch = location.search;

  return decodeURIComponent(currentSearch);
};
