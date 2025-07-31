import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSongInPlaylist } from "../../../../../infraestructure/driving/web/hooks/useSongInPlaylist";
import { mockSong, mockSongs } from "../../../../mocks/song.mock";
import { mockPlaylists } from "../../../../mocks/playlist.mock";
import type { Playlist } from "../../../../../core/playlist/domain/models/playlist";

describe("useSongInPlaylist", () => {
  it("should return false when song is not in any playlist", () => {
    const songNotInPlaylist = {
      id: "not-in-playlist",
      title: "Not in Playlist",
      artist: "Unknown Artist",
      album: "Unknown Album",
      imageUrl: "https://example.com/unknown.jpg",
    };

    const { result } = renderHook(() =>
      useSongInPlaylist(songNotInPlaylist, mockPlaylists)
    );

    expect(result.current.isInPlaylist).toBe(false);
    expect(result.current.playlistName).toBeUndefined();
    expect(result.current.playlistId).toBeUndefined();
  });

  it("should return true when song is in a playlist", () => {
    const { result } = renderHook(() =>
      useSongInPlaylist(mockSong, mockPlaylists)
    );

    expect(result.current.isInPlaylist).toBe(true);
    expect(result.current.playlistName).toBe("Test Playlist");
    expect(result.current.playlistId).toBe("playlist-1");
  });

  it("should return first playlist when song is in multiple playlists", () => {
    const songInMultiplePlaylists = mockSongs[0]; // This song is in playlist-1 and playlist-3

    const { result } = renderHook(() =>
      useSongInPlaylist(songInMultiplePlaylists, mockPlaylists)
    );

    expect(result.current.isInPlaylist).toBe(true);
    expect(result.current.playlistName).toBe("Test Playlist"); // First playlist found
    expect(result.current.playlistId).toBe("playlist-1");
  });

  it("should handle empty playlists array", () => {
    const { result } = renderHook(() => useSongInPlaylist(mockSong, []));

    expect(result.current.isInPlaylist).toBe(false);
    expect(result.current.playlistName).toBeUndefined();
    expect(result.current.playlistId).toBeUndefined();
  });

  it("should handle playlists with empty songs arrays", () => {
    const emptyPlaylists = [
      {
        id: "empty-playlist",
        name: "Empty Playlist",
        songs: [],
      },
    ];

    const { result } = renderHook(() =>
      useSongInPlaylist(mockSong, emptyPlaylists)
    );

    expect(result.current.isInPlaylist).toBe(false);
  });

  it("should handle playlists with undefined songs", () => {
    // Simulate data that might come from Firebase where songs could be undefined
    const playlistsWithUndefinedSongs = [
      {
        id: "undefined-songs",
        name: "Undefined Songs",
        songs: undefined,
      },
    ] as any[];

    const { result } = renderHook(() =>
      useSongInPlaylist(mockSong, playlistsWithUndefinedSongs)
    );

    expect(result.current.isInPlaylist).toBe(false);
  });

  it("should memoize results correctly", () => {
    const { result, rerender } = renderHook(
      ({ song, playlists }) => useSongInPlaylist(song, playlists),
      {
        initialProps: { song: mockSong, playlists: mockPlaylists },
      }
    );

    const firstResult = result.current;

    // Rerender with same props
    rerender({ song: mockSong, playlists: mockPlaylists });

    expect(result.current).toBe(firstResult); // Should be same reference due to memoization
  });

  it("should update when song changes", () => {
    const { result, rerender } = renderHook(
      ({ song, playlists }) => useSongInPlaylist(song, playlists),
      {
        initialProps: { song: mockSong, playlists: mockPlaylists },
      }
    );

    expect(result.current.isInPlaylist).toBe(true);

    const newSong = {
      id: "new-song",
      title: "New Song",
      artist: "New Artist",
      album: "New Album",
      imageUrl: "https://example.com/new.jpg",
    };

    rerender({ song: newSong, playlists: mockPlaylists });

    expect(result.current.isInPlaylist).toBe(false);
  });

  it("should update when playlists change", () => {
    const { result, rerender } = renderHook(
      ({ song, playlists }) => useSongInPlaylist(song, playlists),
      {
        initialProps: { song: mockSong, playlists: [] as Playlist[] },
      }
    );

    expect(result.current.isInPlaylist).toBe(false);

    rerender({ song: mockSong, playlists: mockPlaylists });

    expect(result.current.isInPlaylist).toBe(true);
  });
});
