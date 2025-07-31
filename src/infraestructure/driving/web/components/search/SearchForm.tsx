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
    <div className="search-container">
      <form className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar canciones, artistas o álbumes..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
        />
        <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
