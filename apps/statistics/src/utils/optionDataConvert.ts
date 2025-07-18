type NivoLineData = {
  id: string;
  data: { x: number; y: number }[];
};

type RegionalStatItem = {
  adm_cd: string;
  adm_nm: string;
  [key: string]: string; // 예: population, house_cnt, ...
};

type YearlyStat = {
  year: number;
  result: RegionalStatItem[];
};

export function convertOptionRawDataToLineChart(
  rawData: YearlyStat[],
): Record<string, NivoLineData[]> {
  const resultMap: Record<string, Map<string, NivoLineData>> = {};

  const sorted = [...rawData].sort((a, b) => a.year - b.year);

  sorted.forEach(({ year, result }) => {
    result.forEach((item) => {
      const region = item.adm_nm;

      Object.entries(item).forEach(([key, value]) => {
        if (!key.endsWith('_cnt') && key !== 'population') return;

        const num = Number(value);
        if (isNaN(num)) return;

        // 초기화
        if (!resultMap[key]) resultMap[key] = new Map();
        if (!resultMap[key].has(region)) {
          resultMap[key].set(region, { id: region, data: [] });
        }

        resultMap[key].get(region)!.data.push({ x: year, y: num });
      });
    });
  });

  const final: Record<string, NivoLineData[]> = {};
  for (const [key, regionMap] of Object.entries(resultMap)) {
    final[key] = Array.from(regionMap.values());
  }

  return final;
}

export function convertOptionRawDataToCumulativeLineChart(
  rawData: YearlyStat[],
): Record<string, NivoLineData[]> {
  const resultMap: Record<string, Map<string, NivoLineData>> = {};
  const cumulativeSums: Record<string, Record<string, number>> = {}; // [key][adm_nm] = 누적합

  const sorted = [...rawData].sort((a, b) => a.year - b.year);

  sorted.forEach(({ year, result }) => {
    result.forEach((item) => {
      const region = item.adm_nm;

      Object.entries(item).forEach(([key, value]) => {
        if (!key.endsWith('_cnt') && key !== 'population') return;

        const num = Number(value);
        if (isNaN(num)) return;

        // 초기화
        if (!resultMap[key]) resultMap[key] = new Map();
        if (!resultMap[key].has(region)) {
          resultMap[key].set(region, { id: region, data: [] });
        }
        if (!cumulativeSums[key]) cumulativeSums[key] = {};
        if (!cumulativeSums[key][region]) cumulativeSums[key][region] = 0;

        // 누적합 계산
        cumulativeSums[key][region] += num;

        resultMap[key]
          .get(region)!
          .data.push({ x: year, y: cumulativeSums[key][region] });
      });
    });
  });

  const final: Record<string, NivoLineData[]> = {};
  for (const [key, regionMap] of Object.entries(resultMap)) {
    final[key] = Array.from(regionMap.values());
  }

  return final;
}
