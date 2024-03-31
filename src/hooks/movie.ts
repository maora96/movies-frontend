import { useQuery } from "react-query";
import { getOne } from "../api/movie";

export const useGetSingleMovie = (id: string) => {
  return useQuery("getSingleMovie", async () => getOne(id), {
    staleTime: 5000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
