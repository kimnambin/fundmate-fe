export interface CardProps {
  id?: number;
  isLoading?: boolean;
  number?: string;
  imageUrl?: string | number;
  title?: string;
  description?: string;
  progress?: number;
}
