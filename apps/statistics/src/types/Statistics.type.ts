import type React from "react";

export type OptionSelectionProps = {
  age: string;
  gender: string;
  region: string;
}

export interface DataChoiceTableProps {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

export interface DataOptionChoiceProps {
  selected: OptionSelectionProps;
  setSelected: React.Dispatch<React.SetStateAction<OptionSelectionProps>>
}
