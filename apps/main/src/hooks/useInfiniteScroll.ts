import { axiosInstance } from "@repo/ui/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";

type useInfinitePostQueryProps = {
  category: string;
  url: string;
}

interface ApiResponse {
  data: string[],
  nextCursor: number | null;
}

export const useInfinitePostQuery = ({ category, url }: useInfinitePostQueryProps) => {
  return useInfiniteQuery({
    queryKey: [category],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get(`${url}?page=${pageParam}`);
      return res.data;
    },
    getNextPageParam: (lastPage: ApiResponse) => lastPage.nextCursor ?? undefined,
    initialPageParam: 1
  })
}
