/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';

import axios from 'axios';
import { PaymentProps } from '../../types/payement/modal.model';
import {
  useCardPayForm,
  useTransferForm,
} from '../payment/save/usePostPaymentSave';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => jest.fn()),
}));
jest.mock('../useGetQueryString', () => ({
  useGetQueryString: () => '?done=true',
}));

const mockedPost = axios.post as jest.Mock;

describe('이체 폼 훅 테스트', () => {
  const defaultProps: PaymentProps = {
    addressData: '서울시 마포구',
    method: 'VBANK',
    setIsModalOpen: jest.fn(),
    setShowLoading: jest.fn(),
    setSavedPaymentId: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    window.confirm = jest.fn(() => true);
  });

  it('초기 값이 비어 있어야 함', () => {
    const { result } = renderHook(() => useTransferForm(defaultProps));
    expect(result.current.bank).toBe('');
    expect(result.current.number).toBe('');
    expect(result.current.owner).toBe('');
    expect(result.current.birthDate).toBe('');
  });

  it('은행 선택 시 값이 업데이트되어야 함', () => {
    const { result } = renderHook(() => useTransferForm(defaultProps));

    act(() => {
      result.current.handleBankChange({
        target: { value: '국민은행' },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    expect(result.current.bank).toBe('국민은행');
  });

  it('필수 입력값이 비어 있을 때 유효성 검사 실패', () => {
    const { result } = renderHook(() => useTransferForm(defaultProps));
    expect(result.current.isFormValid).toBe(false);
  });

  it('유효한 입력값으로 성공해야 함', async () => {
    const { result } = renderHook(() => useTransferForm(defaultProps));

    act(() => {
      result.current.setNumber('1234567890');
      result.current.setOwner('홍길동');
      result.current.setBirthDate('19900101');
    });

    mockedPost.mockResolvedValueOnce({ data: { success: true } });

    await act(async () => {
      await result.current.confirmPayment();
    });

    expect(mockedPost).toHaveBeenCalledTimes(1);
  });

  it('양식이 유효하지 않을 때 경고를 표시해야 함', async () => {
    const { result } = renderHook(() => useTransferForm(defaultProps));

    await act(async () => {
      await result.current.handleTransfer();
    });

    expect(window.alert).toHaveBeenCalledWith('모두 입력해주세요.');
    expect(mockedPost).not.toHaveBeenCalled();
  });
});

describe('카드 결제 폼 훅 테스트', () => {
  const defaultProps: PaymentProps = {
    addressData: '서울시 강남구',
    method: 'CARD',
    setIsModalOpen: jest.fn(),
    setShowLoading: jest.fn(),
    setSavedPaymentId: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    window.confirm = jest.fn(() => true);
  });

  it('초기 상태값이 정확해야 함', () => {
    const { result } = renderHook(() => useCardPayForm(defaultProps));
    expect(result.current.number).toEqual(['', '', '', '']);
    expect(result.current.expiryDate).toBe('');
  });

  it('유효한 입력값을 가지고 있을 때 유효성 검사 성공', () => {
    const { result } = renderHook(() => useCardPayForm(defaultProps));
    act(() => {
      result.current.setNumber(['1111', '2222', '3333', '4444']);
      result.current.setExpiryDate('12/29');
      result.current.setCvc('123');
      result.current.setCardName('홍길동');
    });
    expect(result.current.isFormValid).toBe(true);
  });

  it('양식이 유효하지 않을 때 경고를 표시해야 함', async () => {
    const { result } = renderHook(() => useCardPayForm(defaultProps));
    await act(async () => {
      await result.current.handleCardPay();
    });
    expect(window.alert).toHaveBeenCalledWith('모두 입력해주세요.');
    expect(mockedPost).not.toHaveBeenCalled();
  });

  it('유효한 카드 결제로 성공해야 함', async () => {
    const { result } = renderHook(() => useCardPayForm(defaultProps));
    act(() => {
      result.current.setNumber(['1111', '2222', '3333', '4444']);
      result.current.setExpiryDate('12/30');
      result.current.setCvc('789');
      result.current.setCardName('테스트유저');
    });

    mockedPost.mockResolvedValueOnce({ data: { success: true } });

    await act(async () => {
      await result.current.handleCardPay();
    });

    expect(mockedPost).toHaveBeenCalledTimes(1); // POST 요청이 호출되었는지 검증
  });

  it('결제 취소 시 진행하지 않아야 함', async () => {
    (window.confirm as jest.Mock).mockReturnValueOnce(false);
    const { result } = renderHook(() => useCardPayForm(defaultProps));
    act(() => {
      result.current.setNumber(['1234', '5678', '9012', '3456']);
      result.current.setExpiryDate('01/27');
      result.current.setCvc('321');
      result.current.setCardName('비확인');
    });

    await act(async () => {
      await result.current.handleCardPay();
    });

    expect(mockedPost).not.toHaveBeenCalled();
  });
});
