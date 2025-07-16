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
