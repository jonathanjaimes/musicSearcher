import React, { useState, useEffect } from "react";
import type { Song } from "../../../../../core/search/domain/models/song";
import type { Playlist } from "../../../../../core/playlist/domain/models/playlist";
import "./PlaylistModal.scss";

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song | null;
  playlists: Playlist[];
  onCreatePlaylist: (name: string) => Promise<void>;
  onAddSongToPlaylist: (playlistId: string, song: Song) => Promise<void>;
  isLoading: boolean;
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({
  isOpen,
  onClose,
  song,
  playlists,
  onCreatePlaylist,
  onAddSongToPlaylist,
  isLoading,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowCreateForm(playlists.length === 0);
      setNewPlaylistName("");
      setSelectedPlaylistId("");
      setIsSubmitting(false);
    }
  }, [isOpen, playlists.length]);

  const handleCreatePlaylist = async (playlistName: string): Promise<void> => {
    if (!playlistName.trim()) {
      throw new Error("El nombre de la playlist no puede estar vacío");
    }

    try {
      await onCreatePlaylist(playlistName.trim());
    } catch (error) {
      console.error("Error creating playlist:", error);
      throw error;
    }
  };

  const handleAddToPlaylist = async () => {
    if (!selectedPlaylistId || !song) return;

    setIsSubmitting(true);
    try {
      await onAddSongToPlaylist(selectedPlaylistId, song);
      onClose();
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToNewPlaylist = async () => {
    if (!newPlaylistName.trim() || !song) return;

    setIsSubmitting(true);
    try {
      // Crear la playlist usando la función separada
      await handleCreatePlaylist(newPlaylistName);

      // Nota: Como onCreatePlaylist no retorna la playlist creada,
      // cerramos el modal y el hook usePlaylist se encargará de actualizar
      // la lista de playlists automáticamente

      setNewPlaylistName("");
      setShowCreateForm(false);
      onClose();
    } catch (error) {
      console.error("Error creating playlist and adding song:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !song) return null;

  return (
    <div className="playlist-modal-overlay" onClick={onClose}>
      <div className="playlist-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Agregar a lista de reproducción</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="song-preview">
            <img src={song.imageUrl} alt={song.title} className="song-image" />
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-state">
              <p>Cargando listas de reproducción...</p>
            </div>
          ) : (
            <div className="playlist-options">
              {playlists.length > 0 && !showCreateForm && (
                <div className="existing-playlists">
                  <h4>Selecciona una lista existente:</h4>
                  <div className="playlist-list">
                    {playlists.map((playlist) => (
                      <div
                        key={playlist.id}
                        className={`playlist-item ${
                          selectedPlaylistId === playlist.id ? "selected" : ""
                        }`}
                        onClick={() => setSelectedPlaylistId(playlist.id)}
                      >
                        <div className="playlist-info">
                          <span className="playlist-name">{playlist.name}</span>
                          <span className="song-count">
                            {playlist.songs.length} canción
                            {playlist.songs.length !== 1 ? "es" : ""}
                          </span>
                        </div>
                        <div className="radio-indicator">
                          {selectedPlaylistId === playlist.id && "✓"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="add-to-existing-button"
                    onClick={handleAddToPlaylist}
                    disabled={!selectedPlaylistId || isSubmitting}
                  >
                    {isSubmitting
                      ? "Agregando..."
                      : "Agregar a lista seleccionada"}
                  </button>
                </div>
              )}

              {showCreateForm ? (
                <div className="create-playlist-form">
                  <h4>Crear nueva lista de reproducción:</h4>
                  <input
                    type="text"
                    placeholder="Nombre de la lista de reproducción"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    className="playlist-name-input"
                    maxLength={50}
                  />
                  <div className="form-actions">
                    <button
                      className="create-and-add-button"
                      onClick={handleAddToNewPlaylist}
                      disabled={!newPlaylistName.trim() || isSubmitting}
                    >
                      {isSubmitting
                        ? "Creando..."
                        : "Crear lista y agregar canción"}
                    </button>
                    {playlists.length > 0 && (
                      <button
                        className="cancel-create-button"
                        onClick={() => setShowCreateForm(false)}
                        disabled={isSubmitting}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  className="show-create-form-button"
                  onClick={() => setShowCreateForm(true)}
                >
                  + Crear nueva lista de reproducción
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
