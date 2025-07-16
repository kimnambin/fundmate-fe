export interface ProductInfoProps {
  project: {
    image_id: number;
    title: string;
    current_price: number;
    remaining_day: number;
    support_amount: number;
    goal_amount: number;
    start_date: string;
    end_date: string;
    delivery_date: string;
    description: string;
  };
  users: {
    image_id: number;
    nickname: string;
    content: string;
  };
  options: {
    title: string;
    description: string;
    price: number;
  }[];
}
