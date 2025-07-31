import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePlaylistNavigation } from '../../../../../infraestructure/driving/web/hooks/usePlaylistNavigation'
import { mockPlaylists, mockPlaylist } from '../../../../mocks/playlist.mock'

describe('usePlaylistNavigation', () => {
  it('should initialize with no selected playlist', () => {
    const { result } = renderHook(() => usePlaylistNavigation(mockPlaylists))

    expect(result.current.selectedPlaylist).toBeNull()
  })

  it('should select a playlist', () => {
    const { result } = renderHook(() => usePlaylistNavigation(mockPlaylists))

    act(() => {
      result.current.selectPlaylist(mockPlaylist)
    })

    expect(result.current.selectedPlaylist).toEqual(mockPlaylist)
  })

  it('should go back to list view', () => {
    const { result } = renderHook(() => usePlaylistNavigation(mockPlaylists))

    act(() => {
      result.current.selectPlaylist(mockPlaylist)
    })

    expect(result.current.selectedPlaylist).toEqual(mockPlaylist)

    act(() => {
      result.current.backToList()
    })

    expect(result.current.selectedPlaylist).toBeNull()
  })

  it('should update selected playlist when playlists change', () => {
    const { result, rerender } = renderHook(
      ({ playlists }) => usePlaylistNavigation(playlists),
      { initialProps: { playlists: mockPlaylists } }
    )

    // Select a playlist
    act(() => {
      result.current.selectPlaylist(mockPlaylists[0])
    })

    expect(result.current.selectedPlaylist).toEqual(mockPlaylists[0])

    // Update the playlist in the array
    const updatedPlaylist = {
      ...mockPlaylists[0],
      name: 'Updated Playlist Name',
      songs: [...mockPlaylists[0].songs, {
        id: 'new-song',
        title: 'New Song',
        artist: 'New Artist',
        album: 'New Album',
        imageUrl: 'https://example.com/new.jpg'
      }]
    }

    const updatedPlaylists = [
      updatedPlaylist,
      ...mockPlaylists.slice(1)
    ]

    rerender({ playlists: updatedPlaylists })

    expect(result.current.selectedPlaylist).toEqual(updatedPlaylist)
  })

  it('should not update selected playlist if it no longer exists in playlists', () => {
    const { result, rerender } = renderHook(
      ({ playlists }) => usePlaylistNavigation(playlists),
      { initialProps: { playlists: mockPlaylists } }
    )

    // Select a playlist
    act(() => {
      result.current.selectPlaylist(mockPlaylists[0])
    })

    expect(result.current.selectedPlaylist).toEqual(mockPlaylists[0])

    // Remove the selected playlist from the array
    const filteredPlaylists = mockPlaylists.filter(p => p.id !== mockPlaylists[0].id)

    rerender({ playlists: filteredPlaylists })

    // Selected playlist should remain the same (stale reference)
    expect(result.current.selectedPlaylist).toEqual(mockPlaylists[0])
  })

  it('should allow direct setting of selected playlist', () => {
    const { result } = renderHook(() => usePlaylistNavigation(mockPlaylists))

    act(() => {
      result.current.setSelectedPlaylist(mockPlaylists[1])
    })

    expect(result.current.selectedPlaylist).toEqual(mockPlaylists[1])
  })

  it('should handle empty playlists array', () => {
    const { result } = renderHook(() => usePlaylistNavigation([]))

    expect(result.current.selectedPlaylist).toBeNull()

    act(() => {
      result.current.selectPlaylist(mockPlaylist)
    })

    expect(result.current.selectedPlaylist).toEqual(mockPlaylist)
  })

  it('should not trigger update when selectedPlaylist is null', () => {
    const { result, rerender } = renderHook(
      ({ playlists }) => usePlaylistNavigation(playlists),
      { initialProps: { playlists: mockPlaylists } }
    )

    expect(result.current.selectedPlaylist).toBeNull()

    // Update playlists while no playlist is selected
    const updatedPlaylists = [...mockPlaylists, {
      id: 'new-playlist',
      name: 'New Playlist',
      songs: []
    }]

    rerender({ playlists: updatedPlaylists })

    expect(result.current.selectedPlaylist).toBeNull()
  })

  it('should provide all expected functions and properties', () => {
    const { result } = renderHook(() => usePlaylistNavigation(mockPlaylists))

    expect(typeof result.current.selectPlaylist).toBe('function')
    expect(typeof result.current.backToList).toBe('function')
    expect(typeof result.current.setSelectedPlaylist).toBe('function')
    expect(result.current.selectedPlaylist).toBeNull()
  })

  it('should handle selecting different playlists sequentially', () => {
    const { result } = renderHook(() => usePlaylistNavigation(mockPlaylists))

    // Select first playlist
    act(() => {
      result.current.selectPlaylist(mockPlaylists[0])
    })

    expect(result.current.selectedPlaylist).toEqual(mockPlaylists[0])

    // Select second playlist
    act(() => {
      result.current.selectPlaylist(mockPlaylists[1])
    })

    expect(result.current.selectedPlaylist).toEqual(mockPlaylists[1])

    // Select third playlist
    act(() => {
      result.current.selectPlaylist(mockPlaylists[2])
    })

    expect(result.current.selectedPlaylist).toEqual(mockPlaylists[2])
  })
})
