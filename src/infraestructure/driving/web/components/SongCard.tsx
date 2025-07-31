import React from "react";
import type { Song } from "../../../../core/search/domain/models/song";
import type { Playlist } from "../../../../core/playlist/domain/models/playlist";
import { useSongInPlaylist } from "../hooks/useSongInPlaylist";
import "./SongCard.scss";

interface SongCardProps {
  song: Song;
  playlists: Playlist[];
  onAddToPlaylist: (song: Song) => void;
}

const SongCard: React.FC<SongCardProps> = ({
  song,
  playlists,
  onAddToPlaylist,
}) => {
  const { isInPlaylist, playlistName } = useSongInPlaylist(song, playlists);

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
        {isInPlaylist ? (
          <div className="already-in-playlist">
            <div className="playlist-text">
              Ya está en: <br /> <strong>{playlistName}</strong>
            </div>
          </div>
        ) : (
          <button
            className="add-to-playlist-button"
            onClick={() => onAddToPlaylist(song)}
            title="Agregar a una lista"
          >
            <span className="button-icon">+</span>
            Agregar a una lista
          </button>
        )}
      </div>
    </div>
  );
};

export default SongCard;
