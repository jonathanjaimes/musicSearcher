import React from "react";
import { usePlaylist } from "../hooks/usePlaylist";
import { usePlaylistNavigation } from "../hooks/usePlaylistNavigation";
import { usePlaylistForm } from "../hooks/usePlaylistForm";
import { usePlaylistDelete } from "../hooks/usePlaylistDelete";
import { useSongRemoval } from "../hooks/useSongRemoval";
import PlaylistForm from "../components/playlist/PlaylistForm";
import PlaylistGrid from "../components/playlist/PlaylistGrid";
import PlaylistDetail from "../components/playlist/PlaylistDetail";
import DeletePlaylistModal from "../components/playlist/DeletePlaylistModal";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import "./MyPlaylistPage.scss";

const MyPlaylistPage: React.FC = () => {
  // Hook principal para datos de playlists
  const {
    playlists,
    loading,
    error,
    createPlaylist,
    deletePlaylist,
    removeSongFromPlaylist,
    loadPlaylists,
  } = usePlaylist();

  // Hook para navegación entre vistas
  const { selectedPlaylist, selectPlaylist, backToList, setSelectedPlaylist } =
    usePlaylistNavigation(playlists);

  // Hook para formulario de creación
  const {
    showCreateForm,
    newPlaylistName,
    isCreating,
    openForm,
    closeForm,
    handleSubmit,
    updateName,
  } = usePlaylistForm(createPlaylist);

  // Hook para eliminación de playlists
  const {
    deletingPlaylistId,
    showDeleteModal,
    playlistToDelete,
    requestDelete,
    handleModalOverlayClick,
    confirmDelete,
    cancelDelete,
  } = usePlaylistDelete(deletePlaylist, (playlistId) => {
    // Si la playlist eliminada era la seleccionada, volver a la lista
    if (selectedPlaylist && selectedPlaylist.id === playlistId) {
      setSelectedPlaylist(null);
    }
  });

  // Hook para eliminación de canciones
  const { removingSongId, handleRemoveSong } = useSongRemoval(
    removeSongFromPlaylist,
    selectedPlaylist
  );

  // Estados de carga y error
  if (loading) {
    return (
      <div className="my-playlist-page">
        <LoadingState message="Cargando tus listas de reproducción..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-playlist-page">
        <ErrorState
          title="Error al cargar las listas"
          message={error}
          onRetry={loadPlaylists}
        />
      </div>
    );
  }

  // Vista de detalle de playlist
  if (selectedPlaylist) {
    return (
      <div className="my-playlist-page">
        <PlaylistDetail
          playlist={selectedPlaylist}
          removingSongId={removingSongId}
          onBackToList={backToList}
          onRemoveSong={handleRemoveSong}
        />
      </div>
    );
  }

  // Vista principal con lista de playlists
  return (
    <div className="my-playlist-page">
      <div className="page-header">
        <h1>Mis Listas de Reproducción</h1>
        <button className="create-playlist-button" onClick={openForm}>
          + Nueva Lista
        </button>
      </div>

      {showCreateForm && (
        <PlaylistForm
          newPlaylistName={newPlaylistName}
          isCreating={isCreating}
          onSubmit={handleSubmit}
          onNameChange={updateName}
          onCancel={closeForm}
        />
      )}

      {playlists.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h2>No tienes listas de reproducción</h2>
          <p>Crea tu primera lista para organizar tu música favorita</p>
          <button className="create-first-playlist-button" onClick={openForm}>
            Crear mi primera lista
          </button>
        </div>
      ) : (
        <PlaylistGrid
          playlists={playlists}
          deletingPlaylistId={deletingPlaylistId}
          onSelectPlaylist={selectPlaylist}
          onDeletePlaylist={requestDelete}
        />
      )}

      {showDeleteModal && playlistToDelete && (
        <DeletePlaylistModal
          playlist={playlistToDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          onOverlayClick={handleModalOverlayClick}
        />
      )}
    </div>
  );
};

export default MyPlaylistPage;
