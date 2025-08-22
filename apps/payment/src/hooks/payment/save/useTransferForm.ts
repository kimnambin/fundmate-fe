import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PaymentProps } from '../../../types/payement/modal.model';
import { mockPostPayment } from '../../mock/useMockPayment';
import { coverSec } from '../../../utils/security';
import { useState } from 'react';

export interface TransferFormValues {
  bank: string;
  number: string;
  owner: string;
  birthDate: string;
}

export const useTransferForm = ({
  addressData,
  method,
  setIsModalOpen,
  setShowLoading,
  setSavedPaymentId,
}: PaymentProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TransferFormValues>({
    mode: 'onChange',
  });

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleTransfer = handleSubmit(() => {
    if (!addressData || addressData.trim() === '') {
      alert('주소 정보를 입력해주세요.');
      return;
    }
    setIsConfirmModalOpen(true);
  });

  const bankForm = useMutation({
    mutationFn: () => {
      const values = watch();

      return mockPostPayment({
        method,
        code: values.bank,
        token: 'fff',
        displayInfo: coverSec(values.number),
        details: {
          type: 'vbank',
          owner: values.owner,
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
    onError: (err: AxiosError) => {
      console.error(err);
      alert('입력한 내용을 다시 한번 확인해주세요');
      setShowLoading?.(false);
      setIsConfirmModalOpen(false);
    },
  });

  const confirmPayment = () => {
    setShowLoading?.(true);
    setIsModalOpen(false);
    bankForm.mutate();
  };

  return {
    register,
    handleTransfer,
    confirmPayment,
    handleClose,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    errors,
    isValid,
    watch,
    isLoading: bankForm.isPending,
  };
};
