import React, { useState } from 'react';
import axios from 'axios';
import { coverSec } from '../utils/security';
import { TransferProps } from '../types/modal.model';
import { useNavigate } from 'react-router-dom';
// import { useGetQueryString } from './useGetQueryString';
// import { Loading } from '@repo/ui/components';
// TODO : 추후 tanstack query를 이용하여 적용 예정

export const useTransferForm = ({
  addAmount,
  addressData,
  setIsModalOpen,
}: TransferProps) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [, setIsLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const nav = useNavigate();
  // const url = useGetQueryString();

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(event.target.value);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const isFormValid =
    addressData.trim() !== '' &&
    accountNumber.trim() !== '' &&
    accountHolder.trim() !== '' &&
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
      const res = await axios.post('/payment/transfer', {
        selectedBank,
        accountNumber: coverSec(accountNumber),
        accountHolder: coverSec(accountHolder),
        birthDate: coverSec(birthDate),
        amount: addAmount,
        address: coverSec(addressData),
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
    selectedBank,
    accountNumber,
    accountHolder,
    birthDate,
    handleBankChange,
    setAccountNumber,
    setAccountHolder,
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
  setIsModalOpen,
}: TransferProps) => {
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
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
    cardNumber.some((num) => num.trim() === '') === false &&
    expiryDate.trim() !== '' &&
    cvv.trim() !== '' &&
    cardName.trim() !== '';

  const fullCardNumber = cardNumber.join('');

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
      const res = await axios.post('/payment/card', {
        cardNumber: coverSec(fullCardNumber),
        expiryDate: coverSec(expiryDate),
        cvv: coverSec(cvv),
        cardName: coverSec(cardName),
        amount: addAmount,
        address: coverSec(addressData),
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
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
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
