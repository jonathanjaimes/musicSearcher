// import React from "react";
// import type { Song } from "../../../../../core/search/domain/models/song";
// import SongCard from "./SongCard";
// import PageSizeSelector from "./PageSizeSelector";
// import Pagination from "./Pagination";
// import LoadingState from "../LoadingState";
// import ErrorState from "../ErrorState";
// import type { Playlist } from "../../../../../core/playlist/domain/models/playlist";
// import "./SearchResults.scss";

// interface SearchResultsProps {
//   songs: Song[];
//   loading: boolean;
//   error: string | null;
//   searchTerm: string;
//   playlists: Playlist[];
//   onAddToPlaylist: (song: Song) => void;
//   onRetry: () => void;
//   // Paginación
//   paginatedSongs: Song[];
//   currentPage: number;
//   totalPages: number;
//   pageSize: number;
//   totalItems: number;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
//   startIndex: number;
//   endIndex: number;
//   onPageChange: (page: number) => void;
//   onNextPage: () => void;
//   onPreviousPage: () => void;
//   onFirstPage: () => void;
//   onLastPage: () => void;
//   onPageSizeChange: (size: number) => void;
// }

// const SearchResults: React.FC<SearchResultsProps> = ({
//   songs,
//   loading,
//   error,
//   searchTerm,
//   playlists,
//   onAddToPlaylist,
//   onRetry,
//   paginatedSongs,
//   currentPage,
//   totalPages,
//   pageSize,
//   totalItems,
//   hasNextPage,
//   hasPreviousPage,
//   startIndex,
//   endIndex,
//   onPageChange,
//   onNextPage,
//   onPreviousPage,
//   onFirstPage,
//   onLastPage,
//   onPageSizeChange,
// }) => {
//   if (loading) {
//     return <LoadingState message="Buscando canciones..." />;
//   }

//   if (error) {
//     return (
//       <ErrorState
//         title="Error en la búsqueda"
//         message={error}
//         onRetry={onRetry}
//       />
//     );
//   }

//   if (!searchTerm) {
//     return null;
//   }

//   if (songs.length === 0) {
//     return (
//       <div className="no-results">
//         <h3>No se encontraron resultados</h3>
//         <p>Intenta con otros términos de búsqueda</p>
//       </div>
//     );
//   }

//   return (
//     <div className="search-results">
//       <div className="results-header">
//         <div className="results-info">
//           <h2>Resultados para "{searchTerm}"</h2>
//           <p>{totalItems} canciones encontradas</p>
//         </div>
//         <PageSizeSelector
//           pageSize={pageSize}
//           onPageSizeChange={onPageSizeChange}
//           totalItems={totalItems}
//         />
//       </div>

//       <div className="songs-grid">
//         {paginatedSongs.map((song) => (
//           <SongCard
//             key={song.id}
//             song={song}
//             playlists={playlists}
//             onAddToPlaylist={onAddToPlaylist}
//           />
//         ))}
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalItems}
//         hasNextPage={hasNextPage}
//         hasPreviousPage={hasPreviousPage}
//         startIndex={startIndex}
//         endIndex={endIndex}
//         totalItems={totalItems}
//         onPageChange={onPageChange}
//         onNextPage={onNextPage}
//         onPreviousPage={onPreviousPage}
//         onFirstPage={onFirstPage}
//         onLastPage={onLastPage}
//       />
//     </div>
//   );
// };

// export default SearchResults;
