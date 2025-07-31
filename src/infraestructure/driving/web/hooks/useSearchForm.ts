import { useState } from "react";

interface UseSearchFormReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleRetrySearch: () => void;
}

export const useSearchForm = (
  performSearch: (term: string) => void
): UseSearchFormReturn => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm.trim());
    }
  };

  const handleRetrySearch = () => {
    if (searchTerm.trim()) {
      performSearch(searchTerm.trim());
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSubmit,
    handleRetrySearch,
  };
};
