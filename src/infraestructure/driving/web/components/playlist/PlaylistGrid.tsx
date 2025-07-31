// import React from "react";
// import type { Playlist } from "../../../../../core/playlist/domain/models/playlist";
// import "./PlaylistGrid.scss";

// interface PlaylistGridProps {
//   playlists: Playlist[];
//   deletingPlaylistId: string | null;
//   onSelectPlaylist: (playlist: Playlist) => void;
//   onDeletePlaylist: (e: React.MouseEvent, playlist: Playlist) => void;
// }

// const PlaylistGrid: React.FC<PlaylistGridProps> = ({
//   playlists,
//   deletingPlaylistId,
//   onSelectPlaylist,
//   onDeletePlaylist,
// }) => {
//   return (
//     <div className="playlists-grid">
//       {playlists.map((playlist) => (
//         <div
//           key={playlist.id}
//           className="playlist-card"
//           onClick={() => onSelectPlaylist(playlist)}
//         >
//           <div className="playlist-cover">
//             {playlist.songs && playlist.songs.length > 0 ? (
//               <div className="cover-grid">
//                 {playlist.songs.slice(0, 4).map((song, index) => (
//                   <img
//                     key={index}
//                     src={song.imageUrl}
//                     alt=""
//                     className="cover-image"
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="empty-cover">
//                 <span>🎵</span>
//               </div>
//             )}
//           </div>
//           <div className="playlist-info">
//             <h3 className="playlist-name">{playlist.name}</h3>
//             <p className="playlist-count">
//               {(playlist.songs || []).length} canción
//               {(playlist.songs || []).length !== 1 ? "es" : ""}
//             </p>
//           </div>
//           <button
//             className={`delete-button ${
//               deletingPlaylistId === playlist.id ? "deleting" : ""
//             }`}
//             onClick={(e) => onDeletePlaylist(e, playlist)}
//             title="Eliminar lista"
//             disabled={deletingPlaylistId === playlist.id}
//           >
//             {deletingPlaylistId === playlist.id ? "⏳" : "×"}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PlaylistGrid;
