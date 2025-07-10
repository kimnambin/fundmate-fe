export type Item = {
  itemTitle: string;
  itemContent: string;
  itemPrice: string;
};

export type CreateForm = {
  title: string;
  targetAmount: string;
  startDate: string;
  endDate: string;
  deliveryDate: string;
  intro: string;
  summary: string;
  category: string;
  gender: string;
  age: string;
  items: Item[];
};
