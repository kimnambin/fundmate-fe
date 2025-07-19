import { useLocation, useParams } from 'react-router-dom';

export const useGetQueryString = () => {
  const { projectId } = useParams();
  return projectId;
};

export const useGetoptionid = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const optionid = queryParams.get('optionid');

  return optionid;
};
