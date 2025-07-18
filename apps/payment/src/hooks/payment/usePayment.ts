import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { postReservations } from '../../api/reservations';
import { PaymentPayload } from '../../types/payement/payment.model';

type PaymentProps = PaymentPayload & {
  setShowLoading?: (v: boolean) => void;
  setIsModalOpen: (v: boolean) => void;
};

interface ErrorResponse {
  message: string;
}

export const usePaymentForm = ({
  paymentInfoId,
  projectId,
  amount,
  totalAmount,
  scheduleDate,
  address,
  setShowLoading,
  setIsModalOpen,
}: PaymentProps) => {
  const nav = useNavigate();

  const remainPrice = totalAmount - amount;

  const { mutate: reservePayment, isPending: isReserving } = useMutation({
    mutationFn: () =>
      postReservations({
        paymentInfoId,
        rewardId: null,
        projectId,
        amount: remainPrice + amount,
        totalAmount,
        scheduleDate,
        address,
        addressNumber: 6212,
        addressInfo: '',
      }),
    onSuccess: (response: AxiosResponse<{ insertedId: number }>) => {
      const insertedId = response.data.insertedId;
      setShowLoading?.(true);
      setIsModalOpen(false);
      alert('기한이 되면 자동 결제됩니다.');
      setTimeout(() => {
        setShowLoading?.(false);
        nav(`/payment/${projectId}/completed?id=${insertedId}`);
      }, 2000);
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      const errorMessage = err.response?.data.message;
      alert(errorMessage);
      setIsModalOpen(false);
    },
  });

  return {
    reservePayment,
    isReserving,
  };
};
