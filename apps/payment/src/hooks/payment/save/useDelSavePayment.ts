import { useMutation } from '@tanstack/react-query';
// import { delPaymentSave } from '../../../api/payment';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { usePaymentStore } from '../../../store/mock/mockPaymentStore';

export const useDelSavePayment = () => {
  const nav = useNavigate();
  const { delSavedPayment } = usePaymentStore();

  return useMutation({
    // mutationFn: async (id: number) => {
    //   const res = await delPaymentSave(id);
    //   return res.data;
    // },
    mutationFn: async () => {
      delSavedPayment();
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
