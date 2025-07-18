/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { useCardPayForm, useTransferForm } from '../useForm';
import { TransferProps } from '../../types/modal.model';
import axios from 'axios';

jest.mock('axios');

jest.mock('../useGetQueryString', () => ({
  useGetQueryString: () => '?done=true',
}));

const mockedPost = axios.post as jest.Mock;

describe('useTransferForm', () => {
  const defaultProps: TransferProps = {
    addAmount: 5000,
    addressData: '서울시 마포구',
    setIsModalOpen: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    window.confirm = jest.fn(() => true);
  });

  it('값이 비었을 때', () => {
    const { result } = renderHook(() => useTransferForm(defaultProps));
    expect(result.current.selectedBank).toBe('');
    expect(result.current.accountNumber).toBe('');
    expect(result.current.accountHolder).toBe('');
    expect(result.current.birthDate).toBe('');
  });
  it('은행 선택 시', () => {
    const { result } = renderHook(() => useTransferForm(defaultProps));

    act(() => {
      result.current.handleBankChange({
        target: { value: '국민은행' },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    expect(result.current.selectedBank).toBe('국민은행');
  });

  it('실패 상황', () => {
    const { result } = renderHook(() => useTransferForm(defaultProps));
    expect(result.current.isFormValid).toBe(false);
  });

  it('성공 시', async () => {
    const { result } = renderHook(() => useTransferForm(defaultProps));

    act(() => {
      result.current.setAccountNumber('1234567890');
      result.current.setAccountHolder('홍길동');
      result.current.setBirthDate('19900101');
    });

    mockedPost.mockResolvedValueOnce({ data: { success: true } });

    await act(async () => {
      await result.current.handleTransfer();
    });
  });

  it('결제 시 문제가 발생했을 때', async () => {
    const { result } = renderHook(() => useTransferForm(defaultProps));

    await act(async () => {
      await result.current.handleTransfer();
    });

    expect(window.alert).toHaveBeenCalledWith('모두 입력해주세요.');
    expect(mockedPost).not.toHaveBeenCalled();
  });
});

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));
jest.mock('../useGetQueryString', () => ({
  useGetQueryString: () => '?confirm=true',
}));

const defaultProps = {
  addAmount: 50000,
  addressData: '서울시 강남구',
  setIsModalOpen: jest.fn(),
};

describe('useCardPayForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    window.confirm = jest.fn(() => true);
  });

  it('초기 상태값이 정확해야 함', () => {
    const { result } = renderHook(() => useCardPayForm(defaultProps));
    expect(result.current.cardNumber).toEqual(['', '', '', '']);
    expect(result.current.expiryDate).toBe('');
    expect(result.current.cvv).toBe('');
    expect(result.current.cardName).toBe('');
    expect(result.current.isFormValid).toBe(false);
  });

  it('성공 시', () => {
    const { result } = renderHook(() => useCardPayForm(defaultProps));
    act(() => {
      result.current.setCardNumber(['1111', '2222', '3333', '4444']);
      result.current.setExpiryDate('12/29');
      result.current.setCvv('123');
      result.current.setCardName('홍길동');
    });
    expect(result.current.isFormValid).toBe(true);
  });

  it('실패시', async () => {
    const { result } = renderHook(() => useCardPayForm(defaultProps));
    await act(async () => {
      await result.current.handleCardPay();
    });
    expect(window.alert).toHaveBeenCalledWith('모두 입력해주세요.');
    expect(mockedPost).not.toHaveBeenCalled();
  });

  it('성공적으로 결제가 됨', async () => {
    const { result } = renderHook(() => useCardPayForm(defaultProps));
    act(() => {
      result.current.setCardNumber(['1111', '2222', '3333', '4444']);
      result.current.setExpiryDate('12/30');
      result.current.setCvv('789');
      result.current.setCardName('테스트유저');
    });

    mockedPost.mockResolvedValueOnce({ data: { success: true } });

    await act(async () => {
      await result.current.handleCardPay();
    });
  });

  it('결제 중 실패 시', async () => {
    (window.confirm as jest.Mock).mockReturnValueOnce(false);
    const { result } = renderHook(() => useCardPayForm(defaultProps));
    act(() => {
      result.current.setCardNumber(['1234', '5678', '9012', '3456']);
      result.current.setExpiryDate('01/27');
      result.current.setCvv('321');
      result.current.setCardName('비확인');
    });

    await act(async () => {
      await result.current.handleCardPay();
    });

    expect(mockedPost).not.toHaveBeenCalled();
  });
});
