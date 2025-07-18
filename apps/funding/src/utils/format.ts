export const formatPrice = (value: string) => {
  const numberValue = value.replace(/[^0-9]/g, '');
  if (!numberValue) return '';
  return Number(numberValue).toLocaleString('ko-KR');
};
