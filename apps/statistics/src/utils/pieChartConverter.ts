type SelectedType = 'people' | 'household' | 'house';

type CommonResult = {
  adm_cd: string;
  adm_nm: string;
};

type PeopleResult = CommonResult & { population: string };
type HouseResult = CommonResult & { house_cnt: string };
type HouseholdResult = CommonResult & { household_cnt: string };

type YearlyData<T> = {
  year: number;
  result: T[];
};

type TakenData = {
  people: YearlyData<PeopleResult>[];
  household: YearlyData<HouseholdResult>[];
  house: YearlyData<HouseResult>[];
};

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
  const yearlyArray = takenData[selected] as Array<YearlyData<any>>;
  if (!yearlyArray) return [];
  console.log(yearlyArray);
  const yearData = yearlyArray.find((data) => data.year === year);

  if (!yearData) return [];

  return yearData.result.map((item: any, index: number) => {
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
