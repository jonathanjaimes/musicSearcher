import { useState } from "react";
import type { Playlist } from "../../../../core/playlist/domain/models/playlist";

export const usePlaylistDelete = (
  onDeletePlaylist: (id: string) => Promise<void>,
  onPlaylistDeleted?: (playlistId: string) => void
) => {
  const [deletingPlaylistId, setDeletingPlaylistId] = useState<string | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState<Playlist | null>(
    null
  );

  const requestDelete = (e: React.MouseEvent, playlist: Playlist) => {
    e.stopPropagation(); // Evitar que se abra la playlist al hacer clic en eliminar
    setPlaylistToDelete(playlist);
    setShowDeleteModal(true);
  };

  const handleModalOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      cancelDelete();
    }
  };

  const confirmDelete = async () => {
    if (!playlistToDelete) return;

    setDeletingPlaylistId(playlistToDelete.id);
    setShowDeleteModal(false);

    try {
      await onDeletePlaylist(playlistToDelete.id);
      onPlaylistDeleted?.(playlistToDelete.id);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    } finally {
      setDeletingPlaylistId(null);
      setPlaylistToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPlaylistToDelete(null);
  };

  return {
    deletingPlaylistId,
    showDeleteModal,
    playlistToDelete,
    requestDelete,
    handleModalOverlayClick,
    confirmDelete,
    cancelDelete,
  };
};
