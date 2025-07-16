import { useParams } from 'react-router-dom';

export const useGetQueryString = () => {
  const { projectId } = useParams();
  return projectId;
};
