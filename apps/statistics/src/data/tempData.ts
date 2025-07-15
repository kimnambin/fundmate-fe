export const tempData = [
  {
    "id": "stylus",
    "label": "stylus",
    "value": 270,
    "color": "#d1edff" // 92%
  },
  {
    "id": "erlang",
    "label": "erlang",
    "value": 434,
    "color": "#b3dcf5" // 87%
  },
  {
    "id": "c",
    "label": "c",
    "value": 326,
    "color": "#96caeb" // 82%
  },
  {
    "id": "scala",
    "label": "scala",
    "value": 240,
    "color": "#78b9e1" // 77%
  },
  {
    "id": "php",
    "label": "php",
    "value": 151,
    "color": "#5aa7d7" // 72%
  }
];

export const tempYearData = () => {
  const start = 2019;
  const end = 2024;
  const years: number[] = [];

  for (let i = start; i <= end; i++) {
    years.push(i);
  }

  return years;
}

export const localeData = [
  { locale: "부산광역시", count: 1500 },
  { locale: "대구광역시", count: 3000 },
  { locale: "대전광역시", count: 400 },
  { locale: "강원도", count: 2500 },
  { locale: "광주광역시", count: 1000 },
  { locale: "경기도", count: 4000 },
  { locale: "인천광역시", count: 2200 },
  { locale: "제주특별자치도", count: 100 },
  { locale: "충청북도", count: 49 },
  { locale: "경상북도", count: 2000 },
  { locale: "전라북도", count: 3300 },
  { locale: "세종특별자치시", count: 110 },
  { locale: "충청남도", count: 10 },
  { locale: "경상남도", count: 0 },
  { locale: "전라남도", count: 250 },
  { locale: "울산광역시", count: 100 },
  { locale: "서울특별시", count: 10000 },
];
