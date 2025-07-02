import axios from "axios";

export interface Project {
  id: number;
  title: string;
  thumbnailUrl: string;
  category: string;
  currentAmount: number;
  targetAmount: number;
  endDate: string;
  description: string;
}

export const getLikedProjects = async (): Promise<Project[]> => {
  const response = await axios.get("/api/mypage/liked-projects");
  return response.data;
};
