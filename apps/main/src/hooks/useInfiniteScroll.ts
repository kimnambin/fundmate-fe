import { axiosInstance } from "@repo/ui/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";

type useInfinitePostQueryProps = {
  category: string;
  url: string;
}

export const useInfinitePostQuery = ({ category, url }: useInfinitePostQueryProps) => {
  return useInfiniteQuery({
    queryKey: [category],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosInstance.get(`${url}?page=${pageParam}`);
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: 1
  })
}
