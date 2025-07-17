export interface ProductDetail {
  project: {
    image_url: string;
    title: string;
    current_price: number;
    remaining_day: number;
    goal_amount: number;
    start_date: string;
    end_date: string;
    delivery_date: string;
    description: string;
    payment_date: string;
    sponsor: number;
    likes: number;
  };
  users: {
    image_url: string | null;
    nickname: string;
    content: string | null;
  };
  options: {
    title: string;
    description: string;
    price: number;
  }[];
}
