export type CreateFundingData = {
  image_id: number;
  title: string;
  goal_amount: number;
  start_date: string;
  end_date: string;
  delivery_date: string;
  short_description: string;
  description: string;
  category_id: number;
  option_ids: number[];
  gender: number;
  age_group: number;
};

export type Option = {
  id?: number;
  title: string;
  description: string;
  price: number;
};

export type CreateOptionData = {
  title: string;
  description: string;
  price: number;
};

export interface FilterOption {
  label: string;
  id: number;
}

export interface Filter {
  title: string;
  options: FilterOption[];
}
