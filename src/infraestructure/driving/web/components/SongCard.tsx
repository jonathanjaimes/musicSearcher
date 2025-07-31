import React from "react";
import type { Song } from "../../../../core/search/domain/models/song";
import "./SongCard.scss";

interface SongCardProps {
  song: Song;
  onAddToPlaylist: (song: Song) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onAddToPlaylist }) => {
  return (
    <div className="song-card">
      <img
        src={song.imageUrl}
        alt={`Portada de ${song.title}`}
        className="song-image"
      />
      <div className="song-info">
        <h2 className="song-title">{song.title}</h2>
        <p className="song-artist">{song.artist}</p>
        <p className="song-album">{song.album}</p>
      </div>
      <div className="song-actions">
        <button
          className="add-to-playlist-button"
          onClick={() => onAddToPlaylist(song)}
          title="Agregar a una lista"
        >
          <span className="button-icon">+</span>
          Agregar a una lista
        </button>
      </div>
    </div>
  );
};

export default SongCard;
