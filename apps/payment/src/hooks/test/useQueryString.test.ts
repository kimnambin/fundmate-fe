/**
 * @jest-environment jsdom
 */
console.log('현재 환경:', typeof window !== 'undefined' ? 'jsdom' : 'node');
import { renderHook } from '@testing-library/react';
import useQueryString from '../useQueryString';

const mockNav = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNav,
}));

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: new URL('http://localhost'),
    writable: true,
  });
});

describe('useQueryString', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('성공적으로 보냄', () => {
    renderHook(() => useQueryString('제목'));
    expect(mockNav).toHaveBeenCalledWith('?title=제목');
  });

  it('보내는 값이 변경되었을 때', () => {
    const { rerender } = renderHook(({ val }) => useQueryString(val), {
      initialProps: { val: '테스트' },
    });

    expect(mockNav).toHaveBeenCalledWith('?title=테스트');

    rerender({ val: '수정됨' });

    expect(mockNav).toHaveBeenCalledWith('?title=수정됨');
  });
  it('jsdom 환경 테스트용', () => {
    expect(window.location.origin).toBe('http://localhost');
  });
});
