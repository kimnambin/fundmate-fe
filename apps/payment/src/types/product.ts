export interface ProductDetail {
  project: {
    image_id: number;
    title: string;
    current_price: number;
    remaining_day: number;
    goal_amount: number;
    start_date: string;
    end_date: string;
    delivery_date: string;
    description: string;
  };
  users: {
    image_id: number | null;
    nickname: string;
    content: string | null;
  };
  options: {
    title: string;
    description: string;
    price: number;
  }[];
}
