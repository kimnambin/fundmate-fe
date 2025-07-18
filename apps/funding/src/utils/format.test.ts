import { formatPrice } from './format';

describe('formatPrice', () => {
  it('숫자 3자리마다 쉼표 붙이기', () => {
    expect(formatPrice('1234')).toBe('1,234');
    expect(formatPrice('123456789')).toBe('123,456,789');
  });

  it('문자가 섞여도 숫자만 추출해서 포맷', () => {
    expect(formatPrice('1a2b3c4de')).toBe('1,234');
  });

  it('빈 문자열이면 빈 문자열 반환', () => {
    expect(formatPrice('')).toBe('');
  });

  it('0이면 0반환', () => {
    expect(formatPrice('0')).toBe('0');
  });

  it('0이 아닌 수의 맨 앞자리가 0이면 제거', () => {
    expect(formatPrice('001234')).toBe('1,234');
  });
});
