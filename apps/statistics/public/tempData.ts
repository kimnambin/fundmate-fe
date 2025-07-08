export const tempData = [
  {
    "id": "stylus",
    "label": "stylus",
    "value": 270,
    "color": "#ffaa00"
  },
  {
    "id": "erlang",
    "label": "erlang",
    "value": 434,
    "color": "#a055ff"
  },
  {
    "id": "c",
    "label": "c",
    "value": 326,
    "color": "#ff3322"
  },
  {
    "id": "scala",
    "label": "scala",
    "value": 240,
    "color": "#5533ff"
  },
  {
    "id": "php",
    "label": "php",
    "value": 151,
    "color": "#55ff33"
  },
  {
    "id": "stylus1",
    "label": "stylus1",
    "value": 270,
    "color": "#ffaa00"
  },
  {
    "id": "erlang1",
    "label": "erlang1",
    "value": 434,
    "color": "#a055ff"
  },
  {
    "id": "c1",
    "label": "c1",
    "value": 326,
    "color": "#ff3322"
  },
  {
    "id": "scala1",
    "label": "scala1",
    "value": 240,
    "color": "#5533ff"
  },
  {
    "id": "php1",
    "label": "php1",
    "value": 151,
    "color": "#55ff33"
  }
];

export const tempYearData = () => {
  const start = 2015;
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
