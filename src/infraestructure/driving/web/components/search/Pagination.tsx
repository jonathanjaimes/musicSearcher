// import React from "react";
// import "./Pagination.scss";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   onPreviousPage: () => void;
//   onNextPage: () => void;
//   onFirstPage: () => void;
//   onLastPage: () => void;
//   hasNextPage: boolean;
//   hasPreviousPage: boolean;
//   startIndex: number;
//   endIndex: number;
//   totalItems: number;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   onPreviousPage,
//   onNextPage,
//   onFirstPage,
//   onLastPage,
//   hasNextPage,
//   hasPreviousPage,
//   startIndex,
//   endIndex,
//   totalItems,
// }) => {
//   // Generar números de página para mostrar
//   const getPageNumbers = () => {
//     const pages: (number | string)[] = [];
//     const maxVisiblePages = 5;

//     if (totalPages <= maxVisiblePages) {
//       // Si hay pocas páginas, mostrar todas
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Lógica para mostrar páginas con ellipsis
//       if (currentPage <= 3) {
//         // Inicio: 1, 2, 3, 4, ..., last
//         for (let i = 1; i <= 4; i++) {
//           pages.push(i);
//         }
//         pages.push("...");
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         // Final: 1, ..., last-3, last-2, last-1, last
//         pages.push(1);
//         pages.push("...");
//         for (let i = totalPages - 3; i <= totalPages; i++) {
//           pages.push(i);
//         }
//       } else {
//         // Medio: 1, ..., current-1, current, current+1, ..., last
//         pages.push(1);
//         pages.push("...");
//         pages.push(currentPage - 1);
//         pages.push(currentPage);
//         pages.push(currentPage + 1);
//         pages.push("...");
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   if (totalPages <= 1) {
//     return null;
//   }

//   return (
//     <div className="pagination">
//       <div className="pagination-info">
//         <span>
//           Mostrando {startIndex + 1}-{endIndex} de {totalItems} resultados
//         </span>
//       </div>

//       <div className="pagination-controls">
//         <button
//           className="pagination-button"
//           onClick={onPreviousPage}
//           disabled={!hasPreviousPage}
//           title="Página anterior"
//         >
//           ← Anterior
//         </button>

//         <div className="page-numbers">
//           {getPageNumbers().map((page, index) => (
//             <React.Fragment key={index}>
//               {typeof page === "number" ? (
//                 <button
//                   className={`page-number ${
//                     page === currentPage ? "active" : ""
//                   }`}
//                   onClick={() => onPageChange(page)}
//                 >
//                   {page}
//                 </button>
//               ) : (
//                 <span className="ellipsis">{page}</span>
//               )}
//             </React.Fragment>
//           ))}
//         </div>

//         <button
//           className="pagination-button"
//           onClick={onNextPage}
//           disabled={!hasNextPage}
//           title="Página siguiente"
//         >
//           Siguiente →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
