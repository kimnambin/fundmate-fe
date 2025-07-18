type NivoDataItem = {
  id: string;
  label: string;
  value: number;
  color: string;
};

const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 50%)`;
};

const convertYearlyDataToNivo = (
  yearly: { year: number; result: { adm_nm: string; [key: string]: any }[] },
  valueKey: string,
): NivoDataItem[] => {
  return yearly.result.map((item) => ({
    id: item.adm_nm,
    label: item.adm_nm,
    value: Number(item[valueKey]),
    color: generateRandomColor(),
  }));
};

export function convertKeywordRawDataToNivoFormat(rawData: {
  house?: { year: number; result: any[] }[];
  household?: { year: number; result: any[] }[];
  people?: { year: number; result: any[] }[];
}): { type: string; data: NivoDataItem[] }[] {
  const result: { type: string; data: NivoDataItem[] }[] = [];

  const dataTypes: { key: keyof typeof rawData; valueKey: string }[] = [
    { key: 'house', valueKey: 'house_cnt' },
    { key: 'household', valueKey: 'household_cnt' },
    { key: 'people', valueKey: 'people_cnt' },
  ];

  dataTypes.forEach(({ key, valueKey }) => {
    const dataGroup = rawData[key];
    if (dataGroup && dataGroup.length > 0) {
      const latestYearData = dataGroup[dataGroup.length - 1];
      const parsed = convertYearlyDataToNivo(latestYearData, valueKey);
      result.push({ type: key, data: parsed });
    }
  });

  return result;
}

type RawYearlyData = {
  year: number;
  result: {
    adm_nm: string;
    [key: string]: string;
  }[];
};

type NivoLineData = {
  id: string;
  data: {
    x: number | string;
    y: number;
  }[];
};

export function convertAllCntDataToLineSeries(
  data: RawYearlyData[],
): Record<string, NivoLineData[]> {
  const resultMap: Record<string, Map<string, NivoLineData>> = {};

  data.forEach(({ year, result }) => {
    result.forEach((item) => {
      const city = item.adm_nm;

      Object.entries(item).forEach(([key, value]) => {
        if (key.endsWith('_cnt')) {
          const numericValue = Number(value);
          if (isNaN(numericValue)) return;
          if (!resultMap[key]) resultMap[key] = new Map();
          if (!resultMap[key].has(city)) {
            resultMap[key].set(city, { id: city, data: [] });
          }

          resultMap[key].get(city)!.data.push({ x: year, y: numericValue });
        }
      });
    });
  });

  const finalResult: Record<string, NivoLineData[]> = {};
  for (const [key, map] of Object.entries(resultMap)) {
    finalResult[key] = Array.from(map.values());
  }

  return finalResult;
}

export function convertCntDataToCumulativeLineSeries(
  data: RawYearlyData[],
): Record<string, NivoLineData[]> {
  const resultMap: Record<string, Map<string, NivoLineData>> = {};
  const cumulativeSumMap: Record<string, Map<string, number>> = {};

  const sortedData = [...data].sort((a, b) => a.year - b.year);

  sortedData.forEach(({ year, result }) => {
    result.forEach((item) => {
      const city = item.adm_nm;

      Object.entries(item).forEach(([key, value]) => {
        if (!key.endsWith('_cnt')) return;
        const numericValue = Number(value);
        if (isNaN(numericValue)) return;

        if (!resultMap[key]) {
          resultMap[key] = new Map();
          cumulativeSumMap[key] = new Map();
        }
        if (!resultMap[key].has(city)) {
          resultMap[key].set(city, { id: city, data: [] });
          cumulativeSumMap[key].set(city, 0);
        }

        const prevSum = cumulativeSumMap[key].get(city)!;
        const newSum = prevSum + numericValue;
        cumulativeSumMap[key].set(city, newSum);

        resultMap[key].get(city)!.data.push({ x: year, y: newSum });
      });
    });
  });

  const finalResult: Record<string, NivoLineData[]> = {};
  for (const [key, cityMap] of Object.entries(resultMap)) {
    finalResult[key] = Array.from(cityMap.values());
  }

  return finalResult;
}
