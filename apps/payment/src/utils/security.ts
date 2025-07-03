export const coverSec = (v: string | number) => {
  const strValue = String(v);
  const length = strValue.length;

  return length > 3
    ? strValue.slice(0, 3) + '*'.repeat(Math.max(0, length - 3))
    : strValue.slice(0, 1) + '*'.repeat(Math.max(0, length - 1));
};
