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
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setSelectedPlaylistId("");
      setNewPlaylistName("");
      setShowCreateForm(false);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen || !song) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToExistingPlaylist = async () => {
    if (!selectedPlaylistId || !song) return;

    try {
      setError("");
      await onAddSongToPlaylist(selectedPlaylistId, song);
      onClose();
    } catch (err) {
      setError("Error al agregar la canción a la playlist");
    }
  };

  const handleCreateAndAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim() || !song) return;

    try {
      setError("");
      await onCreatePlaylist(newPlaylistName.trim());
      onClose();
    } catch (err) {
      setError("Error al crear la playlist");
    }
  };

  const songAlreadyInPlaylist = (playlist: Playlist): boolean => {
    return playlist.songs?.some((s) => s.id === song.id) || false;
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Agregar a una lista</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="song-preview">
          <img src={song.imageUrl} alt={song.title} className="song-image" />
          <div className="song-info">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-body">
          {!showCreateForm ? (
            <>
              <div className="playlists-section">
                <h3>Seleccionar lista existente:</h3>
                <div className="playlists-list">
                  {playlists.length === 0 ? (
                    <p className="no-playlists">
                      No tienes listas de reproducción aún
                    </p>
                  ) : (
                    playlists.map((playlist) => {
                      const alreadyAdded = songAlreadyInPlaylist(playlist);
                      return (
                        <div
                          key={playlist.id}
                          className={`playlist-item ${
                            selectedPlaylistId === playlist.id ? "selected" : ""
                          } ${alreadyAdded ? "disabled" : ""}`}
                          onClick={() => {
                            if (!alreadyAdded) {
                              setSelectedPlaylistId(playlist.id);
                            }
                          }}
                        >
                          <span className="playlist-name">{playlist.name}</span>
                          <span className="song-count">
                            {playlist.songs?.length || 0} canciones
                          </span>
                          {alreadyAdded && (
                            <span className="already-added">Ya agregada</span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="add-button"
                  onClick={handleAddToExistingPlaylist}
                  disabled={!selectedPlaylistId || isLoading}
                >
                  {isLoading ? "Agregando..." : "Agregar a lista"}
                </button>
                <button
                  className="create-new-button"
                  onClick={() => setShowCreateForm(true)}
                  disabled={isLoading}
                >
                  Crear nueva lista
                </button>
              </div>
            </>
          ) : (
            <div className="create-playlist-section">
              <h3>Crear nueva lista:</h3>
              <form onSubmit={handleCreateAndAdd}>
                <input
                  type="text"
                  placeholder="Nombre de la nueva lista"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  className="playlist-name-input"
                  maxLength={50}
                  autoFocus
                />
                <div className="form-actions">
                  <button
                    type="submit"
                    className="create-button"
                    disabled={!newPlaylistName.trim() || isLoading}
                  >
                    {isLoading ? "Creando..." : "Crear y agregar"}
                  </button>
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => setShowCreateForm(false)}
                    disabled={isLoading}
                  >
                    Volver
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
