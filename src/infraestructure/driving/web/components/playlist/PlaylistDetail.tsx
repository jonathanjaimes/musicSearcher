import React from "react";
import type { Playlist } from "../../../../../core/playlist/domain/models/playlist";
import LoadingModal from "./../LoadingModal";
import "./PlaylistDetail.scss";

interface PlaylistDetailProps {
  playlist: Playlist;
  removingSongId: string | null;
  onBackToList: () => void;
  onRemoveSong: (songId: string) => void;
}

const PlaylistDetail: React.FC<PlaylistDetailProps> = ({
  playlist,
  removingSongId,
  onBackToList,
  onRemoveSong,
}) => {
  return (
    <>
      <div className="playlist-detail">
        <div className="playlist-header">
          <button className="back-button" onClick={onBackToList}>
            ← Volver a mis listas
          </button>
          <div className="playlist-info">
            <h1>{playlist.name}</h1>
            <p className="song-count">
              {(playlist.songs || []).length} canción
              {(playlist.songs || []).length !== 1 ? "es" : ""}
            </p>
          </div>
        </div>

        {!playlist.songs || playlist.songs.length === 0 ? (
          <div className="empty-playlist">
            <h3>Esta lista está vacía</h3>
            <p>Agrega canciones desde la página de búsqueda</p>
          </div>
        ) : (
          <div className="songs-list">
            {playlist.songs.map((song, index) => (
              <div key={song.id} className="song-item">
                <div className="song-number">{index + 1}</div>
                <div className="song-info">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="song-image"
                  />
                  <div className="song-details">
                    <h3 className="song-title">{song.title}</h3>
                    <p className="song-artist">{song.artist}</p>
                    <p className="song-album">{song.album}</p>
                  </div>
                </div>
                <button
                  className={`remove-button ${
                    removingSongId === song.id ? "removing" : ""
                  }`}
                  onClick={() => onRemoveSong(song.id)}
                  title="Eliminar de la lista"
                  disabled={removingSongId === song.id}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <LoadingModal
        isOpen={removingSongId !== null}
        message="Eliminando canción de la lista..."
      />
    </>
  );
};

export default PlaylistDetail;
