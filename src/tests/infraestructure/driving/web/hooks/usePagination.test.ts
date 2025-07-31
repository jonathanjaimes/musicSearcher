import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePagination } from '../../../../../infraestructure/driving/web/hooks/usePagination'

describe('usePagination', () => {
  const mockItems = Array.from({ length: 25 }, (_, i) => `item-${i + 1}`)

  describe('initial state', () => {
    it('should initialize with default page size of 10', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      expect(result.current.currentPage).toBe(1)
      expect(result.current.pageSize).toBe(10)
      expect(result.current.totalItems).toBe(25)
      expect(result.current.totalPages).toBe(3)
    })

    it('should initialize with custom page size', () => {
      const { result } = renderHook(() => 
        usePagination({ items: mockItems, initialPageSize: 5 })
      )

      expect(result.current.pageSize).toBe(5)
      expect(result.current.totalPages).toBe(5)
    })

    it('should calculate correct pagination info', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      expect(result.current.startIndex).toBe(0)
      expect(result.current.endIndex).toBe(10)
      expect(result.current.hasNextPage).toBe(true)
      expect(result.current.hasPreviousPage).toBe(false)
    })

    it('should return correct paginated items', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      expect(result.current.paginatedItems).toHaveLength(10)
      expect(result.current.paginatedItems[0]).toBe('item-1')
      expect(result.current.paginatedItems[9]).toBe('item-10')
    })
  })

  describe('navigation', () => {
    it('should go to next page', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      act(() => {
        result.current.goToNextPage()
      })

      expect(result.current.currentPage).toBe(2)
      expect(result.current.startIndex).toBe(10)
      expect(result.current.endIndex).toBe(20)
      expect(result.current.paginatedItems[0]).toBe('item-11')
    })

    it('should go to previous page', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      // Start at page 1, go to page 2, then back to page 1
      expect(result.current.currentPage).toBe(1) // Initial state
      
      act(() => {
        result.current.goToNextPage() // Go to page 2
      })
      expect(result.current.currentPage).toBe(2)
      
      act(() => {
        result.current.goToPreviousPage() // Go back to page 1
      })
      expect(result.current.currentPage).toBe(1)
    })

    it('should go to specific page', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      act(() => {
        result.current.goToPage(3)
      })

      expect(result.current.currentPage).toBe(3)
      expect(result.current.paginatedItems).toHaveLength(5) // Last page has 5 items
      expect(result.current.paginatedItems[0]).toBe('item-21')
    })

    it('should go to first page', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      act(() => {
        result.current.goToPage(3)
        result.current.goToFirstPage()
      })

      expect(result.current.currentPage).toBe(1)
    })

    it('should go to last page', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      act(() => {
        result.current.goToLastPage()
      })

      expect(result.current.currentPage).toBe(3)
    })
  })

  describe('boundary conditions', () => {
    it('should not go beyond last page', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      act(() => {
        result.current.goToLastPage() // Go to page 3 (last page)
      })
      expect(result.current.currentPage).toBe(3)
      
      act(() => {
        result.current.goToNextPage() // Try to go beyond last page
      })

      expect(result.current.currentPage).toBe(3) // Should stay at page 3
      expect(result.current.hasNextPage).toBe(false)
    })

    it('should not go before first page', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      act(() => {
        result.current.goToPreviousPage()
      })

      expect(result.current.currentPage).toBe(1)
      expect(result.current.hasPreviousPage).toBe(false)
    })

    it('should not go to invalid page numbers', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      act(() => {
        result.current.goToPage(0)
      })
      expect(result.current.currentPage).toBe(1)

      act(() => {
        result.current.goToPage(10)
      })
      expect(result.current.currentPage).toBe(1)
    })
  })

  describe('page size changes', () => {
    it('should update page size and recalculate pages', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      act(() => {
        result.current.setPageSize(5)
      })

      expect(result.current.pageSize).toBe(5)
      expect(result.current.totalPages).toBe(5)
      expect(result.current.paginatedItems).toHaveLength(5)
    })

    it('should adjust current page when page size increases', () => {
      const { result } = renderHook(() => usePagination({ items: mockItems }))

      act(() => {
        result.current.goToLastPage() // Go to page 3 (with pageSize=10, totalPages=3)
      })
      expect(result.current.currentPage).toBe(3)
      
      act(() => {
        result.current.setPageSize(20) // Now only 2 pages total (25 items / 20 = 2 pages)
      })

      expect(result.current.currentPage).toBe(2) // Adjusted from 3 to 2
      expect(result.current.totalPages).toBe(2)
    })
  })

  describe('empty items', () => {
    it('should handle empty items array', () => {
      const { result } = renderHook(() => usePagination({ items: [] }))

      expect(result.current.totalItems).toBe(0)
      expect(result.current.totalPages).toBe(0)
      expect(result.current.paginatedItems).toHaveLength(0)
      expect(result.current.hasNextPage).toBe(false)
      expect(result.current.hasPreviousPage).toBe(false)
    })
  })
})
