import React, { useState } from 'react';
import { AxiosError } from 'axios';

import { useMutation } from '@tanstack/react-query';
import { PaymentProps } from '../../../types/payement/modal.model';
import { bankPaymentSave, CardPaymentSave } from '../../../api/payment';
import { coverSec } from '../../../utils/security';

// import { useGetQueryString } from './useGetQueryString';

export const useTransferForm = ({
  addressData,
  method,
  setIsModalOpen,
  setShowLoading,
  setSavedPaymentId,
}: PaymentProps) => {
  const [bank, setBank] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [birthDate, setBirthDate] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // const url = useGetQueryString();

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBank(event.target.value);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const isFormValid =
    addressData.trim() !== '' &&
    number.trim() !== '' &&
    owner.trim() !== '' &&
    birthDate.trim() !== '';

  const handleTransfer = async () => {
    if (!isFormValid) {
      alert('모두 입력해주세요.');
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const bankForm = useMutation({
    mutationFn: () =>
      bankPaymentSave({
        // userId: '1',
        method,
        code: bank,
        token: 'fff',
        displayInfo: coverSec(number),
        details: {
          type: 'vbank',
          owner,
        },
      }),
    onSuccess: (res) => {
      console.log('응답 데이터', res.data);
      const insertedId = res.data?.insertedId;
      alert('결제수단이 등록되었습니다.');

      if (insertedId) {
        setSavedPaymentId(insertedId);
      }

      setShowLoading?.(false);
    },
    onError: (err: AxiosError) => {
      console.log(err);
      alert(`입력한 내용을 다시 한번 확인해주세요`);
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
    bank,
    number,
    owner,
    setOwner,
    birthDate,
    handleBankChange,
    setNumber,
    setBirthDate,
    isFormValid,
    handleClose,
    handleTransfer,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    confirmPayment,
    isLoading: bankForm.isPending,
  };
};

export const useCardPayForm = ({
  addressData,
  method,
  setIsModalOpen,
  setShowLoading,
  setSavedPaymentId,
}: PaymentProps) => {
  const [bank] = useState<string>('KB');
  const [number, setNumber] = useState(['', '', '', '']);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const fullCardNumber = number.join('');

  const isFormValid =
    addressData.trim() !== '' &&
    number.every((num) => num.trim() !== '') &&
    expiryDate.trim() !== '' &&
    cvc.trim() !== '' &&
    cardName.trim() !== '';

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCardPay = () => {
    if (!isFormValid) {
      alert('모두 입력해주세요.');
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const cardPaymentForm = useMutation({
    mutationFn: () =>
      CardPaymentSave({
        // userId: '1',
        method,
        code: bank,
        token: 'fff',
        displayInfo: coverSec(fullCardNumber),
        details: {
          type: 'card',
          expMonth: expiryDate.slice(0, 2),
          expYear: expiryDate.slice(2),
        },
      }),
    onSuccess: (res) => {
      console.log('응답 데이터', res.data);

      const insertedId = res.data?.insertedId;

      if (insertedId) {
        setSavedPaymentId(insertedId);
      }
      alert('결제수단이 등록되었습니다.');

      setShowLoading?.(false);
    },

    onError: (e: AxiosError) => {
      console.log(e);
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
    number,
    setNumber,
    expiryDate,
    setExpiryDate,
    cvc,
    setCvc,
    cardName,
    setCardName,
    isFormValid,
    handleClose,
    handleCardPay,
    confirmPayment,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    isLoading: cardPaymentForm.isPending,
  };
};
