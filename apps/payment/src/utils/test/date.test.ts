import { monthList, yearList, todayDate } from '../date';

describe('monthList', () => {
  it('달을 제대로 반환해주는 지', () => {
    const result = monthList();
    expect(result).toHaveLength(12);
    expect(result[0]).toEqual({ value: 1, label: '01' });
    expect(result[11]).toEqual({ value: 12, label: '12' });

    result.forEach((item, index) => {
      expect(item.value).toBe(index + 1);
      expect(item.label).toBe(String(index + 1).padStart(2, '0'));
    });
  });
});

describe('yearList', () => {
  it('년도를 제대로 반환해주는 지', () => {
    const currentYear = new Date().getFullYear();
    const result = yearList(5);
    expect(result).toHaveLength(5);
    expect(result[0]).toBe(currentYear);
    expect(result[4]).toBe(currentYear + 4);
  });
});

describe('todayDate', () => {
  it('오늘 날짜 테스트', () => {
    const today = new Date();
    const result = todayDate({
      y: today.getFullYear(),
      m: today.getMonth() + 1,
      d: today.getDate(),
    });
    expect(result).toBe(0);
  });

  it('지난 날짜 반환', () => {
    const result = todayDate({ y: 2020, m: 1, d: 1 });
    expect(result).toBeGreaterThan(0);
  });

  it('미래 날짜 반환', () => {
    const future = new Date();
    future.setDate(future.getDate() + 5);
    const result = todayDate({
      y: future.getFullYear(),
      m: future.getMonth() + 1,
      d: future.getDate(),
    });
    expect(result).toBe(-5);
  });
});
