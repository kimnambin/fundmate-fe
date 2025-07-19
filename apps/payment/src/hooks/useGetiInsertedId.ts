import { useLocation } from 'react-router-dom';

export const useGetiInsertedId = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  return id;
};
