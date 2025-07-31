// import React from "react";
// import type { Song } from "../../../../../core/search/domain/models/song";
// import type { Playlist } from "../../../../../core/playlist/domain/models/playlist";
// import { useSongInPlaylist } from "../../hooks/useSongInPlaylist";
// import "./SongCard.scss";

// interface SongCardProps {
//   song: Song;
//   playlists: Playlist[];
//   onAddToPlaylist: (song: Song) => void;
// }

// const SongCard: React.FC<SongCardProps> = ({
//   song,
//   playlists,
//   onAddToPlaylist,
// }) => {
//   const { isInPlaylist, playlistName } = useSongInPlaylist(song, playlists);

//   return (
//     <div className="song-card">
//       <img src={song.imageUrl} alt={song.title} className="song-image" />
//       <div className="song-info">
//         <h3 className="song-title">{song.title}</h3>
//         <p className="song-artist">{song.artist}</p>
//         <p className="song-album">{song.album}</p>
//       </div>
//       <div className="song-actions">
//         {isInPlaylist ? (
//           <div className="already-in-playlist">
//             <span className="check-icon">✓</span>
//             Ya está en: <strong>{playlistName}</strong>
//           </div>
//         ) : (
//           <button
//             className="add-to-playlist-btn"
//             onClick={() => onAddToPlaylist(song)}
//             title="Agregar a una lista de reproducción"
//           >
//             + Agregar a una lista
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SongCard;
