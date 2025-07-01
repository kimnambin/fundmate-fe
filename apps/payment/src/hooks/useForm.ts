import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNum } from '../utils/numbers';
import { TransferProps } from '../components/modal/TransferModal';

export const useTransferForm = ({
  addAmount,
  setIsModalOpen,
}: TransferProps) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);

  const movePage = useNavigate();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleTransfer = () => {
    if (!isFormValid) {
      alert('모두 입력해주세요.');
      return;
    }

    const confirmed = confirm(
      `${formatNum(addAmount)}원을 정말로 이체하시겠습니까??`
    );

    if (confirmed) {
      movePage('/payment-completed');
    }
  };

  const isFormValid =
    accountNumber.trim() !== '' &&
    accountHolder.trim() !== '' &&
    birthDate.trim() !== '';

  return {
    accountNumber,
    accountHolder,
    birthDate,
    isBusinessAccount,
    setAccountNumber,
    setAccountHolder,
    setBirthDate,
    handleTransfer,
    setIsBusinessAccount,
    isFormValid,
    handleClose,
  };
};

export const useCardPayForm = ({
  addAmount,
  setIsModalOpen,
}: TransferProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const movePage = useNavigate();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const isFormValid =
    cardNumber.trim() !== '' &&
    expiryDate.trim() !== '' &&
    cvv.trim() !== '' &&
    cardName.trim() !== '';

  const handleCardPay = () => {
    if (!isFormValid) {
      alert('모두 입력해주세요.');
      return;
    }

    const confirmed = confirm(
      `${formatNum(addAmount)}원을 정말로 이체하시겠습니까??`
    );

    if (confirmed) {
      movePage('/payment-completed');
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
  };
};
