import type { KeywordTakenData as TakenData } from '../types/Statistics.type';

type SelectedType = 'people' | 'household' | 'house';

export type ConvertedChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export function convert2024DataToChartFormat(
  takenData: TakenData,
  selected: SelectedType,
): ConvertedChartData[] {
  const year = 2023;
  const yearlyArray = takenData[selected];
  if (!yearlyArray) return [];
  const yearData = yearlyArray.find((data) => data.year === year);

  if (!yearData) return [];

  return yearData.result.map((item, index) => {
    const valueKey =
      selected === 'people'
        ? 'population'
        : selected === 'house'
          ? 'house_cnt'
          : 'household_cnt';

    return {
      id: item.adm_nm,
      label: item.adm_nm,
      value: Number(item[valueKey]),
      color: `hsl(${(200 + index * 20) % 360}, 100%, 68%)`,
    };
  });
}
