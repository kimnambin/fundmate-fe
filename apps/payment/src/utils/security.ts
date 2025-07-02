export const coverSec = (v: string | number) => {
  if (typeof v === 'number') {
    const strNum = String(v);
    const length = strNum.length;

    return length > 3
      ? strNum.slice(0, 3) + '*'.repeat(Math.max(0, length - 3))
      : strNum.slice(0, 1) + '*'.repeat(Math.max(0, length - 1));
  }
  const length = v.length;

  return length > 3
    ? v.slice(0, 3) + '*'.repeat(Math.max(0, length - 3))
    : v.slice(0, 1) + '*'.repeat(Math.max(0, length - 1));
};
