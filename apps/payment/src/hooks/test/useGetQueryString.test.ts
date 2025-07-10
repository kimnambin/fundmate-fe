/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { useGetQueryString } from '../useGetQueryString';

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    search: '?title=제목제목',
  }),
}));

describe('useGetQueryString', () => {
  it('성공적으로 가져옴', () => {
    const { result } = renderHook(() => useGetQueryString());
    expect(result.current).toBe('?title=제목제목');
  });
});
