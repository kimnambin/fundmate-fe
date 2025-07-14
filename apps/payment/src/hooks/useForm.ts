import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { coverSec } from '../utils/security';
import { PaymentProps } from '../types/modal.model';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
// import { useGetQueryString } from './useGetQueryString';

export const useTransferForm = ({
  addAmount,
  addressData,
  method,
  setIsModalOpen,
  setShowLoading,
}: PaymentProps) => {
  const [bank, setBank] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [birthDate, setBirthDate] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const nav = useNavigate();
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
      axios.post('/payment/transfer', {
        method,
        bank,
        token: coverSec(addressData),
        masked: coverSec(number),
        extra: {
          owner,
        },
        amount: addAmount,
      }),
    onSuccess: (res) => {
      console.log('응답 데이터', res.data);

      setTimeout(() => {
        nav('/payment/completed');
      }, 2000);
    },
    onError: (err: AxiosError) => {
      console.log(err);
      alert(`입력한 내용을 다시 한번 확인해주세요`);
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
  addAmount,
  addressData,
  method,
  setIsModalOpen,
  setShowLoading,
}: PaymentProps) => {
  const [bank] = useState<string>('KB');
  const [number, setNumber] = useState(['', '', '', '']);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const nav = useNavigate();

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
      axios.post('/payment/card', {
        method,
        bank,
        token: coverSec(addressData),
        masked: coverSec(fullCardNumber),
        extra: {
          expMonth: expiryDate.slice(0, 2),
          expYear: expiryDate.slice(2),
        },
        amount: addAmount,
      }),
    onSuccess: (res) => {
      console.log('응답 데이터', res.data);
      setShowLoading?.(true);
      setTimeout(() => {
        nav('/payment/completed');
      }, 2000);
    },

    onError: (e: AxiosError) => {
      console.log(e);
      alert('입력한 내용을 다시 한번 확인해주세요');
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
