export const monthList = () => {
  return [...Array(12)].map((_, index) => ({
    value: index + 1,
    label: String(index + 1).padStart(2, '0'),
  }));
};

export const yearList = (count = 10) => {
  const currentYear = new Date().getFullYear();
  return [...Array(count)].map((_, index) => currentYear + index);
};

interface todayDateProps {
  y: number;
  m: number;
  d: number;
}

export const todayDate = ({ y, m, d }: todayDateProps) => {
  const today = new Date();

  const todaycurrent = new Date(y, m - 1, d);

  const differenceInTime = today.getTime() - todaycurrent.getTime();

  const RemainingDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return RemainingDays;
};

export const formatDate = (date: string) => {
  return date.slice(0, 10);
};

export const todayDateFormatted = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const sevenWeeksLaterFormatted = () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 49);

  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, '0');
  const day = String(futureDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
