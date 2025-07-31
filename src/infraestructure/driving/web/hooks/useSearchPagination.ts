import { usePagination } from "./usePagination";
import type { Song } from "../../../../core/search/domain/models/song";

interface UseSearchPaginationProps {
  songs: Song[];
}

export const useSearchPagination = ({ songs }: UseSearchPaginationProps) => {
  return usePagination({
    items: songs,
    initialPageSize: 10,
  });
};
