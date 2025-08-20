import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
// import { postReservations } from '../../api/reservations';
import { PaymentPayload } from '../../types/payement/payment.model';
import { mockPostReservations } from '../mock/useMockPayment';
import { usePaymentStore } from '../../store/mock/mockPaymentStore';

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
  const setSavedPayment = usePaymentStore((state) => state.setSavedPayment);

  const remainPrice = totalAmount - amount;

  const { mutate: reservePayment, isPending: isReserving } = useMutation({
    mutationFn: () =>
      // postReservations
      mockPostReservations({
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
    onSuccess: () => {
      // const insertedId = response.data.insertedId;
      setSavedPayment({
        paymentInfoId,
        rewardId: null,
        projectId,
        amount,
        totalAmount,
        scheduleDate,
        address,
      });

      setShowLoading?.(true);
      setIsModalOpen(false);
      alert('기한이 되면 자동 결제됩니다.');
      setTimeout(() => {
        setShowLoading?.(false);
        // nav(`/payment/${projectId}/completed?id=${insertedId}`);
        nav(`/payment/${projectId}/completed?id=${projectId}`);
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
