import React from "react";
import type { Song } from "../../../../core/search/domain/models/song";
import SongCard from "./SongCard";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import "./SearchResults.scss";

interface SearchResultsProps {
  songs: Song[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onAddToPlaylist: (song: Song) => void;
  onRetry?: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  songs,
  loading,
  error,
  searchTerm,
  onAddToPlaylist,
  onRetry,
}) => {
  if (loading) {
    return <LoadingState message="Buscando música..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Error en la búsqueda"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  //   if (songs.length === 0 && searchTerm && !loading && !error) {
  //     return (
  //       <div className="no-results">
  //         <div className="no-results-icon">🔍</div>
  //         <h3>No se encontraron resultados</h3>
  //         <p>No se encontraron canciones para "{searchTerm}"</p>
  //         <p>Intenta con otros términos de búsqueda</p>
  //       </div>
  //     );
  //   }

  if (songs.length > 0) {
    return (
      <div className="search-results">
        <div className="results-header">
          <h2>Resultados de búsqueda</h2>
          <span className="results-count">
            {songs.length} canción{songs.length !== 1 ? "es" : ""} encontrada
            {songs.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="songs-grid">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onAddToPlaylist={onAddToPlaylist}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default SearchResults;
