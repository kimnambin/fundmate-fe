import type React from 'react';

export type DataSelectionProps = {
  people: number | string;
  household: number | string;
  house: number | string;
};

export type OptionSelectionProps = {
  ageGroup: string;
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
