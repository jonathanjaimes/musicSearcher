interface UseSearchActionsReturn {
  handleSearch: (searchTerm: string) => void;
  handleRetrySearch: (
    searchTerm: string,
    performSearch: (term: string) => void
  ) => void;
}

export const useSearchActions = (
  performSearch: (term: string) => void
): UseSearchActionsReturn => {
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      performSearch(searchTerm.trim());
    }
  };

  const handleRetrySearch = (
    searchTerm: string,
    performSearchFn: (term: string) => void
  ) => {
    if (searchTerm.trim()) {
      performSearchFn(searchTerm.trim());
    }
  };

  return {
    handleSearch,
    handleRetrySearch,
  };
};
