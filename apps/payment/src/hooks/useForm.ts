import React, { useState } from 'react';
import axios from 'axios';
import { coverSec } from '../utils/security';
import { PaymentProps } from '../types/modal.model';
import { useNavigate } from 'react-router-dom';
// import { useGetQueryString } from './useGetQueryString';
// import { Loading } from '@repo/ui/components';
// TODO : 추후 tanstack query를 이용하여 적용 예정

export const useTransferForm = ({
  addAmount,
  addressData,
  method,
  setIsModalOpen,
}: PaymentProps) => {
  const [bank, setBank] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [birthDate, setBirthDate] = useState('');
  const [, setIsLoading] = useState(false);
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

  const confirmPayment = async () => {
    setIsLoading(true);
    try {
      // TODO : 실제 API 주소 payment-methods
      const res = await axios.post('/payment/transfer', {
        method,
        bank,
        token: coverSec(addressData),
        masked: coverSec(number),
        extra: {
          owner,
        },
        amount: addAmount,
      });

      console.log('응답 데이터', res.data);
      alert('이체가 완료되었습니다.');
      nav(`/payment/completed`);
    } catch (err) {
      alert(`입력한 내용을 다시 한번 확인해주세요`);
    } finally {
      setIsLoading(false);
    }
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
  };
};

export const useCardPayForm = ({
  addAmount,
  addressData,
  method,
  setIsModalOpen,
}: PaymentProps) => {
  const [bank, _] = useState<string>('KB');
  const [number, setNumber] = useState(['', '', '', '']);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [, setIsLoading] = useState(false);
  const nav = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // const url = useGetQueryString();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const isFormValid =
    addressData.trim() !== '' &&
    number.some((num) => num.trim() === '') === false &&
    expiryDate.trim() !== '' &&
    cvc.trim() !== '' &&
    cardName.trim() !== '';

  const fullCardNumber = number.join('');

  const handleCardPay = async () => {
    if (!isFormValid) {
      alert('모두 입력해주세요.');
      return;
    }

    setIsConfirmModalOpen(true);
  };

  const confirmPayment = async () => {
    setIsLoading(true);
    try {
      // TODO : 실제 API 주소 payment-methods
      const res = await axios.post('/payment/card', {
        method,
        bank,
        token: coverSec(addressData),
        masked: coverSec(fullCardNumber),
        extra: {
          expMonth: expiryDate.slice(0, 2),
          expYear: expiryDate.slice(2),
        },
        // cvc: coverSec(cvc),
        amount: addAmount,
      });

      console.log('응답 데이터', res.data);
      alert('결제가 완료되었습니다.');
      nav(`/payment/completed`);
    } catch (err) {
      alert(`입력한 내용을 다시 한번 확인해주세요`);
    } finally {
      setIsLoading(false);
      setIsConfirmModalOpen(false);
    }
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
  };
};
