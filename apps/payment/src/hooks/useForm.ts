import { useState } from 'react';

export const useTransferForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
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
    setIsBusinessAccount,
    isFormValid,
    handleClose,
  };
};

export const useCardPayForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const isFormValid =
    cardNumber.trim() !== '' &&
    expiryDate.trim() !== '' &&
    cvv.trim() !== '' &&
    cardName.trim() !== '';

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
  };
};
