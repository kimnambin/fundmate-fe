export interface User {
  image_url: string;
  nickname: string;
  content: string | null;
}

export interface Option {
  title: string;
  description: string;
  price: number;
}

export interface ProductUserProps {
  id: number;
  user: User;
  options: Option[];
  selectedOption?: number;
  setSelectedOption?: (index: number) => void;
  description: string;
}
