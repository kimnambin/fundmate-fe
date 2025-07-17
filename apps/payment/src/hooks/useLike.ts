import { useMutation } from '@tanstack/react-query';
import { addLike, deleteLike } from '../api/like.api';

export const useAddLike = () => {
  return useMutation({
    mutationFn: (id: string) => addLike(id),
  });
};

export const useDeleteLike = () => {
  return useMutation({
    mutationFn: (id: string) => deleteLike(id),
  });
};
