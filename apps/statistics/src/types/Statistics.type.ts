import type React from 'react';

export type DataSelectionProps = {
  people: number | string;
  household: number | string;
  house: number | string;
};

export type OptionSelectionProps = {
  age_group: string;
  gender: string;
  area: string;
};

export interface DataChoiceTableProps {
  selected: DataSelectionProps;
  setSelected: React.Dispatch<React.SetStateAction<DataSelectionProps>>;
}

export interface DataOptionChoiceProps {
  selected: OptionSelectionProps;
  setSelected: React.Dispatch<React.SetStateAction<OptionSelectionProps>>;
}

export interface AreaData {
  adm_cd: string;
  adm_nm: string;
  house_cnt?: string;
  household_cnt?: string;
  people_cnt?: string;
}

export interface YearlyData {
  year: number;
  result: AreaData[];
}

export interface RawStatisticsData {
  house: YearlyData[];
  household: YearlyData[];
  people: YearlyData[];
  selected: 'keyword' | 'option';
}

export interface PopulationData {
  adm_cd: string;
  adm_nm: string;
  population: string;
}

export interface PopulationYearlyData {
  year: number;
  result: PopulationData[];
}

export interface OptionStatisticsData {
  rawData: PopulationYearlyData[];
  selected: 'option';
}

export type NivoDataItem = {
  id: string;
  label: string;
  value: number;
  color: string;
};

export type NivoDataGroup = {
  type: 'house' | 'household' | 'people';
  data: NivoDataItem[];
}[];
