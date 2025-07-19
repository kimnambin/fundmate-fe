type OptionDataItem = {
  year: number;
  result: {
    adm_cd: string;
    adm_nm: string;
    population: string;
  }[];
};

export function convertOptionRawDataToNivoPie(
  data: OptionDataItem[],
  targetYear: number,
) {
  const colorList = [
    '#5FBDFF',
    '#87D6FF',
    '#3AAEFF',
    '#1E90FF',
    '#00A3FF',
    '#008CFF',
    '#B3E5FF',
    '#4ACFFF',
    '#66CCFF',
    '#0099FF',
  ];

  const yearData = data.find((item) => item.year === targetYear);
  if (!yearData) return [];

  return yearData.result.map((item, index) => ({
    id: item.adm_nm,
    label: item.adm_nm,
    value: Number(item.population),
    color: colorList[index % colorList.length],
  }));
}
