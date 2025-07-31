// import React from "react";
// import type { Song } from "../../../../core/search/domain/models/song";
// import type { Playlist } from "../../../../core/playlist/domain/models/playlist";
// import { usePagination } from "../hooks/usePagination";
// import SongCard from "./SongCard";
// import LoadingState from "./LoadingState";
// import ErrorState from "./ErrorState";
// import Pagination from "./Pagination";
// import PageSizeSelector from "./PageSizeSelector";
// import "./SearchResults.scss";

// interface SearchResultsProps {
//   songs: Song[];
//   playlists: Playlist[];
//   loading: boolean;
//   error: string | null;
//   searchTerm: string;
//   onAddToPlaylist: (song: Song) => void;
//   onRetry?: () => void;
// }

// const SearchResults: React.FC<SearchResultsProps> = ({
//   songs,
//   playlists,
//   loading,
//   error,
//   searchTerm,
//   onAddToPlaylist,
//   onRetry,
// }) => {
//   const {
//     currentPage,
//     pageSize,
//     totalPages,
//     totalItems,
//     paginatedItems,
//     goToPage,
//     goToNextPage,
//     goToPreviousPage,
//     setPageSize,
//     hasNextPage,
//     hasPreviousPage,
//     startIndex,
//     endIndex,
//   } = usePagination({
//     items: songs,
//     initialPageSize: 10,
//   });

//   if (loading) {
//     return <LoadingState message="Buscando música..." />;
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

//   if (songs.length > 0) {
//     return (
//       <div className="search-results">
//         <div className="results-header">
//           <div className="results-info">
//             <h2>Resultados de búsqueda</h2>
//             <span className="results-count">
//               {totalItems} canción{totalItems !== 1 ? "es" : ""} encontrada
//               {totalItems !== 1 ? "s" : ""}
//             </span>
//           </div>
//           <PageSizeSelector
//             pageSize={pageSize}
//             onPageSizeChange={setPageSize}
//             totalItems={totalItems}
//           />
//         </div>

//         <div className="songs-grid">
//           {paginatedItems.map((song) => (
//             <SongCard
//               key={song.id}
//               song={song}
//               playlists={playlists}
//               onAddToPlaylist={onAddToPlaylist}
//             />
//           ))}
//         </div>

//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={goToPage}
//           onPreviousPage={goToPreviousPage}
//           onNextPage={goToNextPage}
//           hasNextPage={hasNextPage}
//           hasPreviousPage={hasPreviousPage}
//           startIndex={startIndex}
//           endIndex={endIndex}
//           totalItems={totalItems}
//         />
//       </div>
//     );
//   }

//   return null;
// };

// export default SearchResults;
