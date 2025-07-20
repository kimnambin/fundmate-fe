// 타입 정의
type SelectedType = 'people' | 'household' | 'house';
type ValueType = 'population' | 'house_cnt' | 'household_cnt';

type CommonResult = {
  adm_cd: string;
  adm_nm: string;
};

type PeopleResult = CommonResult & {
  population: string;
};

type HouseResult = CommonResult & {
  house_cnt: string;
};

type HouseholdResult = CommonResult & {
  household_cnt: string;
};

type YearlyData<T> = {
  year: number;
  result: T[];
};

type TakenData = {
  people?: YearlyData<PeopleResult>[];
  household?: YearlyData<HouseholdResult>[];
  house?: YearlyData<HouseResult>[];
};

type LineChartDataPoint = {
  x: number; // year
  y: number; // value
};

type ConvertedLineChartData = {
  id: string; // region name
  data: LineChartDataPoint[];
};

/**
 * 가로축: 연도(x), 세로축: 값(y), 선별 색상: 지역명(id)
 */
export function convertOptionRawDataToRegionLineChart(
  takenData: TakenData,
  selected: SelectedType,
): ConvertedLineChartData[] {
  const dataList = takenData[selected];
  if (!dataList || dataList.length === 0) return [];

  const regionMap = new Map<string, ConvertedLineChartData>();

  for (const yearData of dataList) {
    for (const item of yearData.result) {
      const regionName = item.adm_nm;
      let value: number;

      // valueKey 타입별로 안전하게 접근
      if (selected === 'people') {
        value = Number((item as PeopleResult).population);
      } else if (selected === 'house') {
        value = Number((item as HouseResult).house_cnt);
      } else {
        value = Number((item as HouseholdResult).household_cnt);
      }

      if (!regionMap.has(regionName)) {
        regionMap.set(regionName, { id: regionName, data: [] });
      }

      regionMap.get(regionName)!.data.push({
        x: yearData.year,
        y: value,
      });
    }
  }

  return Array.from(regionMap.values());
}

interface YearGrowth {
  year: number;
  growth: number;
}

interface GrowthRegion {
  adm_cd: string;
  adm_nm: string;
  yearGrowth: YearGrowth[];
}

interface NivoLineData {
  id: string;
  data: {
    x: number; // 연도
    y: number; // 증가량
  }[];
}

export function calculateGrowthNivoLineData(
  takenData: TakenData,
  selected: 'people' | 'house' | 'household',
): NivoLineData[] {
  let valueKey: ValueType;
  let dataByYear: YearlyData<any>[] | undefined;

  switch (selected) {
    case 'people':
      valueKey = 'population';
      dataByYear = takenData.people;
      break;
    case 'house':
      valueKey = 'house_cnt';
      dataByYear = takenData.house;
      break;
    case 'household':
      valueKey = 'household_cnt';
      dataByYear = takenData.household;
      break;
    default:
      return [];
  }

  if (!dataByYear || dataByYear.length === 0) return [];

  const baseRegions = dataByYear[0].result;

  const growthByRegion: GrowthRegion[] = baseRegions.map((region) => ({
    adm_cd: region.adm_cd,
    adm_nm: region.adm_nm,
    yearGrowth: [],
  }));

  for (let i = 1; i < dataByYear.length; i++) {
    const prevYearData = dataByYear[i - 1].result;
    const currYearData = dataByYear[i].result;
    const currentYear = dataByYear[i].year;

    growthByRegion.forEach((regionGrowth) => {
      const prevRegion = prevYearData.find(
        (r: any) => r.adm_cd === regionGrowth.adm_cd,
      );
      const currRegion = currYearData.find(
        (r: any) => r.adm_cd === regionGrowth.adm_cd,
      );

      if (prevRegion && currRegion) {
        const prevValue = Number(prevRegion[valueKey]);
        const currValue = Number(currRegion[valueKey]);
        const growth = currValue - prevValue;
        regionGrowth.yearGrowth.push({ year: currentYear, growth });
      }
    });
  }

  return growthByRegion.map((region) => ({
    id: region.adm_nm,
    data: region.yearGrowth.map((yg) => ({
      x: yg.year,
      y: yg.growth,
    })),
  }));
}
