import { useMutation } from '@tanstack/react-query';
import { postPayment } from '../api/payment';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// TODO : 실제 결제 시 전달해야 할 것들이 많음

export const usePaymentForm = ({
  addressData,
  addAmount,
  setShowLoading,
  setIsModalOpen,
}: {
  addressData: string;
  addAmount: number;
  setShowLoading?: (v: boolean) => void;
  setIsModalOpen: (v: boolean) => void;
}) => {
  const nav = useNavigate();

  const { mutate: reservePayment, isPending: isReserving } = useMutation({
    mutationFn: (paymentInfoId: number) =>
      postPayment({
        paymentInfoId,
        rewardId: 3,
        projectId: 2,
        amount: addAmount,
        totalAmount: addAmount,
        scheduleDate: new Date().toISOString(),
        address: addressData,
        addressNumber: 6212,
        addressInfo: '역삼역 1번 출구',
      }),
    onSuccess: () => {
      setShowLoading?.(true);
      setIsModalOpen(false);
      setTimeout(() => {
        setShowLoading?.(false);
        nav('/payment/completed');
      }, 2000);
    },
    onError: (err: AxiosError) => {
      console.error(err);
      alert('결제 예약에 실패했습니다.');
    },
  });

  return {
    reservePayment,
    isReserving,
  };
};
