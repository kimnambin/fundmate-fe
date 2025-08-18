/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../../../../../packages/ui/hooks/isMobile';

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
  });

  it('모바일 화면 일 때', () => {
    window.innerWidth = 500;

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('모바일 화면 x', () => {
    window.innerWidth = 1024;

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('화면 크기가 변했을 때', () => {
    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 480;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(true);

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(false);
  });
});
