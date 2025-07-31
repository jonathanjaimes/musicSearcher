import React from "react";
import { useSearch } from "../hooks/useSearch";
import { usePlaylist } from "../hooks/usePlaylist";
import { useSearchForm } from "../hooks/useSearchForm";
import { usePlaylistModal } from "../hooks/usePlaylistModal";
import { usePlaylistActions } from "../hooks/usePlaylistActions";
import SearchForm from "../components/search/SearchForm";
import SearchResults from "../components/search/SearchResults";
import PlaylistModal from "../components/playlist/PlaylistModal";
import "./SearchPage.scss";

const SearchPage: React.FC = () => {
  const { songs, performSearch, loading, error } = useSearch();
  const {
    playlists,
    loading: playlistLoading,
    createPlaylist,
    addSongToPlaylist,
  } = usePlaylist();
  const { searchTerm, setSearchTerm, handleSubmit, handleRetrySearch } =
    useSearchForm(performSearch);
  const { isModalOpen, selectedSong, openModal, closeModal } =
    usePlaylistModal();
  const { handleCreatePlaylist, handleAddSongToPlaylist } = usePlaylistActions(
    createPlaylist,
    addSongToPlaylist
  );

  return (
    <div className="search-page">
      <SearchForm
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSubmit={handleSubmit}
        isLoading={loading}
      />

      <SearchResults
        songs={songs}
        playlists={playlists}
        loading={loading}
        error={error}
        onAddToPlaylist={openModal}
        onRetry={handleRetrySearch}
      />

      <PlaylistModal
        isOpen={isModalOpen}
        onClose={closeModal}
        song={selectedSong}
        playlists={playlists}
        onCreatePlaylist={handleCreatePlaylist}
        onAddSongToPlaylist={handleAddSongToPlaylist}
        isLoading={playlistLoading}
      />
    </div>
  );
};

export default SearchPage;
