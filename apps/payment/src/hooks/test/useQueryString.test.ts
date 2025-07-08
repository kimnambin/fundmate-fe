/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import useQueryString from '../useQueryString';

const mockNav = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNav,
}));

describe('useQueryString', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('성공적으로 보냄', () => {
    renderHook(() => useQueryString(decodeURIComponent('제목')));
    expect(mockNav).toHaveBeenCalledWith(
      '?title=' + encodeURIComponent('제목')
    );
  });

  it('보내는 값이 변경되었을 때', () => {
    const { rerender } = renderHook(({ val }) => useQueryString(val), {
      initialProps: { val: decodeURIComponent('테스트') },
    });

    expect(mockNav).toHaveBeenCalledWith(
      '?title=' + encodeURIComponent('테스트')
    );

    rerender({ val: decodeURIComponent('수정됨') });
    expect(mockNav).toHaveBeenCalledWith(
      '?title=' + encodeURIComponent('수정됨')
    );
  });
  it('jsdom 환경 테스트용', () => {
    expect(window.location.origin).toBe('http://localhost');
  });
});
