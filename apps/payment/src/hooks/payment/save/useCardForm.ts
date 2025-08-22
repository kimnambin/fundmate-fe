import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PaymentProps } from '../../../types/payement/modal.model';
import { useState } from 'react';
import { mockPostPayment } from '../../mock/useMockPayment';
import { coverSec } from '../../../utils/security';

export interface CardFormValues {
  cardNumber0: string;
  cardNumber1: string;
  cardNumber2: string;
  cardNumber3: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  cardName: string;
}

export const useCardPayForm = ({
  addressData,
  method,
  setIsModalOpen,
  setShowLoading,
  setSavedPaymentId,
}: PaymentProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const bank = 'KB';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CardFormValues>({
    mode: 'onChange',
  });

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCardPay = handleSubmit(() => {
    if (!addressData || addressData.trim() === '') {
      alert('주소 정보를 확인해주세요.');
      return;
    }
    setIsConfirmModalOpen(true);
  });

  const cardPaymentForm = useMutation({
    mutationFn: () => {
      const values = watch();
      const fullCardNumber = [
        values.cardNumber0,
        values.cardNumber1,
        values.cardNumber2,
        values.cardNumber3,
      ].join('');

      return mockPostPayment({
        method,
        code: bank,
        token: 'fff',
        displayInfo: coverSec(fullCardNumber),
        details: {
          type: 'card',
          expMonth: values.expiryMonth,
          expYear: values.expiryYear,
        },
      });
    },
    onSuccess: (res) => {
      const insertedId = res.data?.insertedId;
      if (insertedId) {
        setSavedPaymentId(insertedId);
      }
      alert('결제수단이 등록되었습니다.');
      setShowLoading?.(false);
    },
    onError: (e: AxiosError) => {
      console.error(e);
      alert('입력한 내용을 다시 한번 확인해주세요');
      setShowLoading?.(false);
      setIsConfirmModalOpen(false);
    },
    onSettled: () => {
      setIsConfirmModalOpen(false);
    },
  });

  const confirmPayment = () => {
    setShowLoading?.(true);
    setIsModalOpen(false);
    cardPaymentForm.mutate();
  };

  return {
    register,
    handleCardPay,
    confirmPayment,
    handleClose,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    errors,
    isValid,
    watch,
    isLoading: cardPaymentForm.isPending,
  };
};
