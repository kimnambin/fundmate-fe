import { coverSec } from '../security';

describe('coverSec', () => {
  it('3개 이하로 입력했을 때 보안코드로 잘 바꿔주는 지', () => {
    expect(coverSec('1')).toBe('1');
    expect(coverSec('12')).toBe('1*');
    expect(coverSec('abc')).toBe('a**');
  });

  it('3개 이상일 때', () => {
    expect(coverSec('123456')).toBe('123***');
    expect(coverSec('abcdef')).toBe('abc***');
    expect(coverSec(987654321)).toBe('987******');
  });

  it('1개만 입력되었을 시', () => {
    expect(coverSec('a')).toBe('a');
  });

  it('숫자 잘되는 지', () => {
    expect(coverSec(123)).toBe('1**');
    expect(coverSec(42)).toBe('4*');
    expect(coverSec(5)).toBe('5');
  });

  it('입력이 되지 않았을 때', () => {
    expect(coverSec('')).toBe('');
  });
});
