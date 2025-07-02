import { useState } from 'react';
import { formatNum } from '../utils/numbers';
import { TransferProps } from '../components/modal/TransferModal';
import axios from 'axios';
import { coverSec } from '../utils/security';

export const useTransferForm = ({
  addAmount,
  setIsModalOpen,
}: TransferProps) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);
  const [confirmed] = useState(false);
  const [, setIsLoading] = useState(false);

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(event.target.value);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const isFormValid =
    accountNumber.trim() !== '' &&
    accountHolder.trim() !== '' &&
    birthDate.trim() !== '';

  const handleTransfer = async () => {
    if (!isFormValid) {
      alert('모두 입력해주세요.');
      return;
    }

    const ok = confirm(`${formatNum(addAmount)}원을 정말로 이체하시겠습니까??`);
    if (!ok) return;

    setIsLoading(true);
    try {
      const res = await axios.post('/payment/transfer', {
        selectedBank,
        accountNumber: coverSec(accountNumber),
        accountHolder: coverSec(accountHolder),
        birthDate: coverSec(birthDate),
        amount: addAmount,
      });

      console.log('응답 데이터', res.data);
      alert('결제가 완료되었습니다.');
      window.location.href = '/payment-completed';
    } catch (err) {
      alert(`입력한 내용을 다시 한번 확인해주세요`);
    } finally {
      setIsLoading(false);
    }
  };

  if (confirmed) {
    window.location.href = '/payment-completed';
  }

  return {
    selectedBank,
    accountNumber,
    accountHolder,
    birthDate,
    isBusinessAccount,
    handleBankChange,
    setAccountNumber,
    setAccountHolder,
    setBirthDate,
    setIsBusinessAccount,
    isFormValid,
    handleClose,
    handleTransfer,
  };
};

export const useCardPayForm = ({
  addAmount,
  setIsModalOpen,
}: TransferProps) => {
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [confirmed] = useState(false);
  const [, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const isFormValid =
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

    const ok = confirm(`${formatNum(addAmount)}원을 정말로 이체하시겠습니까??`);
    if (!ok) return;

    setIsLoading(true);
    try {
      const res = await axios.post('/payment/card', {
        cardNumber: coverSec(fullCardNumber),
        expiryDate: coverSec(expiryDate),
        cvv: coverSec(cvv),
        cardName: coverSec(cardName),
        amount: addAmount,
      });

      console.log('응답 데이터', res.data);
      alert('결제가 완료되었습니다.');
      window.location.href = '/payment-completed';
    } catch (err) {
      alert(`입력한 내용을 다시 한번 확인해주세요`);
    } finally {
      setIsLoading(false);
    }
  };

  if (confirmed) {
    window.location.href = '/payment-completed';
  }

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
