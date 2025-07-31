import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
  items: T[];
  initialPageSize?: number;
}

interface UsePaginationReturn<T> {
  // Estados
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;

  // Items paginados
  paginatedItems: T[];

  // Funciones de navegación
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;

  // Funciones de configuración
  setPageSize: (size: number) => void;

  // Información de estado
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
}

export const usePagination = <T>({
  items,
  initialPageSize = 10,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  // Calcular valores derivados
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  // Items para la página actual
  const paginatedItems = useMemo(() => {
    return items.slice(startIndex, endIndex);
  }, [items, startIndex, endIndex]);

  // Estados de navegación
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // Funciones de navegación
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Función para cambiar el tamaño de página
  const setPageSize = (size: number) => {
    setPageSizeState(size);
    // Ajustar la página actual si es necesario
    const newTotalPages = Math.ceil(totalItems / size);
    if (currentPage > newTotalPages) {
      setCurrentPage(Math.max(1, newTotalPages));
    }
  };

  return {
    // Estados
    currentPage,
    pageSize,
    totalPages,
    totalItems,

    // Items paginados
    paginatedItems,

    // Funciones de navegación
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,

    // Funciones de configuración
    setPageSize,

    // Información de estado
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
  };
};
