/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useGetQueryString, useGetoptionid } from '../useGetQueryString';

// react-router-dom의 useParams와 useLocation을 모의(mock)합니다.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // 다른 기능은 실제 구현을 사용
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));

// jest.mock으로 모의된 함수들을 타입 캐스팅하여 사용합니다.
const mockedUseParams = jest.requireMock('react-router-dom').useParams;
const mockedUseLocation = jest.requireMock('react-router-dom').useLocation;

describe('useGetQueryString', () => {
  it('URL 파라미터에서 projectId를 정확하게 추출해야 합니다', () => {
    // useParams가 특정 값을 반환하도록 설정합니다.
    mockedUseParams.mockReturnValue({ projectId: 'project-123' });

    const { result } = renderHook(() => useGetQueryString());

    expect(result.current).toBe('project-123');
  });
});

describe('useGetoptionid', () => {
  it('쿼리 문자열에서 optionid를 정확하게 추출해야 합니다', () => {
    // useLocation이 특정 search 값을 포함하는 객체를 반환하도록 설정합니다.
    mockedUseLocation.mockReturnValue({
      search: '?param1=value1&optionid=option-abc&param2=value2',
    });

    const { result } = renderHook(() => useGetoptionid());

    expect(result.current).toBe('option-abc');
  });

  it('optionid가 없는 경우 null을 반환해야 합니다', () => {
    mockedUseLocation.mockReturnValue({
      search: '?param1=value1&param2=value2',
    });

    const { result } = renderHook(() => useGetoptionid());

    expect(result.current).toBeNull();
  });

  it('쿼리 문자열이 없는 경우 null을 반환해야 합니다', () => {
    mockedUseLocation.mockReturnValue({
      search: '',
    });

    const { result } = renderHook(() => useGetoptionid());

    expect(result.current).toBeNull();
  });
});