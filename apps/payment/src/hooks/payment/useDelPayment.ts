import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
// import { delReservations } from '../../api/reservations';

export const useDelPayment = () => {
  const nav = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // const res = await delReservations(id);
      // return res.data;
    },
    onSuccess: () => {
      alert('성공적으로 삭제되었습니다.');
      nav('/');
    },
    onError: (e: AxiosError) => {
      alert(`삭제 실패`);
      console.error('삭제 실패:', e);
    },
  });
};
