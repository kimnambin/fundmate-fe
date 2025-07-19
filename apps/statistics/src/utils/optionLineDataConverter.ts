type OptionDataItem = {
  year: number;
  result: {
    adm_cd: string;
    adm_nm: string;
    population: string;
  }[];
};

interface DataArrayProps {
  id: string;
  data: { x: string; y: number }[];
}

export function convertOptionRawDataToLineChart(
  data: OptionDataItem[],
): DataArrayProps[] {
  const regionMap = new Map<string, DataArrayProps>();

  data.forEach(({ year, result }) => {
    result.forEach(({ adm_nm, population }) => {
      const key = String(adm_nm); // string으로 변환
      if (!regionMap.has(key)) {
        regionMap.set(key, { id: key, data: [] });
      }
      regionMap.get(key)!.data.push({
        x: String(year),
        y: Number(population),
      });
    });
  });

  return Array.from(regionMap.values());
}
