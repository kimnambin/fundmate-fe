import { useMutation } from '@tanstack/react-query';
import { delPaymentSave } from '../../../api/payment';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const useDelSavePayment = () => {
  const nav = useNavigate();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await delPaymentSave(id);
      return res.data;
    },
    onSuccess: () => {
      alert('성공적으로 삭제되었습니다.');
      // TODO : 메인으로 이동
      nav('/');
    },
    onError: (e: AxiosError) => {
      alert(`삭제 실패: ${e?.message || '알 수 없는 오류'}`);
      console.error('삭제 실패:', e);
    },
  });
};
