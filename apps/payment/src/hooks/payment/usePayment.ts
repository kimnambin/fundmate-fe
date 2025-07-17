import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { postReservations } from '../../api/reservations';
import { PaymentPayload } from '../../types/payement/payment.model';

// TODO : 실제 결제 시 전달해야 할 것들이 많음

type PaymentProps = PaymentPayload & {
  setShowLoading?: (v: boolean) => void;
  setIsModalOpen: (v: boolean) => void;
};

export const usePaymentForm = ({
  paymentInfoId,
  rewardId,
  projectId,
  amount,
  totalAmount,
  scheduleDate,
  address,
  setShowLoading,
  setIsModalOpen,
}: PaymentProps) => {
  const nav = useNavigate();

  const { mutate: reservePayment, isPending: isReserving } = useMutation({
    mutationFn: (paymentInfoId: number) =>
      postReservations({
        paymentInfoId,
        rewardId,
        projectId,
        amount,
        totalAmount,
        scheduleDate,
        address,
        addressNumber: 6212,
        addressInfo: '',
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
