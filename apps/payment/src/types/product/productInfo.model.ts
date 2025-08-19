export interface ProductInfoProps {
  project: {
    project_id?: number;
    image_url: string;
    title: string;
    current_price: number;
    remaining_day: number;
    support_amount: number;
    goal_amount: number;
    start_date: string;
    end_date: string;
    delivery_date: string;
    description: string;
    sponsor: number;
    likes: number;
  };
  users: {
    image_url: number;
    nickname: string;
    content: string;
  };
  options: {
    title: string;
    description: string;
    price: number;
  }[];
}
