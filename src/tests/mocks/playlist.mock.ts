import type { Playlist } from "../../core/playlist/domain/models/playlist";
import { mockSongs } from "./song.mock";

export const mockPlaylist: Playlist = {
  id: "playlist-1",
  name: "Test Playlist",
  songs: mockSongs,
};

export const mockPlaylists: Playlist[] = [
  mockPlaylist,
  {
    id: "playlist-2",
    name: "Empty Playlist",
    songs: [],
  },
  {
    id: "playlist-3",
    name: "Another Playlist",
    songs: [mockSongs[0], mockSongs[1]],
  },
];

export const createMockPlaylist = (
  overrides: Partial<Playlist> = {}
): Playlist => ({
  ...mockPlaylist,
  ...overrides,
});
