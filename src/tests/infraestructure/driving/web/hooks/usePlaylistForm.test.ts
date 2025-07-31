import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePlaylistForm } from '../../../../../infraestructure/driving/web/hooks/usePlaylistForm'
import { mockConsoleError } from '../../../../utils/test-utils'

describe('usePlaylistForm', () => {
  const mockOnCreatePlaylist = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    expect(result.current.showCreateForm).toBe(false)
    expect(result.current.newPlaylistName).toBe('')
    expect(result.current.isCreating).toBe(false)
  })

  it('should open form when openForm is called', () => {
    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    act(() => {
      result.current.openForm()
    })

    expect(result.current.showCreateForm).toBe(true)
  })

  it('should close form and reset name when closeForm is called', () => {
    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    act(() => {
      result.current.openForm()
      result.current.updateName('Test Playlist')
      result.current.closeForm()
    })

    expect(result.current.showCreateForm).toBe(false)
    expect(result.current.newPlaylistName).toBe('')
  })

  it('should update playlist name when updateName is called', () => {
    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    act(() => {
      result.current.updateName('My New Playlist')
    })

    expect(result.current.newPlaylistName).toBe('My New Playlist')
  })

  it('should handle form submission successfully', async () => {
    mockOnCreatePlaylist.mockResolvedValue(undefined)
    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    act(() => {
      result.current.updateName('Test Playlist')
    })

    const mockEvent = {
      preventDefault: vi.fn()
    } as any

    await act(async () => {
      await result.current.handleSubmit(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(mockOnCreatePlaylist).toHaveBeenCalledWith('Test Playlist')
    expect(result.current.showCreateForm).toBe(false)
    expect(result.current.newPlaylistName).toBe('')
    expect(result.current.isCreating).toBe(false)
  })

  it('should trim playlist name before creating', async () => {
    mockOnCreatePlaylist.mockResolvedValue(undefined)
    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    act(() => {
      result.current.updateName('  Test Playlist  ')
    })

    const mockEvent = {
      preventDefault: vi.fn()
    } as any

    await act(async () => {
      await result.current.handleSubmit(mockEvent)
    })

    expect(mockOnCreatePlaylist).toHaveBeenCalledWith('Test Playlist')
  })

  it('should not create playlist with empty name', async () => {
    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    const mockEvent = {
      preventDefault: vi.fn()
    } as any

    await act(async () => {
      await result.current.handleSubmit(mockEvent)
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(mockOnCreatePlaylist).not.toHaveBeenCalled()
  })

  it('should not create playlist with whitespace-only name', async () => {
    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    act(() => {
      result.current.updateName('   ')
    })

    const mockEvent = {
      preventDefault: vi.fn()
    } as any

    await act(async () => {
      await result.current.handleSubmit(mockEvent)
    })

    expect(mockOnCreatePlaylist).not.toHaveBeenCalled()
  })

  it('should set isCreating to true during playlist creation', async () => {
    let resolvePromise: () => void
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve
    })
    mockOnCreatePlaylist.mockReturnValue(promise)

    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    act(() => {
      result.current.updateName('Test Playlist')
    })

    const mockEvent = {
      preventDefault: vi.fn()
    } as any

    act(() => {
      result.current.handleSubmit(mockEvent)
    })

    expect(result.current.isCreating).toBe(true)

    await act(async () => {
      resolvePromise!()
      await promise
    })

    expect(result.current.isCreating).toBe(false)
  })

  it('should handle playlist creation error', async () => {
    const error = new Error('Creation failed')
    mockOnCreatePlaylist.mockRejectedValue(error)
    const { mockError, restore } = mockConsoleError()

    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    act(() => {
      result.current.openForm() // Open the form first
      result.current.updateName('Test Playlist')
    })

    const mockEvent = {
      preventDefault: vi.fn()
    } as any

    await act(async () => {
      await result.current.handleSubmit(mockEvent)
    })

    expect(mockError).toHaveBeenCalledWith('Error creating playlist:', error)
    expect(result.current.isCreating).toBe(false)
    expect(result.current.showCreateForm).toBe(true) // Form should remain open on error
    expect(result.current.newPlaylistName).toBe('Test Playlist') // Name should be preserved

    restore()
  })

  it('should reset isCreating state even if creation fails', async () => {
    const error = new Error('Creation failed')
    mockOnCreatePlaylist.mockRejectedValue(error)
    const { restore } = mockConsoleError()

    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    act(() => {
      result.current.updateName('Test Playlist')
    })

    const mockEvent = {
      preventDefault: vi.fn()
    } as any

    await act(async () => {
      await result.current.handleSubmit(mockEvent)
    })

    expect(result.current.isCreating).toBe(false)

    restore()
  })

  it('should provide all expected functions and properties', () => {
    const { result } = renderHook(() => usePlaylistForm(mockOnCreatePlaylist))

    expect(typeof result.current.openForm).toBe('function')
    expect(typeof result.current.closeForm).toBe('function')
    expect(typeof result.current.handleSubmit).toBe('function')
    expect(typeof result.current.updateName).toBe('function')
    expect(typeof result.current.showCreateForm).toBe('boolean')
    expect(typeof result.current.newPlaylistName).toBe('string')
    expect(typeof result.current.isCreating).toBe('boolean')
  })
})
