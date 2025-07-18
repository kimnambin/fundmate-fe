export const tempResult = [
  {
    adm_cd: '11',
    adm_nm: '서울특별시',
    population: '9417469',
  },
  {
    adm_cd: '21',
    adm_nm: '부산광역시',
    population: '3295760',
  },
  {
    adm_cd: '22',
    adm_nm: '대구광역시',
    population: '2388649',
  },
  {
    adm_cd: '23',
    adm_nm: '인천광역시',
    population: '2989125',
  },
  {
    adm_cd: '24',
    adm_nm: '광주광역시',
    population: '1468972',
  },
  {
    adm_cd: '25',
    adm_nm: '대전광역시',
    population: '1473662',
  },
  {
    adm_cd: '26',
    adm_nm: '울산광역시',
    population: '1110516',
  },
  {
    adm_cd: '29',
    adm_nm: '세종특별자치시',
    population: '382589',
  },
  {
    adm_cd: '31',
    adm_nm: '경기도',
    population: '13717827',
  },
  {
    adm_cd: '32',
    adm_nm: '강원특별자치도',
    population: '1528037',
  },
  {
    adm_cd: '33',
    adm_nm: '충청북도',
    population: '1624993',
  },
  {
    adm_cd: '34',
    adm_nm: '충청남도',
    population: '2193214',
  },
  {
    adm_cd: '35',
    adm_nm: '전북특별자치도',
    population: '1774248',
  },
  {
    adm_cd: '36',
    adm_nm: '전라남도',
    population: '1771431',
  },
  {
    adm_cd: '37',
    adm_nm: '경상북도',
    population: '2598576',
  },
  {
    adm_cd: '38',
    adm_nm: '경상남도',
    population: '3280829',
  },
  {
    adm_cd: '39',
    adm_nm: '제주특별자치도',
    population: '676375',
  },
];

const tempYear = ['2019', '2020', '2021', '2022', '2023'];

export const tempData = tempYear.map((year) => {
  const data = {
    year: year,
    result: tempResult,
  };

  return data;
});
