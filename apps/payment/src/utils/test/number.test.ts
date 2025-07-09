import { formatNum, randomPlaceholder } from '../numbers';

describe('randomPlaceholder', () => {
  it('문자 4개를 잘 구분하는 가', () => {
    const result = randomPlaceholder(5);
    expect(result).toHaveLength(5);
    result.forEach((str) => {
      expect(typeof str).toBe('string');
      expect(/^\d{4}$/.test(str)).toBe(true);
    });
  });

  it('기본적으로 4개 반환하는 지', () => {
    const result = randomPlaceholder();
    expect(result).toHaveLength(4);
  });
});

describe('formatNum', () => {
  it('천단위로 숫자를 잘 나누는가', () => {
    expect(formatNum(1000)).toBe('1,000');
    expect(formatNum(1234567)).toBe('1,234,567');
  });

  it('0이거나 0보다 작을 때', () => {
    expect(formatNum(0)).toBe('0');
    expect(formatNum(-98765)).toBe('-98,765');
  });
});
