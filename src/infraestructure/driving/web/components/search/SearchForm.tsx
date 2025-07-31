import React from "react";
import "./SearchForm.scss";

interface SearchFormProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchTerm,
  onSearchTermChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Buscar canciones, artistas o álbumes..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="search-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="search-button"
          disabled={!searchTerm.trim() || isLoading}
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
